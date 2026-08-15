-- departments.sql: Seed Departments
INSERT INTO departments (id, name, code, description) VALUES
(1, 'Cardiology', 'CARD', 'Heart and cardiovascular system care'),
(2, 'General Medicine', 'GEN', 'Comprehensive adult healthcare services'),
(3, 'Dermatology', 'DERM', 'Skin, hair, and nail diagnosis & care'),
(4, 'Pediatrics', 'PED', 'Medical care for infants, children, and adolescents'),
(5, 'Neurology', 'NEUR', 'Brain and nervous system treatment')
ON DUPLICATE KEY UPDATE name=VALUES(name);
