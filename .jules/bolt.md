## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.

## 2023-10-25 - [Optimize Count Queries with Spring Data JPA]
**Learning:** Fetching an entire list of entities (e.g., using `findBy...`) and calling `.size()` on it is a significant performance bottleneck, as it forces the ORM to query, hydrate, and load all entities into memory just to determine the count.
**Action:** Always replace `list.size()` with a dedicated `countBy...` Spring Data JPA query (e.g., `countByTokenDate`) to push the count operation down to the database level using a `SELECT COUNT(...)` query.
