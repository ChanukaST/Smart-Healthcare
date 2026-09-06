## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.

## 2026-09-06 - [Handle DB SUM Aggregations with COALESCE]
**Learning:** When pushing `.mapToDouble(...).sum()` calculations down to the database level using JPQL `@Query("SELECT SUM(...)")`, an empty dataset returns a `NULL` value. If this maps to a Java primitive wrapper `Double`, it results in a silent `NullPointerException` during unboxing if not handled correctly.
**Action:** Always wrap `SUM(...)` (or other aggregations) in a `COALESCE(..., 0.0)` in JPQL when mapping to numeric types to ensure a safe default value is returned for empty datasets.
