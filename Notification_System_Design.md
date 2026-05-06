# Stage 1: Notification System Design

## Approach: Min-Heap for Top-10
To find the top 10 notifications by priority, I used a Min-Heap of size 10.

### Why Min-Heap?
For a Top-N problem like this, a Min-Heap is better than sorting the whole list:
- It doesn't need to sort everything. We only keep the 10 best ones.
- Every time a new notification comes, we just compare it to the smallest one in our top 10. If it's higher priority, we swap them.

## Complexity
- Time Complexity: O(K log 10) where K is the number of notifications. Since 10 is small and constant, it's basically O(K) linear time. This is faster than O(K log K) for full sorting.
- Space Complexity: O(10) to store the heap, which is constant space.

## Handling New Notifications
When a new notification is fetched:
1. Compare it with the root of the heap.
2. If it has higher priority than the root, we remove the root and add the new one.
3. This keeps the heap updated with the 10 highest priority items at all times.

## Priority Logic
The priority is decided using a tuple of (Weight, Timestamp):
- Weights: Placement = 3, Result = 2, Event = 1.
- Timestamp: If weights are the same, the newer timestamp wins.

Python handles this naturally when comparing tuples, checking the first element first and then the second.
