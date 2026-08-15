-- roles.sql: Default System Roles
INSERT INTO roles (id, name) VALUES 
(1, 'ROLE_ADMIN'),
(2, 'ROLE_DOCTOR'),
(3, 'ROLE_PATIENT'),
(4, 'ROLE_NURSE'),
(5, 'ROLE_PHARMACIST'),
(6, 'ROLE_LAB_TECH')
ON DUPLICATE KEY UPDATE name=VALUES(name);
