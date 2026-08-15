-- medicines.sql: Seed Medicines Inventory
INSERT INTO medicines (id, name, batch_no, expiry_date, stock_quantity, unit_price, status) VALUES
(1, 'Paracetamol 500mg', 'B00123', '2028-05-30', 320, 15.00, 'IN_STOCK'),
(2, 'Amoxicillin 250mg', 'A00387', '2027-12-15', 120, 45.00, 'IN_STOCK'),
(3, 'Amlodipine 5mg', 'A00988', '2027-03-15', 89, 25.00, 'LOW_STOCK'),
(4, 'Metformin 500mg', 'M00021', '2028-10-18', 45, 18.00, 'LOW_STOCK')
ON DUPLICATE KEY UPDATE name=VALUES(name);
