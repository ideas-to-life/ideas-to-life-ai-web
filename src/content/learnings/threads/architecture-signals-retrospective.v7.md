---
title: "Architecture signals & invalidated assumptions"
slug: threads/architecture-signals-retrospective.v7
type: thread
firstObserved: 2026-03-10
lastUpdated: 2026-04-13
relatedWeeks: ["2026-04-13"]
tags: ["architecture", "experimentation", "stability", "learning"]
draft: false
---

Scope:

- Derived from Weekly Learnings published between 2026-03-10 and 2026-04-13
- Nature: Retrospective synthesis
- No changes made to original Weekly Learnings

---

## Architecture signals (emergent)

Grouped recurring signals observed across weeks:

### Boundaries & Contracts
- Pattern: Explicit boundaries between UI, orchestration, persistence, and visualization layers
- Anti-pattern: Implicit contracts across layers causing hidden coupling and instability

### State & Persistence
- Pattern: Single source of truth via snapshot-based persistence model
- Constraint: Identity-driven persistence required for multi-dimensional data (e.g., language)

### Execution & Orchestration
- Pattern: Orchestration-owned execution flow and triggering logic
- Heuristic: Prefer deterministic execution for core system behaviour over LLM delegation

> Note: Only include signals that appeared multiple times or had strong impact.

---

## Assumptions invalidated

Assumptions that consistently failed under real-world usage:

- Assumption: UI can safely trigger backend intelligence generation
- Assumption: Context-based keys (e.g., week) are sufficient for persistence in multi-dimensional systems
- Assumption: LLM-driven components are reliable for core execution paths
- Assumption: Fallback logic does not affect system correctness
- Assumption: Serialization is a low-level concern rather than an architectural boundary

> Include only assumptions that materially changed direction or design.

---

## System evolution (derived)

High-level shifts observed across the period:

- Implicit, loosely coupled architecture → explicitly bounded system with defined contracts
- UI-driven execution → orchestration-driven control model
- LLM-centric execution → deterministic core with selective augmentation

---

## Signal strength & confidence

- Strong signals (repeated across multiple weeks):
  - Explicit boundaries as a prerequisite for stability
  - Single source of truth for consistent system behaviour
  - Orchestration ownership of execution flow

- Emerging signals (observed but not yet stable):
  - Snapshot-based caching and reuse as a default system pattern
  - Documentation (AS_BUILT) as an active governance mechanism

- Low confidence / tentative:
  - Acceptance of partial-state persistence without atomic guarantees
