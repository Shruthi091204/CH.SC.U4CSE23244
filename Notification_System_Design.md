# Stage 1: Notification System Design

## Approach: Min-Heap for Top-N
To efficiently find the top 10 notifications by priority, we use a **Min-Heap** data structure of size $N=10$.

### Why Min-Heap?
For a "Top-N" problem, a Min-Heap is more efficient than sorting the entire list:
- **Partial Sorting**: We don't need the entire list of notifications to be sorted. We only care about the 10 highest-priority ones.
- **Efficiency**: A Min-Heap of size 10 allows us to keep track of the "smallest" item among our "best 10". Every time we see a new notification, we only compare it with the root of the heap ($O(1)$). If it's better, we replace the root and re-heapify ($O(\log N)$).

## Complexity Analysis
- **Time Complexity**: $O(K \log N)$, where $K$ is the total number of notifications and $N$ is the limit (10). 
  - Since $N$ is constant (10), this is essentially **$O(K)$** linear time.
  - Sorting the entire list would be $O(K \log K)$, which is significantly slower for large $K$.
- **Space Complexity**: **$O(N)$** to store the heap, which is constant (10 items).

## Handling New Notifications
When a new notification arrives:
1. Compare its priority score with the current root of the Min-Heap.
2. If the new notification has a higher priority than the root:
   - Remove the root (the lowest of the top 10).
   - Insert the new notification and heapify.
3. This ensures the heap always contains the 10 highest-priority items encountered so far.

## Priority Scoring Formula
The priority is determined by a tuple $(W, T)$:
- **$W$ (Weight)**: 
  - `Placement` = 3
  - `Result` = 2
  - `Event` = 1
- **$T$ (Timestamp)**: Lexicographical comparison of ISO-like strings (e.g., `"2026-04-22 17:51:30"`).

**Priority Rule**: Item $A >$ Item $B$ if:
- $W_A > W_B$
- OR ($W_A = W_B$ AND $T_A > T_B$)

Python's tuple comparison `(weight, timestamp)` handles this logic naturally.
