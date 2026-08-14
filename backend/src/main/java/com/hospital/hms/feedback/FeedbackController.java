package com.hospital.hms.feedback;

import com.hospital.hms.ml.MlServiceProxy;
import com.hospital.hms.patient.Patient;
import com.hospital.hms.patient.PatientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/feedback")
@SuppressWarnings("null")
public class FeedbackController {

    private final FeedbackRepository feedbackRepository;
    private final PatientRepository patientRepository;
    private final MlServiceProxy mlServiceProxy;

    public FeedbackController(FeedbackRepository feedbackRepository, PatientRepository patientRepository, MlServiceProxy mlServiceProxy) {
        this.feedbackRepository = feedbackRepository;
        this.patientRepository = patientRepository;
        this.mlServiceProxy = mlServiceProxy;
    }

    @GetMapping
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> submitFeedback(@RequestBody Map<String, Object> req) {
        Long patientId = Long.valueOf(req.get("patientId").toString());
        Integer rating = Integer.valueOf(req.get("rating").toString());
        String comment = (String) req.get("comment");

        Optional<Patient> pOpt = patientRepository.findById(patientId);
        if (pOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid patient ID"));
        }

        // Call Python ML Service to analyze sentiment
        Map<String, Object> mlResult = mlServiceProxy.analyzeSentiment(comment);
        String sentiment = (String) mlResult.getOrDefault("sentiment", "POSITIVE");
        Double conf = mlResult.get("confidencePercent") != null ? Double.valueOf(mlResult.get("confidencePercent").toString()) : 85.0;

        Feedback fb = new Feedback(pOpt.get(), rating, comment, sentiment, conf);
        Feedback saved = feedbackRepository.save(fb);

        return ResponseEntity.ok(saved);
    }
}
