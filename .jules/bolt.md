## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.
## 2024-03-05 - [Backend] Reporting Controller Performance Boost
**Learning:** Found an anti-pattern in `ReportingController.java` where dashboard statistics were being calculated by fetching all records (`findAll().stream().filter(...).count()`) into memory instead of using database-level aggregations. This causes major performance degradation and OOM risks as the database grows.
**Action:** Replaced in-memory operations with Spring Data JPA derived queries and `@Query` annotations using database aggregations (`COUNT`, `SUM`). Ensured `COALESCE` was used for `SUM` to prevent `NullPointerException` on empty tables.
