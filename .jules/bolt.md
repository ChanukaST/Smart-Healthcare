## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.

## 2024-05-24 - [Avoid in-memory aggregation with `findAll()`]
**Learning:** Using `repository.findAll()` and subsequent in-memory filtering (e.g. `stream().filter(...).count()`) results in highly inefficient full table scans and memory exhaustion as the data grows in the backend app, specifically impacting reporting components loading comprehensive stats.
**Action:** Always replace broad `findAll()` data loading with focused Spring Data JPA database queries like `countBy...()` or `@Query("SELECT SUM(...)")` to perform aggregation directly in the database.
