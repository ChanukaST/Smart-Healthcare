package com.hospital.hms.auth;

import com.hospital.hms.common.security.JwtTokenProvider;
import com.hospital.hms.patient.Patient;
import com.hospital.hms.patient.PatientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthController(UserRepository userRepository, PatientRepository patientRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid username or password");
            return ResponseEntity.badRequest().body(error);
        }

        User user = userOpt.get();
        String token = tokenProvider.generateToken(user.getUsername(), user.getRole().name(), user.getFullName());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("username", user.getUsername());
        response.put("fullName", user.getFullName());
        response.put("role", user.getRole().name());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/demo-login/{roleName}")
    public ResponseEntity<?> demoLogin(@PathVariable String roleName) {
        try {
            Role role = Role.valueOf(roleName.toUpperCase());

            // Optimization: Use database-level query to avoid full table scan
            Optional<User> userOpt = userRepository.findFirstByRole(role);

            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "No user found for role " + roleName));
            }

            User user = userOpt.get();
            String token = tokenProvider.generateToken(user.getUsername(), user.getRole().name(), user.getFullName());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("username", user.getUsername());
            response.put("fullName", user.getFullName());
            response.put("role", user.getRole().name());

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid role: " + roleName));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, Object> req) {
        String email = (String) req.get("email");
        String nic = (String) req.get("nic");
        String fullName = (String) req.get("fullName");
        String password = (String) req.get("password");
        String phone = (String) req.get("phone");
        
        java.time.LocalDate dob = null;
        Integer age = null;

        String dobStr = (String) (req.get("dateOfBirth") != null ? req.get("dateOfBirth") : req.get("dob"));
        if (dobStr != null && !dobStr.trim().isEmpty()) {
            try {
                dob = java.time.LocalDate.parse(dobStr.trim());
                age = java.time.Period.between(dob, java.time.LocalDate.now()).getYears();
            } catch (Exception ignored) {}
        }

        if (age == null && req.get("age") != null && !req.get("age").toString().isEmpty()) {
            try {
                age = Integer.parseInt(req.get("age").toString());
            } catch (NumberFormatException ignored) {}
        }
        String gender = (String) req.getOrDefault("gender", "OTHER");
        String bloodGroup = (String) req.getOrDefault("bloodGroup", "Unknown");
        if (bloodGroup == null || bloodGroup.trim().isEmpty()) {
            bloodGroup = "Unknown";
        }
        String district = (String) req.getOrDefault("district", "Colombo");

        String username = (String) req.get("username");
        if (username == null || username.trim().isEmpty()) {
            if (email != null && !email.trim().isEmpty()) {
                username = email.split("@")[0];
            } else if (nic != null && !nic.trim().isEmpty()) {
                username = nic;
            } else {
                username = "pat_" + System.currentTimeMillis();
            }
        }

        if (password == null || password.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Password is required for registration."));
        }

        if (password.length() < 8) {
            return ResponseEntity.badRequest().body(Map.of("message", "Password must be at least 8 characters long."));
        }

        if (userRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Account with this username or email already exists."));
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setFullName(fullName != null ? fullName : username);
        user.setEmail(email);
        user.setRole(Role.PATIENT);
        user.setActive(true);
        userRepository.save(user);

        // Also create a linked Patient entity if NIC is provided
        if (nic != null && !nic.trim().isEmpty()) {
            if (patientRepository.findByNicPassport(nic).isEmpty()) {
                long count = patientRepository.count() + 1;
                Patient patient = new Patient();
                patient.setPatientId(String.format("PAT-%d-%04d", java.time.Year.now().getValue(), count));
                patient.setNicPassport(nic);
                patient.setFullName(user.getFullName());
                patient.setPhone(phone != null ? phone : "");
                patient.setDateOfBirth(dob);
                patient.setAge(age != null ? age : 30);
                patient.setGender(gender != null ? gender : "OTHER");
                patient.setDistrict(district != null ? district : "Colombo");
                patient.setBloodGroup(bloodGroup != null ? bloodGroup : "O+");
                patientRepository.save(patient);
            }
        }

        String token = tokenProvider.generateToken(user.getUsername(), user.getRole().name(), user.getFullName());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("username", user.getUsername());
        response.put("fullName", user.getFullName());
        response.put("role", user.getRole().name());
        response.put("message", "Registration successful");

        return ResponseEntity.ok(response);
    }
}

