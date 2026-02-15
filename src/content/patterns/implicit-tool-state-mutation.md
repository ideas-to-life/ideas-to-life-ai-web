---
patternId: "implicit-tool-state-mutation"
title: "Implicit Tool State Mutation"
summary: "Accumulate complex outputs by having a tool call mutate agent state during generation, then read the final result from that state."
date: 2026-02-15
tags: ["agentic-ai", "execution", "tools", "state", "side-effects", "accumulation"]
status: "exploring"
confidence: "high"
domain: ["Agentic AI", "Architecture"]
sources: ["agentic-ai-architecture"]
---

Intent

Build up complex output via tool calls.

Context

Used when the visualization agent may request multiple charts. A tool call (request_chart) updates an internal list, and the final chart specifications are retrieved from that internal state after execution.

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
	•	Complex output generation
	•	Side-effects

Solution
	•	Expose a tool method (e.g., request_chart) callable during LLM generation.
	•	Have the tool append each requested item to an internal agent state list.
	•	After generation completes, return the accumulated list from agent state as the output.

Implementation signals
	•	Tool method modifies self state
	•	Result is retrieved from self after llm_client.generate

Evidence
	•	src/agents/visualization/agent.py#VisualizationAgent.request_chart — Appends to self.requested_specs

Consequences

Benefits
	•	Allows multi-step generation
	•	Flexible output count

Costs
	•	Hidden state dependency
	•	Less functional purity

Failure modes
	•	Tool not called or state not cleared

Reuse notes
	•	Useful for accumulation tasks, but ensure state is reset.
	•	Prefer clear lifecycle rules for internal state to avoid cross-request contamination.

Confidence

High — the tool method and its state mutation are directly evidenced.
