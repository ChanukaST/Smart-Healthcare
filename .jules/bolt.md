## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.
## 2026-09-04 - [Reporting Dashboard Queries Optimization]
**Learning:** The reporting dashboard was fetching all records for beds, medicines, and invoices into application memory to perform simple counts and sums, leading to massive memory usage and poor performance as data grows.
**Action:** Replaced in-memory streaming and aggregations with direct JPA database aggregate queries (e.g., `countBy...` and `@Query("SELECT SUM...")`) to let the database handle computations efficiently.
