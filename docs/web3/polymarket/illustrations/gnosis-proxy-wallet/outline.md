---
type: infographic
density: balanced
style: notion
image_count: 2
---

## Illustration 1

**Position**: After "#### 1. 所谓“无 Gas”，其实是有人买单"
**Purpose**: Explain the Meta-Transaction flow, clarifying how "Gasless" works via Relayer.
**Visual Content**: A 3-step relay race:
1. **User**: Passes a "Signed Baton" (Intent). No money paid.
2. **Relayer**: Takes the baton, pays the "Toll Fee" (Gas), and runs to the finish line.
3. **Proxy Contract**: Verifies the baton signature and executes the command.
**Type Application**: Process Diagram / Metaphor.
**Filename**: 01-infographic-meta-transaction.png

## Illustration 2

**Position**: After "#### 3. 守护进程：收益过滤"
**Purpose**: Visualize the Auto-Claim Worker's logic loop.
**Visual Content**: A circular worker cycle:
1. **Scan**: "Looking for Unclaimed Funds".
2. **Calculate**: "Is (Amount > Gas)?".
3. **Action**: "Execute Claim".
4. **Sleep**: "Cooldown".
**Type Application**: Flowchart / Cycle.
**Filename**: 02-flowchart-auto-claim-loop.png
