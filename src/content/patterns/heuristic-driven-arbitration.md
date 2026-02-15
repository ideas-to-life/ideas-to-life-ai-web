---
patternId: "heuristic-driven-arbitration"
title: "Heuristic-Driven Arbitration"
summary: "Use a control point to adjust LLM-produced outputs based on deterministic safety signals from other components."
date: 2026-02-15
tags: ["agentic-ai", "control", "safety", "post-processing", "arbitration", "guardrails"]
status: "exploring"
confidence: "high"
domain: ["Agentic AI", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["Formalising the Pattern Publication System"]
diagram: "/patterns/heuristic-driven-arbitration.svg"
---

Intent

Modify LLM outputs based on safety signals from other components.

Context

Used to modify the training plan based on the risk level produced by a guardrail agent. This applies when a downstream LLM output must be overridden or adjusted to comply with safety requirements.

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
	•	Safety override
	•	LLM hallucination risk

Solution
	•	Intercept the LLM-generated plan in the orchestrator.
	•	Modify the plan using conditional post-processing based on the risk assessment.
	•	Apply string manipulation to replace intensity-related terms when risk is high.

Implementation signals
	•	Post-processing logic in orchestrator
	•	Conditional modification of agent output

Evidence
	•	src/agents/orchestrator.py#ADKOrchestrator._apply_guardrails_to_plan — Replaces intensity keywords if risk is HIGH

Consequences

Benefits
	•	Enforces safety on final output
	•	Centralized control

Costs
	•	Brittle string manipulation
	•	Coupling between orchestrator and output format

Failure modes
	•	Replacement fails if the LLM changes terminology

Reuse notes
	•	Use with caution; prefer prompting the LLM with constraints over post-hoc string editing.
	•	If used, keep replacement rules small and tightly scoped to known output formats.

Confidence

High — the arbitration method is explicitly referenced as an orchestrator post-processing step tied to a safety signal.