---
patternId: "dirty-check-gated-lazy-recompute"
title: "Dirty-Check Gated Lazy Recompute"
summary: "The merge adds a deterministic dirtiness guard so week intelligence is recomputed only when stable training signals change or on-demand rebuild is forced."
date: 2026-04-13
tags: ["agentic-ai", "lazy-intelligence", "dirty-check", "cost-control"]
status: "stable"
confidence: "high"
domain: ["Agentic AI", "Optimization", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["runner-agentic-intelligence PR132", "Week dirtiness comparison service", "Orchestrator lazy intelligence gating", "Lazy intelligence test coverage"]
diagram: "/architecture/patterns/dirty-check-gated-lazy-recompute.svg"
knowledgeId: "dirty-check-gated-lazy-recompute"
knowledgeType: "pattern"
source:
  learning: "wl_20260413"
signals: []
applies_to: []
automation_ready: false
---

## Intent
Reduce unnecessary LLM work while keeping week views correct when data actually changes.

## Context
The orchestrator tests dirtiness before reusing or rebuilding cached week snapshots and before skipping historical intelligence. The merge adds a deterministic dirtiness guard so week intelligence is recomputed only when stable training signals change or on-demand rebuild is forced.

## Agentic profile

- **System shape:** hybrid
- **Orchestration mode:** event-driven

### Agent-to-agent interaction
- **Present:** true
- **Mechanism:** shared-state
- **Evidence:** A deterministic dirty check decides whether the shared week state should trigger another intelligence run.

### Tool protocols
- **MCP:** absent
- **Tool calling:** present
- **Evidence:** Expensive intelligence steps run only after a deterministic comparison says the week changed.

### Optimisation target
- **Primary:** latency
- **Secondary:** cost, reliability
- **Notes:** Avoids rerunning LLM-backed intelligence when stable training metrics have not changed.

### Simplicity vs autonomy
- **Position:** balanced
- **Rationale:** A deterministic gate reduces unnecessary autonomy without removing lazy rebuild behavior.

## Forces
- Weekly navigation can trigger repeated requests for the same data.
- LLM-based recomputation is more expensive than deterministic cache checks.

## Solution
Compare only stable summary fields such as weekly distance, run count, pace, and consistency against the cached intelligence snapshot; rebuild only when they differ beyond tolerance or when mode is on-demand.

## Implementation signals
- `SnapshotService.is_week_dirty(...)` compares projected snapshot fields against WeeklySummary.
- Orchestrator branches into reuse or recompute based on `is_dirty` and `mode`.

## Evidence
- The snapshot service compares stable summary fields before deciding whether reuse is safe.
- The orchestrator branches into reuse, skip, or recompute based on the dirty-check result.
- Tests confirm that historical weeks are skipped initially and rebuilt only when requested.

## Consequences
### Benefits
- Reduces repeated agent invocations.
- Makes lazy week navigation faster and cheaper.

### Costs
- Requires maintenance of the stable-field comparison set.
- Can miss semantic changes not captured by the dirty metrics.

### Failure modes
- False negatives can preserve stale intelligence.
- False positives can cause unnecessary recomputation.

## Reuse notes
- Use when expensive agent outputs are downstream of a smaller stable metric set that can be compared deterministically.
- Use it when latency matters more than maximizing autonomous generation everywhere.

## Confidence
High. Confidence is high because the pattern is evidenced directly in the PR132 code paths and tests, with breadth consistent with a stable pattern rather than speculation.
