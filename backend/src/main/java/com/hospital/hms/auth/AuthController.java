package com.hospital.hms.auth;

import com.hospital.hms.common.security.JwtTokenProvider;
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
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
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
            Optional<User> userOpt = userRepository.findAll().stream()
                    .filter(u -> u.getRole() == role)
                    .findFirst();

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
}
