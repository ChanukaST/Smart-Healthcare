package com.hospital.hms.opd;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface OpdQueueRepository extends JpaRepository<QueueToken, Long> {
    List<QueueToken> findByTokenDateOrderByQueueOrderAsc(LocalDate tokenDate);
    List<QueueToken> findByDoctorIdAndTokenDateOrderByQueueOrderAsc(Long doctorId, LocalDate tokenDate);
    long countByDoctorIdAndTokenDate(Long doctorId, LocalDate tokenDate);
    long countByTokenDate(LocalDate tokenDate);
}
