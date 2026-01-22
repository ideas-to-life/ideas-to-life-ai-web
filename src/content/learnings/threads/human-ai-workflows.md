---
title: "From personal need to repeatable human–AI workflow"
type: thread
first-observed: 2026-01-23
last-updated: 2026-01-23
related-weeks: ["2026-01-23"]
tags: ["human-ai", "workflow", "experimentation"]
---

### This week’s focus

Use a concrete personal need as a test case to refine how Ideas to Life experiments are conceived, built, deployed, and shared through deliberate human–AI collaboration.

### What actually happened

- A personal need to quickly understand Claude Code triggered a new experiment rather than a one-off solution.
- The idea was explored through structured conversation with ChatGPT to assess fit, desirability, and whether to make it public.
- Prompt-driven workflows were introduced for both content generation (Claude Code) and deployment (Google Antigravity).
- Multiple deployment options for cheat sheets were explored before standardising on static HTML under `public/`.
- An earlier Astro-based deployment was retrofitted to the static approach and validated locally before going live.
- Clear separation was established between experiments (Markdown) and artefacts (static HTML).
- Supporting documentation (CLAUDE.md, EXPERIMENTS.md, GOOGLE_ADK.md) was created to clarify direction and future evolution.
- The experiment was shipped live and shared incrementally via LinkedIn and GitHub Discussions, with careful attention to tone and channel intent.
- Experiment statuses and GitHub Project statuses were aligned, resolving confusion around tooling defaults.

### Key trade-offs

- Choosing repeatability over polish meant accepting rough edges in favour of a reusable process.
- Exploring multiple deployment options provided confidence but introduced some rework before convergence.
- Using AI heavily for exploration reduced friction but required tighter prompt discipline to avoid ambiguity.
- Shipping early traded completeness for momentum and real-world signal.
- Avoiding over-engineering limited optional features but preserved focus and velocity.

### What changed in my thinking

- Personal pain points are not just valid starting points but strong filters for experimentation.
- AI is most valuable as a thinking partner before and during execution, not as a shortcut to answers.
- Clear intent in prompts (e.g. create vs publish) is as important as technical correctness.
- Deployment simplicity can be a strategic choice, not a compromise.
- Documentation can function as an active thinking tool rather than a retrospective artefact.

### Key takeaways

- Start from concrete personal needs to reduce ambiguity and accelerate progress.
- Design experiments for repeatability, not one-off success.
- Make intent explicit early to reduce downstream friction.
- Separate narrative (experiments) from artefacts to keep systems legible.
- Velocity comes from removing friction, not rushing execution.

### Looking ahead (optional)

- Make intent and deployment defaults explicit earlier in future experiments.
- Define clearer heuristics for when to stop exploring options and commit.
- Introduce lightweight upfront checks for tooling assumptions to reduce rework.
