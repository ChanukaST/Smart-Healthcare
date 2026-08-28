## 2024-05-18 - Unnecessary table scans in AuthController
**Learning:** `AuthController.demoLogin` does a full table scan and streams all users into memory by calling `userRepository.findAll().stream().filter(...)` instead of relying on the database to filter by role.
**Action:** Replace `userRepository.findAll().stream().filter(...)` with a custom query method in `UserRepository` like `findFirstByRole(Role role)` to perform the filtering at the database level.
