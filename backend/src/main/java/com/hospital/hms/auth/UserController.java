package com.hospital.hms.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@SuppressWarnings("null")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody Map<String, Object> req) {
        String username = (String) req.get("username");
        String fullName = (String) req.get("fullName");
        String roleStr = (String) req.get("role");
        String password = (String) req.get("password");
        String email = req.get("email") != null ? (String) req.get("email") : username + "@lankahms.lk";

        if (userRepository.existsByUsername(username)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username already exists"));
        }

        Role role = Role.valueOf(roleStr.toUpperCase());
        String encodedPassword = passwordEncoder.encode(password != null ? password : "password123");

        User user = new User(username, encodedPassword, fullName, email, role);
        User saved = userRepository.save(user);

        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> req) {
        String newRoleStr = req.get("role");
        Optional<User> uOpt = userRepository.findById(id);

        if (uOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = uOpt.get();
        user.setRole(Role.valueOf(newRoleStr.toUpperCase()));
        User saved = userRepository.save(user);

        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "User removed successfully"));
    }
}
