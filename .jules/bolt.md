## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.
## 2026-08-31 - [Avoid In-Memory Aggregation for Spring Data JPA]
**Learning:** Computing aggregate values (like counting filtered items or summing values) in application memory by calling `findAll().stream().filter(...).count()` or `.mapToDouble(...).sum()` fetches the entire dataset into memory and processes it linearly. This causes severe bottlenecks on dashboard load times as the dataset scales.
**Action:** Replace in-memory aggregations with targeted JPA queries (e.g., `countBy...` or `@Query("SELECT SUM(...)")`) so the database efficiently performs the aggregation and only returns the final scalar value.
