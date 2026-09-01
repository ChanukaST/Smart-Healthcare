package com.hospital.hms.laboratory;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LabRequestRepository extends JpaRepository<LabRequest, Long> {
    List<LabRequest> findByStatusOrderByRequestedDateDesc(LabRequest.RequestStatus status);
    List<LabRequest> findByPatientIdOrderByRequestedDateDesc(Long patientId);
    long countByStatus(LabRequest.RequestStatus status);
}
