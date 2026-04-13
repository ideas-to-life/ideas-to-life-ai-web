---
patternId: "dto-backed-ui-contract"
title: "DTO-Backed UI Contract"
summary: "The merge formalizes a response DTO so the UI reads a controlled output contract rather than arbitrary orchestration state."
date: 2026-04-13
tags: ["agentic-ai", "dto", "contract", "ui-boundary"]
status: "stable"
confidence: "high"
domain: ["Agentic AI", "Gradio", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["runner-agentic-intelligence PR132", "Runner API response contract", "Orchestrator response assembly", "Gradio orchestrator response handling"]
diagram: "/architecture/patterns/dto-backed-ui-contract.svg"
---

## Intent
Reduce implicit coupling between orchestration internals and UI rendering logic.

## Context
The orchestrator now returns a structured RunnerAPIResponse with intelligence_snapshot included as a first-class field. The merge formalizes a response DTO so the UI reads a controlled output contract rather than arbitrary orchestration state.

## Agentic profile

- **System shape:** hybrid
- **Orchestration mode:** sequential

### Agent-to-agent interaction
- **Present:** false
- **Mechanism:** unknown

### Tool protocols
- **MCP:** absent
- **Tool calling:** present
- **Evidence:** The orchestrator returns one structured response object that the UI reads directly.

### Optimisation target
- **Primary:** developer-velocity
- **Secondary:** reliability
- **Notes:** DTOs reduce UI dependence on internal orchestrator structure.

### Simplicity vs autonomy
- **Position:** simplicity
- **Rationale:** The UI reads a constrained response object instead of deep orchestration state.

## Forces
- UI code previously depended on loosely shaped dictionaries and internal state.
- Multiple execution paths need a common, serializable response surface.

## Solution
Define a dataclass DTO, populate it centrally in the orchestrator, and update the UI helpers to use attribute access instead of reconstructing response shape locally.

## Implementation signals
- New `RunnerAPIResponse` dataclass in application/dto.
- UI code shifts from dict-style `.get(...)` assumptions to orchestrator-returned response attributes.

## Evidence
- A dedicated response DTO defines the backend contract returned to the UI.
- The orchestrator constructs that DTO centrally at the end of execution.
- The UI reads the response object directly instead of rebuilding a free-form dict shape.

## Consequences
### Benefits
- Creates one explicit backend-to-UI contract.
- Makes serialization failures easier to isolate.

### Costs
- Adds an extra mapping layer in the orchestrator.
- Requires DTO updates whenever product surface changes.

### Failure modes
- DTO fields can become a grab bag if not curated.
- Fallback DTO generation may mask root-cause serialization issues.

## Reuse notes
- Useful when a single orchestrator serves a UI that is evolving faster than the internal pipeline structure.
- Use it when developer-velocity matters more than maximizing autonomous generation everywhere.

## Confidence
High. Confidence is high because the pattern is evidenced directly in the PR132 code paths and tests, with breadth consistent with a stable pattern rather than speculation.
