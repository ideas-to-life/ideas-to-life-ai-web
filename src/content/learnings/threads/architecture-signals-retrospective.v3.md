---
title: "Architecture signals & invalidated assumptions"
slug: threads/architecture-signals-retrospective.v3
type: thread
first-observed: 2026-02-09
last-updated: 2026-02-14
related-weeks: ["2026-02-09"]
tags: ["architecture", "experimentation"]
draft: false
---

# Architecture Signals & Invalidated Assumptions — Retrospective

Scope:
- Derived from Weekly Learnings published between 2026-02-09 and 2026-02-14
- No changes made to original Weekly Learnings
- Signals extracted retrospectively

## Architecture signals (emergent)

- Pattern: Extraction ≠ publication — introduce a governance boundary between signal detection (JSON extraction) and artefact creation (Pattern publication).
- Pattern: Descriptive metadata must not implicitly enforce architectural shape (agentic_profile as context, not constraint).
- Pattern: Schema alignment across extractor, transformer, template, and runbook is a first-class architectural concern.
- Heuristic: Prefer explicit `unknown` over silent inference when evidence is incomplete.
- Heuristic: Lifecycle states (Exploring → Validating → Stable → Retired) act as entropy control for evolving knowledge systems.
- Anti-pattern: Introducing new schema dimensions without clarifying intent (descriptive vs prescriptive) leads to downstream misalignment.

## Assumptions invalidated

- Assumption: Adding richer architectural dimensions (e.g., agentic profile) automatically improves clarity → It can unintentionally narrow scope or overfit the catalogue.
- Assumption: Toolchain components (extractor, template, transformer) can evolve independently → Schema drift emerges quickly without coordinated updates.
- Assumption: Agentic architecture patterns are primarily multi-agent → Cross-cutting single-agent patterns (e.g., abstraction boundaries, prompt contracts) are equally agentic when they shape control and reliability.

## Notes on confidence

- Signals observed clearly this week: extraction ≠ publication boundary, descriptive metadata principle, schema alignment as architecture.
- Tentative signals: lifecycle states as long-term entropy control (early in adoption), optimisation taxonomy within agentic_profile (limited repetition so far).