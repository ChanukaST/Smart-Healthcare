## 2026-08-29 - [Avoid In-Memory Filtering for Spring Data JPA]
**Learning:** In-memory filtering using `.findAll().stream().filter(...)` causes full table scans and leads to significant performance and memory bottlenecks when retrieving large datasets (e.g. low stock medicines or demo user logins).
**Action:** Always replace in-memory stream filtering with targeted Spring Data JPA queries (e.g., using `@Query` or method naming conventions like `findFirstByRole`) to push the filtering workload to the database level.
## 2026-10-09 - [O(1) Lookup Instead of Repeated Array Filtering inside Maps]
**Learning:** When rendering nested datasets (like grouping beds within their respective wards) in React, avoid using an O(N) `Array.filter()` inside an O(M) `.map()` loop, especially without memoization, as it causes significant performance bottlenecks upon re-renders.
**Action:** Use `useMemo` to group the child entities into a JavaScript `Map` (O(N) operation) outside the map loop, and perform an O(1) `Map.get()` lookup inside the render loop to maintain optimal performance.
