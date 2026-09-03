## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.
## 2026-09-03 - [Push aggregations down to database]
**Learning:** Calling `findAll().stream().filter(...).count()` or `.mapToDouble(...).sum()` fetches entire tables into application memory, leading to severe OOM risks and latency spikes as tables grow.
**Action:** Always replace in-memory aggregations and counts with dedicated database queries (e.g. `countBy...`, or `@Query("SELECT SUM(...)")`) in the Spring Data repositories.
