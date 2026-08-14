package com.hospital.hms.laboratory;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface LaboratoryRepository {

    interface LabTestRepository extends JpaRepository<LabTest, Long> {
        Optional<LabTest> findByTestCode(String testCode);
    }

    interface LabRequestRepository extends JpaRepository<LabRequest, Long> {
        List<LabRequest> findByStatusOrderByRequestedDateDesc(LabRequest.RequestStatus status);
        List<LabRequest> findByPatientIdOrderByRequestedDateDesc(Long patientId);
    }

    interface LabResultRepository extends JpaRepository<LabResult, Long> {
        Optional<LabResult> findByLabRequestId(Long labRequestId);
    }
}
