## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.
## 2023-10-24 - [Avoid List size() for Counting]
**Learning:** In Spring Boot backend, fetching a full `List<T>` of entities just to call `.size()` on it fetches all data to the application layer and consumes lots of memory and network bandwidth. This is a common performance anti-pattern.
**Action:** Use database-level count queries (e.g., `countByTokenDate`) directly on the Repository interface.
