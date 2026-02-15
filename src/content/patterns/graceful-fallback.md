---
patternId: "graceful-fallback"
title: "Graceful Fallback"
summary: "Wrap LLM calls with error handling that returns safe defaults so the system stays usable when generation fails."
date: 2026-02-15
tags: ["agentic-ai", "safety", "reliability", "fallback", "error-handling", "resilience"]
status: "exploring"
confidence: "high"
domain: ["Agentic AI", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["Formalising the Pattern Publication System"]
---

Intent

Ensure the system remains functional even if LLM generation fails.

Context

Used when handling errors in insights, plan, and routing components. This applies where user experience and service continuity matter more than perfect outputs, and where transient provider/model failures are expected.

Agentic profile
	•	System shape: unknown
	•	Orchestration mode: unknown

Agent-to-agent interaction
	•	Present: unknown
	•	Mechanism: unknown
	•	Evidence: unknown

Tool protocols
	•	MCP: unknown
	•	Tool calling: unknown
	•	Evidence: unknown

Optimisation target
	•	Primary: unknown
	•	Secondary: unknown
	•	Notes: unknown

Simplicity vs autonomy
	•	Position: unknown
	•	Rationale: unknown

Forces
	•	Reliability
	•	User experience

Solution
	•	Catch exceptions around LLM calls (try/except).
	•	Return a default safe response object or a generic error structure.
	•	For routing, fall back to a safe route when classification fails.

Implementation signals
	•	Try/except blocks around LLM calls
	•	Return default objects on error

Evidence
	•	src/agents/insights/agent.py#InsightsAgent._fallback_error — Returns generic error structure
	•	src/router/router.py#async_route — Falls back to CHAT on error

Consequences

Benefits
	•	System resilience
	•	Prevents crashes

Costs
	•	Masks underlying issues
	•	Degraded functionality

Failure modes
	•	Fallback might be inappropriate for context

Reuse notes
	•	Always wrap LLM calls in try/except with defaults.
	•	Treat fallbacks as safety nets and ensure failures remain observable elsewhere (e.g., logs).

Confidence

High — fallback behaviors are explicitly evidenced in both the insights agent and router.