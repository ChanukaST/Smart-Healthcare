package com.hospital.hms.billing;

import com.hospital.hms.patient.Patient;
import com.hospital.hms.patient.PatientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/billing")
@SuppressWarnings({"null", "unchecked"})
public class BillingController {

    private final InvoiceRepository invoiceRepository;
    private final PaymentRepository paymentRepository;
    private final PatientRepository patientRepository;

    public BillingController(InvoiceRepository invoiceRepository,
                             PaymentRepository paymentRepository,
                             PatientRepository patientRepository) {
        this.invoiceRepository = invoiceRepository;
        this.paymentRepository = paymentRepository;
        this.patientRepository = patientRepository;
    }

    @GetMapping("/invoices")
    public List<Invoice> getInvoices(@RequestParam(required = false) Long patientId) {
        if (patientId != null) {
            return invoiceRepository.findByPatientId(patientId);
        }
        return invoiceRepository.findAll();
    }

    @GetMapping("/invoices/{id}")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
        return invoiceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/invoices")
    public ResponseEntity<?> createInvoice(@RequestBody Map<String, Object> reqData) {
        Long patientId = Long.valueOf(reqData.get("patientId").toString());
        List<Map<String, Object>> itemsList = (List<Map<String, Object>>) reqData.get("items");

        Optional<Patient> pOpt = patientRepository.findById(patientId);
        if (pOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid patient ID"));
        }

        String invNum = String.format("INV-%d-%04d", java.time.Year.now().getValue(), invoiceRepository.count() + 1);
        Invoice invoice = new Invoice(invNum, pOpt.get());

        double total = 0.0;
        double consult = 0.0;
        double pharm = 0.0;
        double lab = 0.0;
        double room = 0.0;

        if (itemsList != null) {
            for (Map<String, Object> itemData : itemsList) {
                String desc = (String) itemData.get("description");
                Double amt = Double.valueOf(itemData.get("amountLkr").toString());
                String cat = (String) itemData.get("category");

                InvoiceItem item = new InvoiceItem(desc, amt, cat);
                invoice.addItem(item);
                total += amt;

                if ("CONSULTATION".equalsIgnoreCase(cat)) consult += amt;
                else if ("PHARMACY".equalsIgnoreCase(cat)) pharm += amt;
                else if ("LABORATORY".equalsIgnoreCase(cat)) lab += amt;
                else if ("WARD".equalsIgnoreCase(cat)) room += amt;
            }
        }

        invoice.setConsultationChargesLkr(consult);
        invoice.setPharmacyChargesLkr(pharm);
        invoice.setLabChargesLkr(lab);
        invoice.setRoomChargesLkr(room);
        invoice.setTotalAmountLkr(total);

        Invoice saved = invoiceRepository.save(invoice);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/invoices/{id}/pay")
    public ResponseEntity<?> processPayment(@PathVariable Long id, @RequestBody Map<String, String> payData) {
        String method = payData.get("paymentMethod");
        String ref = payData.get("referenceNumber");

        return invoiceRepository.findById(id).map(invoice -> {
            invoice.setStatus(Invoice.InvoiceStatus.PAID);
            invoice.setPaidAt(LocalDateTime.now());
            invoice.setPaymentMethod(method);
            invoiceRepository.save(invoice);

            String payNum = String.format("PAY-%d-%04d", java.time.Year.now().getValue(), paymentRepository.count() + 1);
            Payment payment = new Payment(payNum, invoice, invoice.getTotalAmountLkr(), method, ref);
            Payment savedPay = paymentRepository.save(payment);

            return ResponseEntity.ok(savedPay);
        }).orElse(ResponseEntity.notFound().build());
    }
}
