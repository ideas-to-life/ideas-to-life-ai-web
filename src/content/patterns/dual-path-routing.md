---
patternId: "dual-path-routing"
title: "Dual-Path Routing"
summary: "Classify user intent into a small set of routes and dispatch to specialized handlers to optimize responses for different request types."
date: 2026-02-15
tags: ["agentic-ai", "planning", "routing", "intent-classification", "dispatch", "specialization"]
status: "exploring"
confidence: "high"
domain: ["Agentic AI", "Architecture"]
sources: ["agentic-ai-architecture"]
diagram: "/patterns/dual-path-routing.svg"
---

Intent

Direct user queries to the most appropriate specialized handler.

Context

Used to decide between generating a chart or returning a text response. A lightweight LLM classification produces an intent decision (CHAT vs CHART), and the orchestrator dispatches to the corresponding agent.

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
	•	Specialized capabilities
	•	Efficiency

Solution
	•	Add a router that classifies user intent into a small set of routes (e.g., CHAT vs CHART).
	•	Use a schema for the route decision to keep routing predictable.
	•	Dispatch from the orchestrator to the specialized handler based on the router result.

Implementation signals
	•	Dedicated router module
	•	Intent classification schema

Evidence
	•	src/router/router.py#async_route — Returns RouteDecision
	•	src/agents/orchestrator.py#ADKOrchestrator.chat — Dispatches based on intent

Consequences

Benefits
	•	Separation of concerns
	•	Optimized handling

Costs
	•	Latency of extra LLM call
	•	Router accuracy dependency

Failure modes
	•	Misclassification leads to wrong agent

Reuse notes
	•	Use a router when handling diverse request types.
	•	Keep the route set small and the decision schema explicit.

Confidence

High — routing and dispatch behavior are evidenced in both the router and orchestrator.
