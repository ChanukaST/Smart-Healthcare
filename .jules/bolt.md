## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.
## 2026-10-08 - [O(n) bed grouping optimization]
**Learning:** Replaced O(N^2) `.filter()` inside `.map()` with O(N) hash map lookups. This pattern frequently appears in dashboard matrix components rendering grouped data (e.g., mapping over wards and filtering beds per ward).
**Action:** When rendering grouped entities like wards containing beds or departments containing doctors, always prefer a memoized `Map` object for lookups over running `Array.prototype.filter()` repeatedly on the inner loop to prevent unnecessary UI rendering delays as datasets grow.
