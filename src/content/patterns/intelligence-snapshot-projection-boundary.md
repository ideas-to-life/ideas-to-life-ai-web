---
patternId: "intelligence-snapshot-projection-boundary"
title: "Intelligence Snapshot Projection Boundary"
summary: "The merge introduces a distinct derived model that aggregates agent and service outputs into a stable UI-facing intelligence snapshot."
date: 2026-04-13
tags: ["agentic-ai", "snapshot", "boundary", "ui-contract", "projection"]
status: "stable"
confidence: "high"
domain: ["Agentic AI", "Runner Coaching", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["runner-agentic-intelligence PR132", "Intelligence snapshot builder", "Runner intelligence snapshot model", "Runner API response contract"]
diagram: "/architecture/patterns/intelligence-snapshot-projection-boundary.svg"
---

## Intent
Separate persisted training truth from the richer state needed to drive UI and coaching interactions.

## Context
This appears in the refactor that positions WeeklySnapshot as persisted truth and RunnerIntelligenceSnapshot as the UI-facing derivative. The merge introduces a distinct derived model that aggregates agent and service outputs into a stable UI-facing intelligence snapshot.

## Agentic profile

- **System shape:** hybrid
- **Orchestration mode:** hybrid

### Agent-to-agent interaction
- **Present:** true
- **Mechanism:** shared-state
- **Evidence:** The orchestrator and snapshot builder coordinate through one shared runtime context.

### Tool protocols
- **MCP:** absent
- **Tool calling:** present
- **Evidence:** Agent outputs are gathered first and then projected into one UI-facing snapshot.

### Optimisation target
- **Primary:** reliability
- **Secondary:** quality, developer-velocity
- **Notes:** The projection boundary reduces direct UI dependence on orchestration internals.

### Simplicity vs autonomy
- **Position:** balanced
- **Rationale:** Agent outputs remain autonomous, but the final UI contract is system-shaped through a deterministic projection layer.

## Forces
- UI needs richer state than persisted weekly aggregates alone provide.
- Persisted storage should remain simpler than the full runtime intelligence model.
- Orchestrator internals were previously leaking into UI rendering.

## Solution
A dedicated builder projects PipelineContext into RunnerIntelligenceSnapshot using safe extraction from summary, positioning, recommendation, trend, goal, and chart state, then the snapshot is serialized separately for DTO delivery.

## Implementation signals
- New `build_intelligence_snapshot(...)` function replaces direct UI dependence on raw orchestrator state.
- New `RunnerAPIResponse.intelligence_snapshot` field carries the serialized projection.

## Evidence
- A dedicated builder creates a UI-facing snapshot from already-computed context instead of recomputing business logic.
- The response DTO exposes `intelligence_snapshot` as an explicit product surface.
- The orchestrator attaches the intelligence snapshot before returning the response contract.

## Consequences
### Benefits
- Makes the UI consume a stable boundary object instead of ad hoc orchestrator fields.
- Allows week-scoped intelligence to be rebuilt or cached without changing the UI contract.

### Costs
- Adds another representation layer to maintain.
- Requires careful synchronization between projected fields and underlying context changes.

### Failure modes
- Projected fields can drift from source context if builder logic is incomplete.
- If the serializer omits fields, the UI may still need direct fallbacks.

## Reuse notes
- Use this when agent/service pipelines produce many intermediate fields but the consumer should depend on one stable aggregate view.
- Use it when reliability matters more than maximizing autonomous generation everywhere.

## Confidence
High. Confidence is high because the pattern is evidenced directly in the PR132 code paths and tests, with breadth consistent with a stable pattern rather than speculation.
