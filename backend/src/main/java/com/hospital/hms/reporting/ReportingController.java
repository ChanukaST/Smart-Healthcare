package com.hospital.hms.reporting;

import com.hospital.hms.billing.Invoice;
import com.hospital.hms.billing.InvoiceRepository;
import com.hospital.hms.inpatient.Bed;
import com.hospital.hms.inpatient.BedRepository;
import com.hospital.hms.laboratory.LabRequest;
import com.hospital.hms.laboratory.LabRequestRepository;
import com.hospital.hms.opd.OpdQueueRepository;
import com.hospital.hms.opd.QueueToken;
import com.hospital.hms.patient.PatientRepository;
import com.hospital.hms.pharmacy.Medicine;
import com.hospital.hms.pharmacy.MedicineRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reporting")
@SuppressWarnings("null")
public class ReportingController {

    private final PatientRepository patientRepository;
    private final OpdQueueRepository queueRepository;
    private final BedRepository bedRepository;
    private final MedicineRepository medicineRepository;
    private final LabRequestRepository labRequestRepository;
    private final InvoiceRepository invoiceRepository;

    public ReportingController(PatientRepository patientRepository,
                               OpdQueueRepository queueRepository,
                               BedRepository bedRepository,
                               MedicineRepository medicineRepository,
                               LabRequestRepository labRequestRepository,
                               InvoiceRepository invoiceRepository) {
        this.patientRepository = patientRepository;
        this.queueRepository = queueRepository;
        this.bedRepository = bedRepository;
        this.medicineRepository = medicineRepository;
        this.labRequestRepository = labRequestRepository;
        this.invoiceRepository = invoiceRepository;
    }

    @GetMapping("/dashboard-stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        long totalPatients = patientRepository.count();
        List<QueueToken> todayTokens = queueRepository.findByTokenDateOrderByQueueOrderAsc(LocalDate.now());
        long opdCount = todayTokens.size();

        List<Bed> allBeds = bedRepository.findAll();
        long occupiedBeds = allBeds.stream().filter(Bed::isOccupied).count();
        double occupancyRate = allBeds.isEmpty() ? 0 : ((double) occupiedBeds / allBeds.size()) * 100;

        List<Medicine> medicines = medicineRepository.findAll();
        long lowStockCount = medicines.stream().filter(m -> m.getTotalStock() <= m.getReorderLevel()).count();

        List<LabRequest> pendingLabs = labRequestRepository.findByStatusOrderByRequestedDateDesc(LabRequest.RequestStatus.PENDING);

        List<Invoice> paidInvoices = invoiceRepository.findByStatus(Invoice.InvoiceStatus.PAID);
        double totalRevenueLkr = paidInvoices.stream().mapToDouble(Invoice::getTotalAmountLkr).sum();

        stats.put("totalPatients", totalPatients);
        stats.put("todayOpdCount", opdCount);
        stats.put("totalBeds", allBeds.size());
        stats.put("occupiedBeds", occupiedBeds);
        stats.put("bedOccupancyPercentage", Math.round(occupancyRate * 10.0) / 10.0);
        stats.put("lowStockCount", lowStockCount);
        stats.put("pendingLabRequestsCount", pendingLabs.size());
        stats.put("totalRevenueLkr", Math.round(totalRevenueLkr * 100.0) / 100.0);

        return ResponseEntity.ok(stats);
    }
}
