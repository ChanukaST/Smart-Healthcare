## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.

## 2026-10-03 - [Avoid Fetching Collections Just to Count]
**Learning:** Fetching an entire list of entities (e.g. `findAll()` or `findBy...`) only to call `.size()` on it creates massive memory overhead and unnecessary network traffic between the application and database, especially for large datasets.
**Action:** Always use targeted Spring Data JPA count queries (e.g., `countBy...` or `@Query("SELECT COUNT(x) ...")`) to push the aggregation workload down to the database and return just a scalar value.
