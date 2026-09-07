## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.

## 2024-05-18 - [Fix O(n) Database Fetching with In-memory Aggregation]
**Learning:** The Java Spring backend for HMS was retrieving all records to JVM memory using `.findAll()` and `.findAllByStatus()` to compute `.count()` and `.sum()`, creating a severe N+1/O(n) fetching issue that risks OutOfMemory errors and GC thrashing. Using `COALESCE` in `SUM` queries prevents NPEs when doing aggregation in empty tables.
**Action:** Use native Spring Data DB aggregations (e.g. `countBy` or `@Query("SELECT SUM(...)")`) to allow the DB engine to do math and drastically minimize overhead.
