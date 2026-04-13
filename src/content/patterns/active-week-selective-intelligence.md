---
patternId: "active-week-selective-intelligence"
title: "Active-Week Selective Intelligence"
summary: "The merge limits full intelligence generation to active or explicitly requested weeks and uses deterministic fallback for non-active historical weeks."
date: 2026-04-13
tags: ["agentic-ai", "active-week", "historical-data", "fallback"]
status: "stable"
confidence: "medium"
domain: ["Agentic AI", "Optimization", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["runner-agentic-intelligence PR132", "Active-week orchestration heuristic", "Historical week deterministic fallback"]
diagram: "/architecture/patterns/active-week-selective-intelligence.svg"
---

## Intent
Concentrate expensive intelligence generation on the weeks most likely to matter in the UI while preserving readable historical output.

## Context
During multi-week orchestration, only active or on-demand weeks run full intelligence, while non-active historical weeks can receive deterministic brief generation. The merge limits full intelligence generation to active or explicitly requested weeks and uses deterministic fallback for non-active historical weeks.

## Agentic profile

- **System shape:** hybrid
- **Orchestration mode:** hybrid

### Agent-to-agent interaction
- **Present:** true
- **Mechanism:** shared-state
- **Evidence:** The orchestrator marks active weeks and the snapshot service adjusts generation behavior for those shared week contexts.

### Tool protocols
- **MCP:** absent
- **Tool calling:** present
- **Evidence:** Full intelligence is limited to active or explicitly requested weeks, while historical weeks degrade gracefully.

### Optimisation target
- **Primary:** cost
- **Secondary:** latency, reliability
- **Notes:** Historical weeks are degraded to deterministic behavior unless explicitly requested.

### Simplicity vs autonomy
- **Position:** simplicity
- **Rationale:** The system constrains autonomous generation to active or on-demand weeks.

## Forces
- Historical weeks still need a usable view.
- Running full LLM-backed intelligence for all weeks is costly and slow.

## Solution
Select active weeks, set `enable_intelligence` accordingly for each week context, and in snapshot recompute choose between LLM brief generation and deterministic brief fallback based on `enable_intelligence` and comparison availability.

## Implementation signals
- Orchestrator computes `active_weeks` before the per-week loop.
- SnapshotService chooses deterministic brief generation when intelligence is disabled for a week.

## Evidence
- The orchestrator selects active weeks and toggles intelligence generation for each one.
- The snapshot service falls back to deterministic brief generation when a historical week is not active.

## Consequences
### Benefits
- Keeps current-week experience richer than bulk historical processing.
- Reduces cost and response time for multi-week orchestration.

### Costs
- Historical weeks may present less rich intelligence unless explicitly requested.
- Active-week selection becomes a critical product heuristic.

### Failure modes
- Wrong active-week selection can hide intelligence where users expect it.
- Fallback briefs may feel inconsistent relative to LLM-generated weeks.

## Reuse notes
- Useful when only a subset of periods needs full generative analysis and the remainder can degrade gracefully.
- Use it when cost matters more than maximizing autonomous generation everywhere.

## Confidence
Medium. Confidence is medium because the pattern is evidenced directly in the PR132 code paths and tests, with breadth consistent with a stable pattern rather than speculation.
