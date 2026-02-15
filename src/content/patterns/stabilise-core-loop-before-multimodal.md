---
patternId: "stabilise-core-loop-before-multimodal"
title: "Stabilise the Core Loop Before Adding Modalities"
summary: "Defer multimodal features until the text-based agent loop and contracts are stable, to avoid compounding uncertainty."
date: 2026-02-12
tags: ["patterns", "stability", "scope", "multimodal", "iteration"]
status: "exploring"
confidence: "medium"
domain: ["Agentic AI", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["Runner Agentic Intelligence weekly learnings: multimodal deferred until core flow stabilized"]
diagram: "/patterns/stabilise-core-loop-before-multimodal.svg"
---

## Intent
Avoid compounding complexity by stabilising the agentic control loop and contracts before introducing new modalities.

## Context
Adding image/audio inputs or outputs expands:
- data types
- toolchains
- failure modes
- evaluation surface

If the core loop is unstable, multimodal work becomes hard to diagnose and easy to misattribute.

## Forces
- Product ambition vs architectural clarity
- Learning speed vs reliability
- Feature breadth vs debuggability

## Solution
Define a clear "core loop" (inputs → reasoning → tools → outputs) and stabilise it first:
- contracts (prompt/schema)
- evaluation and regression tests
- observability and traceability
Only then expand modalities behind flags or separate adapters.

## Implementation signals
- Explicit decision to defer multimodal scope
- Regression tests focus on core text workflows
- Modalities planned as adapters rather than embedded into core logic

## Consequences
### Benefits
- Faster learning with lower debugging overhead
- Clearer evidence of what improved quality
- Safer incremental expansion

### Costs
- Slower delivery of multimodal features
- Some insights may be delayed until richer inputs exist

### Failure modes
- "Deferral" becomes permanent avoidance
- Multimodal requires rethinking contracts if postponed too long without design foresight

## Reuse notes
Make deferral explicit:
- define what "core loop stable" means
- list preconditions for enabling multimodal
- keep a small spike path to avoid total blindness

## Confidence
Medium — observed as a repeated scope control move; broader validation still pending.