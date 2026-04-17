---
title: "Observability Hardening & Deterministic-First Governance"
slug: threads/architecture-signals-retrospective.v5
type: thread
firstObserved: 2026-02-22
lastUpdated: 2026-03-01
relatedWeeks: ["2026-02-22"]
tags: ["architecture", "observability", "governance", "mvp"]
draft: false
knowledgeType: "signal"
signalType: "curated-thread"
category: ""
strength: "emerging"
derived_from: []
knowledgeId: "threads/architecture-signals-retrospective.v5"
---

# Architecture Signals & Invalidated Assumptions — Retrospective

Scope:
- Derived from Weekly Learnings published between 2026-02-21 and 2026-03-01

## Architecture signals (emergent)

- Pattern: Observability as architectural contract (event emission + taxonomy + test-backed enforcement).
- Pattern: Deterministic-first design before introducing generative layers.
- Pattern: Mode awareness centralized at system boundary (orchestrator-owned configuration).
- Pattern: Canonical builder ownership to eliminate duplication (SnapshotBuilder as single source of truth).
- Anti-pattern: Service-layer infrastructure leakage (UI imports, logging, file I/O inside domain-facing services).
- Anti-pattern: Inferred LLM usage telemetry instead of execution-based tracking.
- Heuristic: LLM should decorate insights, not decide core system positioning.
- Heuristic: If span lifecycle cannot be reasoned about deterministically, observability is incomplete.
- Heuristic: Remove duplication early to prevent silent metric drift.

## Assumptions invalidated

- Assumption: Observability would be sufficient without strict taxonomy enforcement.
- Assumption: LLM usage inference was adequate for cost governance.
- Assumption: Roadmap clarity could be maintained without consolidation into a single decision surface.
- Assumption: Boundary discipline could be relaxed temporarily without architectural consequences.

## Notes on confidence

- High confidence: Observability-as-contract and deterministic-first signals (repeated across multiple audit iterations).
- High confidence: Boundary discipline and mode-centralization principles (validated through refactors).
- Medium confidence: Orchestrator breadth as future risk (signal emerging but not yet critical).
- Tentative: Need for earlier architectural checklists before feature implementation (requires repetition across more cycles).
