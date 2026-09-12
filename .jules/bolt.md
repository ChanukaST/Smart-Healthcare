## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.

## 2026-09-12 - [Pushing Aggregations to the Database in Spring Boot]
**Learning:** In-memory aggregations using `.findAll().stream()` (e.g., `.count()`, `.sum()`) cause N+1 and full-table scan problems, dragging down performance significantly as the database grows, particularly on dashboard load times.
**Action:** Always utilize targeted Spring Data JPA `@Query` or derived query methods (e.g., `countBy...`) to offload counting and summation logic directly to the database. Wrap `SUM` calls in `COALESCE` to handle empty results securely and prevent NPEs on primitive unboxing.
