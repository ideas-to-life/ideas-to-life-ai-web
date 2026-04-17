---
title: "Architecture signals & invalidated assumptions"
slug: threads/architecture-signals-retrospective.v6
type: thread
firstObserved: 2026-03-02
lastUpdated: 2026-03-08
relatedWeeks: ["2026-03-08"]
tags: ["architecture", "experimentation", "agentic-ai", "pipeline"]
draft: false
knowledgeType: "signal"
signalType: "curated-thread"
category: ""
strength: "emerging"
derived_from: []
knowledgeId: "threads/architecture-signals-retrospective.v6"
---

Scope:

- Derived from Weekly Learnings published between 2026-03-02 and 2026-03-08

## Architecture signals (emergent)

- Pattern: Pipeline-based orchestration with explicit execution steps improves architectural clarity compared to large orchestrator classes.
- Pattern: Typed execution context (PipelineContext) stabilises multi-step pipelines and enables safe parallel agent execution.
- Pattern: Parallel agent execution becomes viable once step isolation and context contracts are enforced.
- Pattern: Lightweight deterministic intelligence engines (positioning, trajectory, classification) provide strong product intelligence without requiring complex ML infrastructure.
- Anti-pattern: Repository access inside pipeline steps introduces boundary leaks and weakens architecture discipline.
- Anti-pattern: Orchestrator-private methods reused by steps create hidden coupling and block modular evolution.
- Anti-pattern: Unconditional LLM invocation at agent level leads to uncontrolled cost surfaces.
- Heuristic: Architectural audits should be executed continuously during refactors rather than only at milestones.
- Heuristic: When a refactor introduces unexpected behaviour, first verify lifecycle execution (pipeline triggers, startup flows) before debugging algorithm logic.
- Constraint: Cold-start conditions (no history, partial weeks) must be treated as a first-class architecture concern in behavioural intelligence systems.

## Assumptions invalidated

- Assumption: Snapshot recomputation issues were caused by aggregation logic errors rather than pipeline lifecycle gaps.
- Assumption: Parallel agent execution would require significant architectural redesign rather than pipeline isolation.
- Assumption: Initial pipeline refactor fully removed step–repository coupling.
- Assumption: Trend-based intelligence signals could be safely computed without explicit cold-start handling.

## Notes on confidence

- High confidence: pipeline orchestration pattern, typed context contracts, step isolation requirements.
- Medium confidence: deterministic intelligence engines as the dominant architectural pattern for behavioural coaching systems.
- Tentative: optimal strategy for LLM governance and centralized policy enforcement across agents.
