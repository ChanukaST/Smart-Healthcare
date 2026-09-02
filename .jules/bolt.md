## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.

## 2026-09-02 - [Document Optimizations with Comments]
**Learning:** Even when code is self-documenting or inherently clearer due to standard framework features (e.g. Spring Data repository queries), explicit instructions to document optimizations must still be followed.
**Action:** Always add code comments explicitly detailing the "what" and "why" of a performance optimization within the source code file itself, meeting strict "always do" requirements for the current role.
