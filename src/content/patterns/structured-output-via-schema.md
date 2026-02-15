---
patternId: "structured-output-via-schema"
title: "Structured Output via Schema"
summary: "Define a formal schema for agent outputs and validate LLM responses against it to keep results machine-readable and reliable."
date: 2026-02-15
tags: ["agentic-ai", "contract", "structured-output", "schema", "pydantic", "validation"]
status: "exploring"
confidence: "high"
domain: ["Agentic AI", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["Formalising the Pattern Publication System"]
diagram: "/patterns/structured-output-via-schema.svg"
---

Intent

Ensure LLM responses are machine-readable and conform to a specific format.

Context

Used when generating insights and plans that must be parsed, stored, or integrated with UI/DB flows. This applies where type safety and consistent structure at the LLM boundary reduces downstream errors.

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
	•	Integration with UI/DB
	•	Type safety

Solution
	•	Define expected outputs as Pydantic models.
	•	Pass the schema to the LLM client to constrain generation.
	•	Validate the resulting LLM output against the schema before using or storing it.

Implementation signals
	•	Pydantic models in models.py
	•	Usage of schema argument in llm_client.generate

Evidence
	•	src/agents/insights/agent.py#InsightsAgent.run — Uses InsightsOutput schema
	•	src/llm/structured.py#validate_structured_output — Validation logic

Consequences

Benefits
	•	Reliable parsing
	•	Type checking
	•	Clear interface

Costs
	•	Prompt overhead
	•	LLM may struggle with complex schemas

Failure modes
	•	Validation errors if LLM deviates

Reuse notes
	•	Define Pydantic models for all agent outputs.
	•	Keep schemas as simple as possible to reduce validation failures.

Confidence

High — the agent and validation logic are directly evidenced via schema usage and a dedicated validation function.
