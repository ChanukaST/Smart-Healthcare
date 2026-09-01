## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.
## 2026-09-01 - Replacing in-memory stream operations with DB aggregations in Spring Data JPA
**Learning:** In Spring Boot backend, calculating counts and sums by fetching all records and using Java Stream API `stream().filter().count()` or `stream().mapToDouble().sum()` retrieves unnecessary data leading to OOM errors and high memory pressure. It bypasses database optimization.
**Action:** Always use targeted Spring Data JPA repository queries (e.g., `countBy...` or `@Query("SELECT SUM...")`) to push aggregation workload to the database level and prevent full table scans.
