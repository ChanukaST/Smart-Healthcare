## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.

## 2026-10-06 - Avoid in-memory size counting on entire lists
**Learning:** In Spring Boot backend apps, avoiding `findAll()` or similar list-fetching JPA operations followed by `.size()` or `.stream().filter(...).count()` is crucial for performance, especially on dashboard/reporting endpoints that run frequently.
**Action:** Use `countBy...` methods in Spring Data JPA to push the counting workload down to the database instead of loading full object lists into memory.
