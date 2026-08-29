package com.hospital.hms.auth;

import com.hospital.hms.common.security.JwtTokenProvider;
import com.hospital.hms.patient.PatientRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings({"unchecked", "null"})
public class AuthControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider tokenProvider;

    @InjectMocks
    private AuthController authController;

    @Test
    public void testRegister_MissingPassword() {
        Map<String, Object> req = new HashMap<>();
        req.put("username", "testuser");
        req.put("email", "testuser@example.com");
        // No password provided

        ResponseEntity<?> response = authController.register(req);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
        Map<String, String> body = (Map<String, String>) response.getBody();
        assertEquals("Password is required for registration.", body.get("message"));
    }

    @Test
    public void testRegister_EmptyPassword() {
        Map<String, Object> req = new HashMap<>();
        req.put("username", "testuser");
        req.put("email", "testuser@example.com");
        req.put("password", "   ");

        ResponseEntity<?> response = authController.register(req);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
        Map<String, String> body = (Map<String, String>) response.getBody();
        assertEquals("Password is required for registration.", body.get("message"));
    }

    @Test
    public void testRegister_ShortPassword() {
        Map<String, Object> req = new HashMap<>();
        req.put("username", "testuser");
        req.put("email", "testuser@example.com");
        req.put("password", "short");

        ResponseEntity<?> response = authController.register(req);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
        Map<String, String> body = (Map<String, String>) response.getBody();
        assertEquals("Password must be at least 8 characters long.", body.get("message"));
    }
}
