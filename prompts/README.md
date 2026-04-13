Prompts Runtime (Ideas-to-Life)

This folder contains the execution version of prompts used by code agents (Codex, Gemini CLI, Antigravity).

Purpose

These prompts enable the full Ideas-to-Life pipeline:
	•	Pattern generation
	•	Diagram creation
	•	Website deployment

Source of truth

All prompts originate from:

ideas-to-life/ideas-to-life-prompts

This folder is a runtime copy, required because code agents only have access to the current repository.

Important rules
	•	Do NOT edit prompts here unless testing changes
	•	Any permanent change must be made in the source repo
	•	After updating source prompts, copy them here

Structure
	•	/patterns → pattern extraction and publication pipeline
	•	/architecture → architecture section sync

Execution model

Prompts are executed manually or via automation:

Manual:
	•	run prompts step-by-step using code agents

Automated (future):
	•	CI/CD pipeline executes orchestrator prompt

Design principle

Prompts are treated as:
	•	deterministic
	•	idempotent
	•	composable

They form a self-evolving architecture system.

Future evolution

This folder may later be replaced by:
	•	a prompt sync tool
	•	a shared prompts package
	•	or direct CLI integration

Until then, this copy ensures reliability and speed.

⸻

⚙️ How you’ll use this (practical flow)

🟢 Manual execution (now)

1. Extract patterns (JSON)
2. Open orchestrator prompt
3. Run via Codex / Gemini CLI
4. Validate output


⸻

🔁 Weekly flow (your current system)

weekly-learning
↓
patterns extracted
↓
run pattern-pipeline-orchestrator.v2
↓
run architecture-section-sync.v2 (if not embedded)
↓
publish


⸻

🔵 Future CI/CD (no changes needed)

on push / schedule:

- run orchestrator
- run architecture sync
- build + deploy


⸻

🧠 Small but important discipline

When you update prompts in the main repo:

1. update ideas-to-life-prompts
2. copy to /prompts here
3. commit together

👉 This keeps things predictable and reproducible

⸻

🚀 Optional (but useful now)

Add a simple helper note in your root README:

Prompts used by agents are located in /prompts


⸻

💡 Final insight

You now have:

Codebase
+ Prompts
= Executable knowledge system

This is effectively:

"infrastructure for thinking + building"

⸻