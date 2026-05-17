---
patternId: "typed-execution-context"
title: "Typed Execution Context"
summary: "Replaces implicit dictionary-based state passing with a structured, versioned, and strongly typed object to ensure contract safety across pipeline steps."
date: 2026-04-17
tags: ["patterns", "state-management", "type-safety"]
status: "stable"
confidence: "high"
domain: ["Agentic AI", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
relatedLearnings: ["20260309"]
sources: ["runner-agentic-intelligence"]
knowledgeType: pattern
knowledgeId: typed-execution-context
diagram: "/architecture/patterns/typed-execution-context.svg"

source:
  learning: wl-2026-03-09

signals:
  - execution-ownership
  - implicit-contracts

applies_to:
  - pipeline
  - orchestrator
  - execution-flow

automation_ready: true
---

## Intent

What problem does this pattern solve?

It eliminates "string-keyed dictionary" or "dynamic attribute" anti-patterns where pipeline steps depend on invisible or inconsistently defined state. It ensures that inputs, intermediate results, and outputs are discoverable and type-safe across a multi-agent orchestration flow.

---

## Context

When and where does this pattern appear?

This pattern emerged in the Runner Agentic Intelligence system to manage the high-pressure transition of raw athletic data (FIT/GPX) through multiple processing layers: feature engineering, positioning, intelligence generation, and visualization. It appears in systems where state is progressively enriched by specialized agents or computational engines.

---

## Agentic profile

Describe the agentic architecture shape explicitly.

- **System shape:** multi-agent
- **Orchestration mode:** sequential

### Agent-to-agent interaction

- **Present:** true
- **Mechanism:** shared-state
- **Evidence:** PipelineContext

### Tool protocols

- **MCP:** absent
- **Tool calling:** present
- **Evidence:** Insights Generation (LLM with schema)

### Optimisation target

- **Primary:** reliability
- **Secondary:** safety, developer-velocity
- **Notes:** Ensures that data contracts between agents are explicitly defined in code rather than documentation.

### Simplicity vs autonomy

- **Position:** simplicity
- **Rationale:** The pattern favors a controlled, predictable state flow over autonomous agent memory, making the system easier to debug and audit.

---

## Forces

List the tensions or constraints:

- **Type Safety vs Development Speed:** Explicit types require more initial setup but reduce runtime "KeyError" or "AttributeError" failures.
- **Centralization vs Decoupling:** A central context creates a structural dependency but provides a single source of truth for the entire execution lifecycle.
- **Memory vs Persistence:** The context must distinguish between transient session state and data that must be persisted to the database.

---

## Solution

Describe the structural move.

A boundary is introduced between the Orchestrator/Pipeline and the individual Steps. A formal `PipelineContext` dataclass is defined as the sole carrier of state. Each `PipelineStep` is defined by a contract that accepts this context, reads only what it needs, and writes results back to specific, pre-defined fields. This separates the logic of "how to compute" from "how to store/pass" data.

---

## Implementation signals

Observable signs this pattern exists:

- A dedicated `context.py` containing a large dataclass or Pydantic model with fields for every pipeline stage.
- A base `PipelineStep` class with an `execute(context)` method.
- Steps explicitly casting or extracting data from the context into domain objects before passing them to agents.

---

## Evidence

Reference specific artefacts:

- The central typed state holder.
- The interface enforcing context-based execution.
- Example of a step extracting data from context and populating results.

---

## Consequences

### Benefits

- **Contract Integrity:** IDEs and linters can catch missing data dependencies before execution.
- **Observability:** The entire state of a run can be captured by serializing a single object.

### Costs

- **Boilerplate:** New data points require updates to the central `PipelineContext` definition.
- **Coupling:** Steps are coupled to the context structure even if they only use a fraction of it.

### Failure modes

- **Context Bloat:** Adding too many transient or unrelated fields makes the object difficult to manage.
- **Parallel Mutation:** Without careful design, parallel steps could overwrite the same fields (mitigated here by field-level ownership).

---

## Reuse notes

How can this pattern be reused safely?

- **Where it fits:** Complex multi-stage pipelines where data is transformed or enriched.
- **Where it does NOT fit:** Simple, single-turn agent interactions or systems with very small, stable state requirements.
- **Preconditions:** Requires a clear definition of the execution lifecycle and identified boundaries between processing steps.

---

## Confidence

- High → The pattern is consistently applied across the entire core processing logic of the repository, from ingestion to intelligence delivery, and is backed by a dedicated core infrastructure.