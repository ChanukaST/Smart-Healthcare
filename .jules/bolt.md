## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.

## 2026-09-09 - [Optimize Reporting Dashboard Aggregations]
**Learning:** Using in-memory streams for aggregations (like `.stream().filter(...).count()` or `.mapToDouble(...).sum()`) on `findAll()` calls leads to OOM errors and severe DB bottlenecks on dashboard endpoints. Additionally, when using `SUM` in `@Query` annotations, missing `COALESCE` can result in NullPointerExceptions when mapping to primitive double for empty result sets.
**Action:** Replace all in-memory aggregations with explicit Spring Data JPA database-level queries (`countBy...`, or `@Query`). Always wrap primitive sum queries with `COALESCE(SUM(field), 0.0)` to handle empty results safely.
