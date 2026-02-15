---
patternId: "auto-injection-of-history"
title: "Auto-Injection of History"
summary: "When current session state is empty, automatically backfill chat context with recent stored history to preserve continuity."
date: 2026-02-15
tags: ["agentic-ai", "memory", "history", "fallback", "context", "storage"]
status: "exploring"
confidence: "high"
domain: ["Agentic AI", "Architecture"]
sources: ["agentic-ai-architecture"]
diagram: "/patterns/auto-injection-of-history.svg"
---

Intent

Maintain continuity when no new data is present.

Context

Used when a user is chatting without uploading a new file and current-session features are empty. The system fetches recent historical insights from storage and injects them into chat context to avoid an "empty state" experience.

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
	•	Empty state handling
	•	User experience

Solution
	•	Detect when current session features/state are empty.
	•	Fetch recent historical insights from persistent storage.
	•	Inject the fetched items into the chat context for the next LLM call.

Implementation signals
	•	Conditional logic checking for empty features
	•	Retrieval from persistent storage

Evidence
	•	src/agents/orchestrator.py#ADKOrchestrator.chat — Fetches recent insights if no upload
	•	src/agents/chat_agent.py#ChatAgent._format_auto_insights — Formats historical items

Consequences

Benefits
	•	Seamless user experience
	•	Access to past context

Costs
	•	Complexity in context management
	•	Potential for stale data confusion

Failure modes
	•	Injecting irrelevant history

Reuse notes
	•	Check for empty session state and backfill with history.
	•	Prefer retrieving only recent and relevant items to reduce stale-context risk.

Confidence

High — both the orchestrator behavior and the formatting helper are directly evidenced.
