---
patternId: "llm-provider-abstraction-boundary"
title: "LLM Provider Abstraction Boundary"
summary: "Introduce a provider-agnostic interface so agents can switch LLM backends without rewriting orchestration logic."
date: 2026-02-12
tags: ["patterns", "llm", "abstraction", "portability", "cost"]
status: "exploring"
confidence: "high"
domain: ["Agentic AI", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
sources: ["Runner Agentic Intelligence weekly learnings: LLM abstraction via LiteLLM; cross-provider regression testing"]
---

## Intent
Reduce cost and lock-in risk by making LLM choice a configuration concern rather than a code rewrite.

## Context
Agentic systems often depend on closed models or provider-specific APIs. Switching providers later creates friction, rework, and inconsistent behaviour.

## Forces
- Portability vs provider-specific features
- Cost control vs performance
- Consistency vs model diversity
- Operational simplicity vs flexibility

## Solution
Create a clear boundary between:
- **Agent/orchestration logic** (provider-agnostic)
- **LLM adapter layer** (provider-specific implementation)

Expose a stable interface (OpenAI-compatible or similar), and route all model calls through the adapter. Keep model selection in config, not code.

## Implementation signals
- A single “LLM client” used across agents
- Provider/model selection occurs via configuration
- Regression tests run across multiple providers with the same prompts/contracts

## Consequences
### Benefits
- Faster provider switching and experimentation
- Reduced rewrite risk
- Clearer cost/performance trade-offs

### Costs
- Adapter layer may hide provider-specific capabilities
- Differences across models still require careful prompt/contract design

### Failure modes
- Abstraction leaks under non-standard features (tools, vision, structured outputs)
- Behaviour differences across models create false confidence if untested

## Reuse notes
Start with the smallest stable interface:
- text completion + structured output
- logging and retries at the boundary
- optional provider-specific extensions behind feature flags

## Confidence
High — repeatedly surfaced when integrating multiple providers and debugging cross-provider issues.