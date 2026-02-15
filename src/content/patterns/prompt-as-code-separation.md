---
patternId: "prompt-as-code-separation"
title: "Prompt-as-Code Separation"
summary: "Store prompts outside agent code and load them at runtime to improve maintainability and enable language variants."
date: 2026-02-15
tags: ["agentic-ai", "contract", "prompts", "maintainability", "localization", "configuration"]
status: "exploring"
confidence: "high"
domain: ["Agentic AI", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["Formalising the Pattern Publication System"]
diagram: "/patterns/prompt-as-code-separation.svg"
---

Intent

Decouple prompt text from agent logic for maintainability and localization.

Context

Used for loading prompts for plan and insights agents, with prompt selection based on language settings. This applies where prompts change frequently, must be editable independently, or need multiple language variants.

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
	•	Maintainability
	•	Localization

Solution
	•	Store prompts as external text files.
	•	Load prompt text at runtime using a loader function in the agent.
	•	Select prompt variants based on language settings.

Implementation signals
	•	File reading logic in _load_instruction
	•	Path construction relative to module

Evidence
	•	src/agents/insights/agent.py#InsightsAgent.load_instruction — Loads from prompts/insights{lang}.txt

Consequences

Benefits
	•	Easier editing
	•	Multi-language support
	•	Clean code

Costs
	•	Runtime file I/O
	•	Potential missing file errors

Failure modes
	•	File not found triggers fallback

Reuse notes
	•	Store prompts in a prompts/ directory and load dynamically.
	•	Keep loader behavior predictable and ensure prompt files are packaged/deployed with the app.

Confidence

High — the prompt loading method and file path pattern are explicitly evidenced.
