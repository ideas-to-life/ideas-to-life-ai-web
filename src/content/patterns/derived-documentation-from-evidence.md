---
patternId: "derived-documentation-from-evidence"
title: "Derived Documentation from Evidence"
summary: "Treat docs as derived state by regenerating AS_BUILT and DELTA_BACKLOG from executable evidence to prevent drift."
date: 2026-02-11
tags: ["patterns", "evidence", "documentation", "contracts"]
status: "exploring"
confidence: "high"
domain: ["Agentic AI", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["Weekly Learnings 2026-01-09 to 2026-01-30"]
diagram: "/patterns/derived-documentation-from-evidence.svg"
---

## Intent
Reduce documentation drift by treating documentation as **derived state** rather than manually maintained truth.

## Context
Agentic systems evolve quickly. When plans and docs are edited by hand, they drift from reality. This pattern keeps documentation trustworthy by regenerating it from observed facts (PRs, tests, capabilities).

## Forces
- Speed of change vs accuracy of documentation
- Cognitive load of manual updates
- Risk of false confidence from stale docs

## Solution
Maintain two explicit documents:
- **AS_BUILT**: current reality, derived from evidence
- **DELTA_BACKLOG**: remaining gaps, derived from the delta between intent and reality

Introduce an **Evidence Collector** step before doc updates:
- gather PRs, test results, actual capabilities
- regenerate AS_BUILT and DELTA_BACKLOG from evidence
- use the result to decide next work

## Implementation signals
- Explicit separation between "current state" and "planned work"
- Doc updates gated by evidence collection
- Closed-loop workflow: issue → PR → tests → evidence → docs update

## Consequences
### Benefits
- Docs remain trustworthy under rapid change
- Reduced cognitive load and rework
- Clearer decision-making about next work

### Costs
- Requires discipline to collect evidence before updating docs
- Needs a minimal structure for what "evidence" means (tests, PRs, behaviours)

### Failure modes
- Evidence collection becomes incomplete or performative
- Docs become "generated noise" if evidence sources aren't constrained

## Reuse notes
Apply this anywhere documentation drift is common:
- agentic systems with frequent prompt/schema changes
- early-stage products with fast iteration
- multi-tool workflows where reality spans code, prompts, and deployment

Start small with:
- one AS_BUILT file
- one DELTA file
- a checklist of evidence sources

## Confidence
High — observed repeatedly across multiple weeks of execution.
