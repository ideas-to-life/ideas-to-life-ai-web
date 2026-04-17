---
patternId: "week-scoped-repository-reconstruction"
title: "Week-Scoped Repository Reconstruction"
summary: "The merge reconstructs intelligence and visualization contexts from repository-backed week state instead of relying only on newly uploaded runs."
date: 2026-04-13
tags: ["agentic-ai", "reconstruction", "week-scope", "historical-consistency"]
status: "stable"
confidence: "high"
domain: ["Agentic AI", "Runner Coaching", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["runner-agentic-intelligence PR132", "Week-scoped orchestrator rebuild flow", "Week agent-context reconstruction service"]
diagram: "/architecture/patterns/week-scoped-repository-reconstruction.svg"
knowledgeId: "week-scoped-repository-reconstruction"
knowledgeType: "pattern"
source:
  learning: ""
signals: []
applies_to: []
automation_ready: false
---

## Intent
Make historical weeks behave the same as current weeks when intelligence or charts are requested.

## Context
The orchestrator now fetches all runs for each affected week from the repository and rebuilds summary/trend context for that week before invoking intelligence steps. The merge reconstructs intelligence and visualization contexts from repository-backed week state instead of relying only on newly uploaded runs.

## Agentic profile

- **System shape:** hybrid
- **Orchestration mode:** sequential

### Agent-to-agent interaction
- **Present:** true
- **Mechanism:** shared-state
- **Evidence:** Week-specific context is rebuilt once and then shared across the downstream intelligence steps.

### Tool protocols
- **MCP:** absent
- **Tool calling:** present
- **Evidence:** The orchestrator reconstructs durable week state before invoking intelligence generation.

### Optimisation target
- **Primary:** quality
- **Secondary:** reliability
- **Notes:** Repository-backed reconstruction ensures intelligence uses the full week state, not just the latest upload slice.

### Simplicity vs autonomy
- **Position:** balanced
- **Rationale:** Agents still decide over the context, but the system now reconstructs that context deterministically from persisted history.

## Forces
- Upload batches may contain only a subset of runs relevant to a week.
- Historical week navigation must not depend on the original upload session state.

## Solution
Use run repository lookups and week-specific summary/trend reconstruction helpers to prepare each week context before intelligence and visualization execution.

## Implementation signals
- Orchestrator fetches `all_week_runs` from `run_repo.get_runs_for_week(...)` before per-week intelligence.
- SnapshotService adds `build_agent_context_for_week(target_date)`.

## Evidence
- Both upload-time and on-demand intelligence paths rebuild week-specific state from repositories.
- A dedicated helper constructs summary and trend context centered on one selected week.

## Consequences
### Benefits
- Improves consistency between current and historical week behavior.
- Makes chart and insight generation less sensitive to upload path shape.

### Costs
- Increases repository reads during orchestration.
- Adds more context-building logic to the service layer.

### Failure modes
- Repository gaps can still force fallback to session runs.
- If persisted runner identity is wrong, the wrong week data may be reconstructed.

## Reuse notes
- Use when agent execution should depend on durable period state rather than only the latest request payload.
- Use it when quality matters more than maximizing autonomous generation everywhere.

## Confidence
High. Confidence is high because the pattern is evidenced directly in the PR132 code paths and tests, with breadth consistent with a stable pattern rather than speculation.
