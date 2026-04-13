---
patternId: "cache-aside-week-intelligence-builder"
title: "Cache-Aside Week Intelligence Builder"
summary: "The merge introduces a cache-aside path for week intelligence so dormant weeks are materialized only when the UI requests them."
date: 2026-04-13
tags: ["agentic-ai", "cache-aside", "lazy-build", "week-navigation"]
status: "stable"
confidence: "high"
domain: ["Agentic AI", "Lazy Loading", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["runner-agentic-intelligence PR132", "Cache-aside week intelligence builder", "Lazy intelligence test coverage"]
diagram: "/architecture/patterns/cache-aside-week-intelligence-builder.svg"
---

## Intent
Support interactive week selection without precomputing full intelligence for every historical period.

## Context
The UI can ask for a specific week, and the orchestrator returns a cached intelligence snapshot if complete or builds it on demand from persisted data. The merge introduces a cache-aside path for week intelligence so dormant weeks are materialized only when the UI requests them.

## Agentic profile

- **System shape:** hybrid
- **Orchestration mode:** event-driven

### Agent-to-agent interaction
- **Present:** true
- **Mechanism:** shared-state
- **Evidence:** The orchestrator rebuilds missing week intelligence into one shared snapshot state only when the cache contract requires it.

### Tool protocols
- **MCP:** absent
- **Tool calling:** present
- **Evidence:** Intelligence steps are invoked lazily on cache miss rather than eagerly for every week.

### Optimisation target
- **Primary:** latency
- **Secondary:** cost, quality
- **Notes:** Defers expensive intelligence work until a week is actually requested.

### Simplicity vs autonomy
- **Position:** balanced
- **Rationale:** The build is autonomous once triggered, but only triggered when the cache contract demands it.

## Forces
- Historical intelligence can be expensive to precompute.
- Week-level UI navigation must remain responsive.

## Solution
Implement `get_or_build_intelligence_snapshot(...)` as a cache-aside function that checks completeness first, reconstructs week context from repositories on miss, runs only intelligence-related steps, stores the result, and returns it.

## Implementation signals
- New `get_or_build_intelligence_snapshot(...)` path in orchestrator.
- Tests verify the same week is not rebuilt twice.

## Evidence
- The orchestrator rebuilds intelligence lazily from persisted weekly context and stores the result for reuse.
- Tests verify on-demand build on the first request and a cache hit on the second request for the same week.

## Consequences
### Benefits
- Avoids eager computation for rarely viewed weeks.
- Reuses one orchestrator pathway for both precomputed and on-demand intelligence.

### Costs
- Adds another execution path that must stay consistent with the main run path.
- Requires a completeness check to avoid returning partial snapshots.

### Failure modes
- Incomplete snapshot detection can be wrong.
- Repository reads can fail after the original upload session is gone.

## Reuse notes
- Apply when an agentic system supports interactive drill-down into periods or entities that should not all be materialized eagerly.
- Use it when latency matters more than maximizing autonomous generation everywhere.

## Confidence
High. Confidence is high because the pattern is evidenced directly in the PR132 code paths and tests, with breadth consistent with a stable pattern rather than speculation.
