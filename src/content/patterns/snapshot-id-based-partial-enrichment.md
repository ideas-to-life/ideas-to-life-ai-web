---
patternId: "snapshot-id-based-partial-enrichment"
title: "Snapshot ID-Based Partial Enrichment"
summary: "The merge preserves weekly snapshot identity so later intelligence and chart enrichment can target a stable persisted record."
date: 2026-04-13
tags: ["agentic-ai", "identity", "partial-update", "snapshot"]
status: "stable"
confidence: "high"
domain: ["Agentic AI", "Persistence", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["runner-agentic-intelligence PR132", "Snapshot recompute identity preservation", "Weekly snapshot enrichment by id", "Orchestrator chart enrichment flow"]
diagram: "/architecture/patterns/snapshot-id-based-partial-enrichment.svg"
---

## Intent
Avoid losing or overwriting chart attachments when a week is recomputed and then enriched later.

## Context
The service preserves an existing snapshot id during recompute and later uses that id for chart-specific updates. The merge preserves weekly snapshot identity so later intelligence and chart enrichment can target a stable persisted record.

## Agentic profile

- **System shape:** hybrid
- **Orchestration mode:** sequential

### Agent-to-agent interaction
- **Present:** false
- **Mechanism:** unknown

### Tool protocols
- **MCP:** absent
- **Tool calling:** absent
- **Evidence:** Recompute preserves snapshot identity and later enrichment updates target that stable record.

### Optimisation target
- **Primary:** reliability
- **Secondary:** safety
- **Notes:** Preserving stable identity avoids writing chart enrichments onto the wrong weekly record.

### Simplicity vs autonomy
- **Position:** simplicity
- **Rationale:** Identity preservation constrains enrichment to one snapshot instance rather than regenerating independent records.

## Forces
- Weekly metrics are recomputed before intelligence artefacts are added.
- Language and week-based updates can otherwise target the wrong record.

## Solution
When recomputing a week, reuse the existing cached snapshot id if present; then update intelligence-specific fields such as charts by snapshot id rather than only by week key.

## Implementation signals
- Recompute path assigns `weekly_snapshot.id` from the affected cached snapshot.
- Repository update for charts uses `WHERE id = ?`.

## Evidence
- The recompute path preserves the existing snapshot id when rebuilding a week.
- Later chart enrichment updates target snapshot identity rather than only the week key.

## Consequences
### Benefits
- Preserves chart associations across recomputes.
- Supports later partial enrichment of already-persisted weekly rows.

### Costs
- Makes the persistence lifecycle multi-phase.
- Requires careful id propagation between cache, service, and repository.

### Failure modes
- Missing or stale ids can still orphan enrichments.
- If the cache is wrong, the wrong snapshot id may be preserved.

## Reuse notes
- Useful when derived artefacts are added after the main persistence write and must target a stable aggregate record.
- Use it when reliability matters more than maximizing autonomous generation everywhere.

## Confidence
High. Confidence is high because the pattern is evidenced directly in the PR132 code paths and tests, with breadth consistent with a stable pattern rather than speculation.
