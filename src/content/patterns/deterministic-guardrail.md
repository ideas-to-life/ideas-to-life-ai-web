---
patternId: "deterministic-guardrail"
title: "Deterministic Guardrail"
summary: "Use a non-LLM, rule-based agent to enforce safety constraints with predictable, explainable outcomes."
date: 2026-02-15
tags: ["agentic-ai", "safety", "guardrails", "heuristics", "deterministic", "risk-assessment"]
status: "exploring"
confidence: "high"
domain: ["Agentic AI", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["Formalising the Pattern Publication System"]
diagram: "/patterns/deterministic-guardrail.svg"
---

Intent

Enforce safety constraints without relying on probabilistic LLM outputs.

Context

Applied to injury-prevention risk assessment where rules are well-defined (for example, mileage spikes). This pattern fits scenarios where safety is critical and the decision logic is better expressed as explicit thresholds and conditions.

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
	•	Safety criticality
	•	Rule clarity
	•	LLM unreliability

Solution
	•	Implement a dedicated agent class that encodes safety heuristics as hard-coded logic.
	•	Produce a risk assessment signal deterministically from input features and reports.

Implementation signals
	•	No LLM client in agent
	•	Rule-based logic (if/else)

Evidence
	•	src/agents/guardrail_agent.py#InjuryFatigueGuardrailAgent — Uses explicit thresholds for mileage increase

Consequences

Benefits
	•	Guaranteed safety check
	•	Explainable logic
	•	Fast execution

Costs
	•	Limited by defined rules
	•	Requires manual rule maintenance

Failure modes
	•	False positives/negatives if heuristics are flawed

Reuse notes
	•	Wrap critical safety checks in non-LLM agents.
	•	Prefer when constraints can be expressed as clear rules and must be predictable.

Confidence

High — the guardrail agent is evidenced as an explicit, heuristic-based component with threshold logic.
