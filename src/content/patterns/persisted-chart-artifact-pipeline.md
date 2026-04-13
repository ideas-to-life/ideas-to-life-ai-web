---
patternId: "persisted-chart-artifact-pipeline"
title: "Persisted Chart Artifact Pipeline"
summary: "The merge converts visualization outputs into serialized image artefacts that can be persisted, reloaded, and rendered without live figure state."
date: 2026-04-13
tags: ["agentic-ai", "visualization", "persistence", "artifact", "serialization"]
status: "stable"
confidence: "high"
domain: ["Agentic AI", "Gradio", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["runner-agentic-intelligence PR132", "Chart serialization helpers", "Weekly snapshot chart persistence", "Intelligence snapshot serializer", "Gradio chart rendering path"]
diagram: "/architecture/patterns/persisted-chart-artifact-pipeline.svg"
---

## Intent
Break the dependency between UI rendering and in-memory Matplotlib figure lifecycle.

## Context
This appears in the visualization and persistence refactor that standardizes chart handling as dict-based image artefacts. The merge converts visualization outputs into serialized image artefacts that can be persisted, reloaded, and rendered without live figure state.

## Agentic profile

- **System shape:** hybrid
- **Orchestration mode:** hybrid

### Agent-to-agent interaction
- **Present:** false
- **Mechanism:** unknown

### Tool protocols
- **MCP:** absent
- **Tool calling:** present
- **Evidence:** Chart outputs are converted into stored artefacts and later decoded for the UI.

### Optimisation target
- **Primary:** reliability
- **Secondary:** quality, latency
- **Notes:** Persisted artefacts make UI rendering independent of the original live figure object.

### Simplicity vs autonomy
- **Position:** balanced
- **Rationale:** Charts remain dynamically generated, but the runtime contract stabilizes around serialized artefacts.

## Forces
- Figures are not naturally JSON-serializable.
- Historical weeks and restarts need reproducible chart rendering.
- UI should consume persisted artefacts the same way for live and historical paths.

## Solution
Convert charts to base64 strings for storage, store them alongside weekly snapshots, decode them back into PIL images for the UI, and serialize charts again when the intelligence snapshot is returned.

## Implementation signals
- New helper functions `figure_to_base64`, `serialize_charts`, and `decode_chart`.
- Repository-level `save_intelligence_snapshot(...)` persists charts by snapshot id.

## Evidence
- Helper functions convert figures into base64 artefacts and decode them back into UI-ready images.
- Repository writes persist serialized charts by snapshot identity instead of relying on transient figure state.
- Snapshot serialization reuses the stored chart artefacts when returning the UI contract.

## Consequences
### Benefits
- Charts survive restarts and historical reconstruction paths.
- The UI can render persisted charts consistently.

### Costs
- Adds image encoding and decoding overhead.
- Introduces another serialization format boundary to maintain.

### Failure modes
- Corrupt base64 or unsupported objects can degrade chart rendering.
- Partial updates can leave weekly metrics and chart artefacts out of sync.

## Reuse notes
- Use when a visualization-producing agent or tool returns non-serializable runtime objects that must survive persistence and replay.
- Use it when reliability matters more than maximizing autonomous generation everywhere.

## Confidence
High. Confidence is high because the pattern is evidenced directly in the PR132 code paths and tests, with breadth consistent with a stable pattern rather than speculation.
