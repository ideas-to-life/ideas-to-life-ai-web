---
title: "Architecture signals & invalidated assumptions"
slug: threads/architecture-signals-retrospective.v2
type: thread
first-observed: 2026-02-01
last-updated: 2026-02-07
related-weeks: ["2026-02-01"]
tags: ["architecture", "experimentation"]
draft: false
---

# Architecture Signals & Invalidated Assumptions — Retrospective

Scope:
- Derived from structured Weekly Learnings between the most recent weekly-learning start and today
- Original Weekly Learnings left unchanged
- Signals extracted retrospectively across execution, architecture, and release work

## Architecture signals (emergent)

- **Pattern: Documentation as a generated artefact**
  - AS_BUILT and DELTA_BACKLOG are most reliable when regenerated from code + evidence, not manually edited.
  - This reduced drift, debate, and ambiguity across multiple iterations.

- **Pattern: Prompt and schema contracts as architecture**
  - LLM prompts, output schemas, and validation rules behaved as hard system boundaries.
  - When contracts were explicit and deterministic, UX stability and composability improved sharply.

- **Pattern: Early abstraction of volatile dependencies**
  - Abstracting LLM providers early prevented cost escalation and vendor lock-in.
  - Treating LLMs as pluggable infrastructure enabled rapid experimentation without rework.

- **Pattern: UX gating before intelligence**
  - Explicit UI state transitions (upload → analyse → results → chat) reduced complexity more than adding agent logic.
  - Structural clarity outperformed “smarter” behavior.

- **Anti-pattern: Implicit state and hidden assumptions**
  - UI, chat context, and persistence assumptions caused repeated confusion until made explicit.
  - Implicit defaults (language, session scope, persistence) led to mixed or broken user experiences.

- **Heuristic: Prefer deterministic structure over generative freedom**
  - Constraining LLM outputs early (schemas, fixed sections) produced higher-quality, more usable results.
  - Flexibility can be added later; stability cannot be retrofitted cheaply.

- **Heuristic: Lightweight heuristics beat agentic complexity early**
  - Simple intent detection (e.g., chart requests) delivered sufficient value without orchestration overhead.
  - Premature agent intelligence would likely have increased fragility.

## Assumptions invalidated

- **Assumption: LLM abstraction can be deferred**
  - Invalidated once cost, provider behavior, and schema differences surfaced early.
  - Abstraction proved foundational, not optional.

- **Assumption: UX polish should follow backend completeness**
  - Invalidated by user testing; UX structure delivered immediate value even with partial functionality.

- **Assumption: Deployment scripts are “safe glue code”**
  - Invalidated by destructive operations and leaked artefacts.
  - Deployment required the same rigor as core application logic.

- **Assumption: Multilingual support is mostly UI copy**
  - Invalidated once language propagation affected prompts, orchestration, and outputs.
  - Language became a cross-cutting concern.

## Notes on confidence

- High confidence:
  - Prompt/schema contracts as architectural boundaries
  - Documentation as a regenerable artefact
  - Early abstraction of volatile dependencies
  - UX gating reducing system complexity

- Moderate confidence:
  - Local-first persistence as default for early consumer products
  - Lightweight heuristics outperforming agentic approaches at this stage

- Tentative:
  - Exact boundary between “enough structure” and over-constraint in prompts
  - Long-term scalability of Gradio-first UX without a frontend rewrite