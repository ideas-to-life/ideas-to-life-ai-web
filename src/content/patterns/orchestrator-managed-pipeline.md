---
patternId: "orchestrator-managed-pipeline"
title: "Orchestrator-Managed Pipeline"
summary: "Use a central orchestrator to run a fixed, dependency-ordered sequence of agents so analysis steps remain consistent and traceable."
date: 2026-02-15
tags: ["agentic-ai", "control", "orchestration", "pipeline", "sequential", "data-lineage"]
status: "exploring"
confidence: "high"
domain: ["Agentic AI", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["Formalising the Pattern Publication System"]
---

Intent

Ensure a strict, repeatable sequence of processing steps so analysis generation is consistent.

Context

Used in the main analysis flow where data dependency is linear and each step depends on outputs from the previous one (features → risk → insights → plan). This fits workflows where the order is fixed and predictable execution matters.

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
	•	Data dependency
	•	Consistency requirement

Solution
	•	Implement a central orchestrator class.
	•	The orchestrator explicitly calls each agent in a predefined order.
	•	Outputs from one step are passed as inputs to the next step.

Implementation signals
	•	Sequential method calls in orchestrator.run
	•	Explicit data passing between steps

Evidence
	•	src/agents/orchestrator.py#ADKOrchestrator.run — Sequence: feature_agent → guardrail_agent → insights_agent → plan_agent

Consequences

Benefits
	•	Predictable execution
	•	Easy to debug
	•	Clear data lineage

Costs
	•	Rigid flow
	•	Harder to handle dynamic dependencies

Failure modes
	•	Pipeline breaks if one step fails

Reuse notes
	•	Use for batch processing workflows where the step order is fixed.
	•	Prefer when dependencies are linear and you want clear handoffs between steps.

Confidence

High — the orchestrator sequence is directly evidenced in the orchestrator run method and described as an explicit step order.
