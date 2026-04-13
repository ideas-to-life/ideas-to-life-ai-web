---
patternId: "language-keyed-intelligence-cache"
title: "Language-Keyed Intelligence Cache"
summary: "The merge uses `(week_start, language)` as the intelligence cache key so multilingual outputs are reused safely."
date: 2026-04-13
tags: ["agentic-ai", "cache", "i18n", "lazy-loading"]
status: "stable"
confidence: "high"
domain: ["Agentic AI", "Multilingual", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["runner-agentic-intelligence PR132", "Language-keyed snapshot cache", "Language-safe orchestrator week lookup"]
diagram: "/architecture/patterns/language-keyed-intelligence-cache.svg"
---

## Intent
Avoid stale cross-language reuse when intelligence is rebuilt lazily or week selection changes.

## Context
Cached intelligence snapshots are stored and retrieved by week plus language, and cache misses trigger rebuild instead of language fallback reuse. The merge uses `(week_start, language)` as the intelligence cache key so multilingual outputs are reused safely.

## Agentic profile

- **System shape:** hybrid
- **Orchestration mode:** event-driven

### Agent-to-agent interaction
- **Present:** true
- **Mechanism:** shared-state
- **Evidence:** Cached week intelligence is shared by the orchestrator and snapshot service using the same language-aware key.

### Tool protocols
- **MCP:** absent
- **Tool calling:** absent
- **Evidence:** Cache lookup and invalidation are controlled inside the orchestrator and snapshot service rather than through external tools.

### Optimisation target
- **Primary:** latency
- **Secondary:** quality, reliability
- **Notes:** The cache prevents unnecessary rebuilds while avoiding stale language reuse.

### Simplicity vs autonomy
- **Position:** balanced
- **Rationale:** Caching is simple operationally, but keyed by language to respect multilingual agent outputs.

## Forces
- Intelligence and UI text are language-specific.
- Week selection should be fast, but cached content must remain semantically valid.

## Solution
Key intelligence snapshots by both week and language, clear matching keys during invalidation, and return `None` when a week exists only in another language so the orchestrator rebuilds it.

## Implementation signals
- SnapshotService cache uses `Dict[Tuple[date, str], Any]`.
- Orchestrator returns `None` if only another-language snapshot exists for the week.

## Evidence
- The snapshot service manages cache entries keyed by both week and language.
- The orchestrator refuses to reuse a cached week snapshot when it belongs to the wrong language.

## Consequences
### Benefits
- Prevents stale localized UI content.
- Supports cheap repeated week views in the same language.

### Costs
- Increases cache footprint.
- Makes cache invalidation slightly more complex.

### Failure modes
- Language-specific cache misses can increase rebuild frequency.
- Incomplete invalidation can leave stale entries for some languages.

## Reuse notes
- Use when agent outputs are localized and cache reuse must remain language-safe.
- Use it when latency matters more than maximizing autonomous generation everywhere.

## Confidence
High. Confidence is high because the pattern is evidenced directly in the PR132 code paths and tests, with breadth consistent with a stable pattern rather than speculation.
