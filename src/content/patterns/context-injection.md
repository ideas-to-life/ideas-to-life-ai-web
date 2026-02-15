---
patternId: "context-injection"
title: "Context Injection"
summary: "Collect relevant state from system stores and inject it into prompts as structured context to enable data-aware responses without fine-tuning."
date: 2026-02-15
tags: ["agentic-ai", "memory", "context", "prompting", "state", "personalization"]
status: "exploring"
confidence: "high"
domain: ["Agentic AI", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["Formalising the Pattern Publication System"]
diagram: "/patterns/context-injection.svg"
---

Intent

Provide relevant state to the agent for context-aware responses.

Context

Used when a chat-facing agent must respond to user queries about their data, while LLM calls themselves are stateless. This pattern suits systems that keep state externally (stores, DB) and need to present it to the LLM at call time.

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
	•	Stateless LLM calls
	•	Need for personalization

Solution
	•	Gather relevant state from stores before the agent call.
	•	Inject that state into the prompt template as structured text using prompt variables.
	•	Keep the injected context aligned to what the agent needs to answer the user query.

Implementation signals
	•	Prompt string formatting with variables
	•	Data retrieval before agent call

Evidence
	•	src/agents/chat_agent.py#ChatAgent.run — Injects features, insights, plan, and summary

Consequences

Benefits
	•	Context-aware answers
	•	No need for fine-tuning

Costs
	•	Context window limits
	•	Prompt complexity

Failure modes
	•	Context truncation
	•	Information overload

Reuse notes
	•	Aggressively retrieve and format context before calling the LLM.
	•	Keep injected context concise and structured to avoid prompt bloat.

Confidence

High — the chat agent run method is explicitly evidenced as injecting multiple context elements into the prompt.
