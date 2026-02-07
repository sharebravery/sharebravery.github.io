---
type: comparison
density: balanced
style: notion
image_count: 2
---

## Illustration 1

**Position**: After "#### 1. 批量下单的威力"
**Purpose**: Visually compare Serial vs Batch processing to highlight the efficiency gain (10 requests vs 1 request) and atomicity.
**Visual Content**:
- **Left (Serial)**: A slow queue. 10 separate small trucks (HTTP Requests) on a road, each carrying one box. Traffic jam. Label: "串行 (Serial) - 1500ms".
- **Right (Batch)**: A fast highway. 1 large container truck (Batch Request) carrying 10 boxes. Moving fast. Label: "批量 (Batch) - 200ms".
**Type Application**: Comparison / Metaphor.
**Filename**: 01-comparison-serial-vs-batch.png

## Illustration 2

**Position**: After "#### 2. 激进的策略：全撤全挂"
**Purpose**: Visualize the "Cancel-All-Then-Place" loop to explain the robust state management.
**Visual Content**: A 3-step clean cycle:
1. **Sweep**: A broom sweeping away all old orders (Cancel All).
2. **Think**: A brain calculating new strategy (Calculate).
3. **Place**: A hand placing a fresh set of orders (Place Batch).
**Type Application**: Process Cycle.
**Filename**: 02-flowchart-cancel-all-cycle.png
