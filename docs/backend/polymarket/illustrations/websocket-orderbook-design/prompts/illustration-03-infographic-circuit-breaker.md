Market Data Circuit Breaker Mechanism

Layout: system diagram

FLOW: Left to Right

1. COMPONENT: "数据流 (Data Stream)". Label: "Timestamp: T".
2. CHECKPOINT: "时效检查 (Freshness Check)".
   - Condition: "Now - T > 5000ms?"
3. OUTCOME A (Safe):
   - Path: Straight through.
   - Switch: CLOSED (Connected).
   - Target: "交易引擎 (Trading Engine)".
   - Color: Green accent.
4. OUTCOME B (Stale):
   - Path: Downward to blocked state.
   - Switch: OPEN (Disconnected).
   - Action: "熔断 (Halt) & 撤单".
   - Color: Red accent.

STYLE: Notion style. Minimalist hand-drawn line art, mechanical switch metaphor.
ASPECT: 16:9
