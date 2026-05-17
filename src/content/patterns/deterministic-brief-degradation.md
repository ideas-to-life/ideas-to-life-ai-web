---
patternId: "deterministic-brief-degradation"
title: "Deterministic Brief Degradation"
summary: "The merge introduces deterministic brief fallback when there is insufficient comparison context or intelligence is intentionally disabled for the week."
date: 2026-04-13
tags: ["agentic-ai", "fallback", "brief", "guardrail"]
status: "stable"
confidence: "high"
domain: ["Agentic AI", "Reliability", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["runner-agentic-intelligence PR132", "Deterministic brief fallback service"]
diagram: "/architecture/patterns/deterministic-brief-degradation.svg"
knowledgeId: "deterministic-brief-degradation"
knowledgeType: "pattern"
source:
  learning: "wl_20260413"
signals: []
applies_to: []
automation_ready: false
---

## Intent
Ensure week summaries remain present and predictable even when generative coaching should not run.

## Context
Snapshot recompute uses the brief service only when comparison exists and intelligence is enabled; otherwise it writes deterministic boilerplate suitable for onboarding or historical weeks. The merge introduces deterministic brief fallback when there is insufficient comparison context or intelligence is intentionally disabled for the week.

## Agentic profile

- **System shape:** hybrid
- **Orchestration mode:** sequential

### Agent-to-agent interaction
- **Present:** false
- **Mechanism:** unknown

### Tool protocols
- **MCP:** absent
- **Tool calling:** present
- **Evidence:** Brief generation falls back to deterministic text whenever the system intentionally suppresses or cannot justify generative output.

### Optimisation target
- **Primary:** reliability
- **Secondary:** safety, cost
- **Notes:** The system avoids empty brief state and avoids unnecessary LLM work when comparison or active-week conditions are not met.

### Simplicity vs autonomy
- **Position:** simplicity
- **Rationale:** Generation is explicitly degraded to deterministic output under constrained conditions.

## Forces
- Historical or first-week periods may not have enough evidence for useful LLM comparison.
- The UI still expects a readable brief field.

## Solution
Branch brief generation on comparison availability and intelligence enablement, generating deterministic fallback text for no-data, first-week, or non-active-week cases.

## Implementation signals
- `reason` values differentiate active-week LLM generation from fallback paths.
- A dedicated `_generate_deterministic_brief(...)` method supplies default text.

## Evidence
- The snapshot recompute flow switches between LLM-generated and deterministic brief generation based on available evidence and week mode.
- A dedicated deterministic brief path supplies predictable fallback text when generative coaching is disabled.

## Consequences
### Benefits
- Prevents empty or unstable brief fields.
- Improves robustness for historical or low-data weeks.

### Costs
- Fallback text can feel generic.
- Multiple brief-generation paths must stay aligned with UI expectations.

### Failure modes
- Overuse of fallback can make the product feel less personalized.
- Incorrect gating can suppress LLM generation when it should run.

## Reuse notes
- Use when a generative summary should degrade to predictable text in low-evidence or cost-constrained contexts.
- Use it when reliability matters more than maximizing autonomous generation everywhere.

## Confidence
High. Confidence is high because the pattern is evidenced directly in the PR132 code paths and tests, with breadth consistent with a stable pattern rather than speculation.
