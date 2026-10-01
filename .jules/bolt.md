## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.

## 2026-10-01 - [Avoid fetching entities just to count them]
**Learning:** Fetching an entire list of objects from the database into memory just to call `.size()` on it (e.g., `queueRepository.findByTokenDateOrderByQueueOrderAsc(LocalDate.now()).size()`) causes unnecessary object instantiation and high memory pressure.
**Action:** Always use targeted database-level count queries (e.g., `countByTokenDate()`) to get aggregation results directly from the DB.
