---
patternId: "scope-aware-visualization-context"
title: "Scope-Aware Visualization Context"
summary: "The merge adds explicit visualization scope so agents and rendering logic know whether they are producing week-scoped or full-run charts."
date: 2026-04-13
tags: ["agentic-ai", "visualization-scope", "context-shaping", "chart-correctness"]
status: "stable"
confidence: "medium"
domain: ["Agentic AI", "Visualization", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["runner-agentic-intelligence PR132", "Pipeline visualization scope context", "Orchestrator weekly vs full chart flow", "Visualization step scoped rendering"]
diagram: "/architecture/patterns/scope-aware-visualization-context.svg"
knowledgeId: "scope-aware-visualization-context"
knowledgeType: "pattern"
source:
  learning: ""
signals: []
applies_to: []
automation_ready: false
---

## Intent
Prevent confusion between week-local charts and charts aggregated across all affected weeks.

## Context
Per-week intelligence uses `week_runs` and `visualization_scope='weekly'`, while top-level results can later run a full-scope chart generation pass. The merge adds explicit visualization scope so agents and rendering logic know whether they are producing week-scoped or full-run charts.

## Agentic profile

- **System shape:** hybrid
- **Orchestration mode:** hybrid

### Agent-to-agent interaction
- **Present:** true
- **Mechanism:** shared-state
- **Evidence:** Visualization steps consume one shared context whose scope is explicitly set by the orchestrator.

### Tool protocols
- **MCP:** absent
- **Tool calling:** present
- **Evidence:** Visualization receives an explicit weekly or full-run scope instead of inferring it from whatever data is present.

### Optimisation target
- **Primary:** quality
- **Secondary:** reliability
- **Notes:** Separating weekly and full-scope views fixes wrong-chart generation across historical and aggregated paths.

### Simplicity vs autonomy
- **Position:** balanced
- **Rationale:** The agent remains free to choose chart specs, but the orchestration layer defines the data scope explicitly.

## Forces
- The same visualization machinery serves both week detail and aggregate upload results.
- Historical and current week charts were previously affected by scope confusion.

## Solution
Carry visualization scope in the pipeline context, populate week-specific runs before week intelligence, and optionally run a later full-scope chart pass for the top-level response when multiple weeks are affected.

## Implementation signals
- PipelineContext includes `visualization_scope` and `week_runs`.
- Orchestrator sets weekly scope during per-week processing and `full` for top-level chart generation.

## Evidence
- The pipeline context carries visualization scope together with separate week and full-run collections.
- The orchestrator uses weekly scope inside the per-week loop and full scope for final aggregate charts.
- The visualization step reads the context shaped by those orchestrator scope decisions.

## Consequences
### Benefits
- Improves chart correctness for historical and aggregate flows.
- Makes scope handling explicit rather than inferred from whatever runs happen to be present.

### Costs
- Adds more context fields and branch logic.
- Scope bugs can still occur if callers set the wrong mode.

### Failure modes
- Charts can still be wrong if week_runs and full runs are mixed.
- Consumers may misread top-level charts as week-scoped if labels are weak.

## Reuse notes
- Use when the same agent or tool generates artefacts for both local and aggregated scopes and needs an explicit control flag.
- Use it when quality matters more than maximizing autonomous generation everywhere.

## Confidence
Medium. Confidence is medium because the pattern is evidenced directly in the PR132 code paths and tests, with breadth consistent with a stable pattern rather than speculation.
