package com.hospital.hms.ml;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ml")
public class MlAnalyticsController {

    private final MlServiceProxy mlServiceProxy;

    public MlAnalyticsController(MlServiceProxy mlServiceProxy) {
        this.mlServiceProxy = mlServiceProxy;
    }

    @PostMapping("/predict-no-show")
    public ResponseEntity<?> predictNoShow(@RequestBody Map<String, Object> requestData) {
        return ResponseEntity.ok(mlServiceProxy.predictNoShow(requestData));
    }

    @PostMapping("/predict-health-risk")
    public ResponseEntity<?> predictHealthRisk(@RequestBody Map<String, Object> requestData) {
        return ResponseEntity.ok(mlServiceProxy.predictHealthRisk(requestData));
    }

    @PostMapping("/analyze-sentiment")
    public ResponseEntity<?> analyzeSentiment(@RequestBody Map<String, String> requestData) {
        String text = requestData.getOrDefault("feedbackText", "");
        return ResponseEntity.ok(mlServiceProxy.analyzeSentiment(text));
    }

    @GetMapping("/trends")
    public ResponseEntity<?> getTrends() {
        return ResponseEntity.ok(mlServiceProxy.getAnalyticsTrends());
    }
}
