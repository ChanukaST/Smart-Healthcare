package com.hospital.hms.feedback;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByPatientIdOrderBySubmittedAtDesc(Long patientId);
    List<Feedback> findBySentimentLabel(String sentimentLabel);
}
