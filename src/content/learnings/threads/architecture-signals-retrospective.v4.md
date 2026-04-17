---
title: "Architecture Inflection: Determinism, Observability & Provider Boundaries"
slug: threads/architecture-signals-retrospective.v4
type: thread
firstObserved: 2026-02-15
lastUpdated: 2026-02-20
relatedWeeks: ["2026-02-16"]
tags: ["architecture", "determinism", "observability", "multi-provider", "experimentation"]
draft: false
knowledgeType: "signal"
signalType: "curated-thread"
category: ""
strength: "emerging"
derived_from: []
knowledgeId: "threads/architecture-signals-retrospective.v4"
---

# Architecture Signals & Invalidated Assumptions — Retrospective

Scope:
- Derived from Weekly Learnings published between 2026-02-15 and 2026-02-20

## Architecture signals (emergent)

- Pattern: Deterministic analytics engine as system spine (Runs → WeeklySnapshotEngine → TrendEngine → Agents).
- Pattern: Recompute-from-raw invariant as single source of truth enforcement.
- Pattern: Null-object enforcement to stabilise empty-state domain contracts.
- Pattern: Centralised multi-provider abstraction via `LLMClient` + LiteLLM boundary.
- Pattern: Observability maturation (trace_id propagation, structured logs, span lifecycle discipline).
- Pattern: Platform lifecycle awareness as architectural constraint (HF async bootstrap behaviour).
- Anti-pattern: Model duplication across domain boundaries (parallel models in different layers).
- Anti-pattern: In-memory vs persisted ambiguity during refactor transitions.
- Anti-pattern: Treating empty states as edge cases rather than first-class contracts.
- Heuristic: When complexity spikes, define invariants first, then refactor around them.
- Heuristic: Separate deterministic computation (domain layer) from generative reasoning (agent layer).
- Heuristic: Centralise vendor/provider integration early to reduce blast radius.

## Assumptions invalidated

- Assumption: Recompute would implicitly restore deleted historical weeks.
- Assumption: Storage-disabled mode would degrade gracefully without explicit domain contracts.
- Assumption: Async lifecycle behaves consistently across local and managed environments.
- Assumption: Basic logging is sufficient for multi-agent orchestration debugging.
- Assumption: Provider configuration can remain distributed without long-term architectural cost.
- Assumption: Ingestion pipeline (e.g., GPX HR parsing) was sufficiently complete.

## Notes on confidence

- Deterministic engine spine and recompute invariant: high confidence (repeated across refactors and bug fixes).
- Provider centralisation via LiteLLM: high confidence (strategic boundary reinforced through integration testing across Gemini, OpenAI, HF).
- Observability as architectural requirement: high confidence (critical in debugging cross-agent and deployment issues).
- Platform lifecycle constraints as recurring driver: medium confidence (environment-specific but strongly evidenced).
- Long-term scalability of recompute-on-startup strategy: tentative (validated manually, not yet stress-tested at larger historical scale).
