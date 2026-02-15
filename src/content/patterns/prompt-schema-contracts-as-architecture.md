---
patternId: "prompt-schema-contracts-as-architecture"
title: "Prompt–Schema Contracts as First-Class Architecture"
summary: "Treat prompts, schemas, and structure locks as architectural contracts that constrain outputs and reduce drift."
date: 2026-02-12
tags: ["patterns", "prompts", "schemas", "contracts", "reliability"]
status: "exploring"
confidence: "high"
domain: ["Agentic AI", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["Runner Agentic Intelligence weekly learnings: output quality improved via stricter prompt structure and JSON schema"]
---

## Intent
Improve reliability by constraining agent outputs through explicit structure rather than relying on model intelligence.

## Context
Agentic systems fail subtly when outputs are ambiguous: inconsistent formatting, missing fields, low-actionability. These failures often appear as "quality issues" rather than bugs.

## Forces
- Flexibility vs consistency
- Speed of iteration vs robustness
- Human readability vs machine parsing
- Model creativity vs output determinism

## Solution
Define explicit contracts for agent outputs:
- prompts with **structure locks**
- JSON schemas (or typed models) for outputs
- validation at boundaries
- retries or fallbacks when validation fails

Treat these artefacts as part of the system architecture (versioned, reviewed, tested).

## Implementation signals
- Output is specified as JSON with required fields
- Schema validation is enforced before downstream use
- Prompts include explicit sections, constraints, and stopping conditions
- Quality improvements occur after structure changes, not model changes

## Consequences
### Benefits
- More consistent outputs and fewer silent failures
- Easier debugging (contract breaks are observable)
- Safer composition across agents and pipelines

### Costs
- More upfront design effort
- Tighter constraints can reduce expressiveness

### Failure modes
- Over-constrained prompts produce robotic or unhelpful content
- Schema changes ripple if not versioned

## Reuse notes
Start with contracts at the highest-leverage boundaries:
- insights output
- planning output
- tool call payloads

Add validation early, even if basic.

## Confidence
High — repeatedly observed that structure and contracts, not model capability, determined usefulness.