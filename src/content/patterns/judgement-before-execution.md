---
patternId: "judgement-before-execution"
title: "Judgement Before Execution"
summary: "Separates strategic judgement from task execution by introducing an explicit contract between reasoning and implementation."
date: 2026-07-17
tags: ["patterns", "agentic-ai", "workflow-design", "architecture", "separation-of-concerns"]
status: "validating"
confidence: "medium"
domain: ["Agentic AI", "Architecture"]
relatedExperiments: ["idea-to-editorial-reasoning-system"]
relatedLearnings: ["20260715"]
sources: ["idea-to-editorial-reasoning-system"]
diagram: "/architecture/patterns/judgement-before-execution.svg"
---

## Intent

This pattern improves the consistency and inspectability of AI-assisted workflows by separating strategic judgement from execution.

Rather than asking a single model to both decide *what* should be done and *how* it should be done, judgement is performed first and captured as an explicit contract that subsequent stages execute.

---

## Context

This pattern emerged while redesigning the Editorial Pipeline after observing that six months of Weekly Learnings consistently produced valuable reflection but inconsistent public communication.

The architectural pressure was not prompt quality but responsibility overload. Editorial selection and editorial articulation were being treated as one cognitive task despite requiring different reasoning.

---

## Agentic profile

- **System shape:** multi-agent
- **Orchestration mode:** sequential

### Agent-to-agent interaction

- **Present:** true
- **Mechanism:** shared-state
- **Evidence:** `Editorial Selection → Editorial Brief → Editorial Articulation`

### Tool protocols

- **MCP:** unknown
- **Tool calling:** absent
- **Evidence:** Workflow implemented through Claude Code and Google Antigravity prompt orchestration.

### Optimisation target

- **Primary:** quality
- **Secondary:** reliability, developer-velocity
- **Notes:** The pattern optimises reasoning quality and workflow consistency rather than execution latency.

### Simplicity vs autonomy

- **Position:** balanced

- **Rationale:** The workflow intentionally introduces additional orchestration in exchange for improved reasoning discipline, explicit contracts and more predictable outputs.

---

## Forces

- Strategic judgement and execution require different reasoning modes.
- Single-prompt workflows become difficult to inspect and refine.
- Prompt complexity increases as additional responsibilities accumulate.
- AI outputs become difficult to reproduce because reasoning remains implicit.

---

## Solution

Introduce an explicit architectural boundary between judgement and execution.

The judgement stage analyses available evidence, evaluates alternatives and produces a structured contract describing the intended outcome.

Execution consumes that contract without reinterpreting strategic intent.

The contract becomes the stable interface between reasoning and implementation.

---

## Implementation signals

Observable indicators include:

- A dedicated judgement stage preceding execution.
- A structured intermediate artefact (contract, brief or plan).
- Execution stages consume structured outputs rather than raw evidence.
- Judgement and execution evolve independently.

---

## Evidence

- Editorial Pipeline — Editorial Selection produces an Editorial Brief before Editorial Articulation begins.
- Weekly Learning publishing experiment — Multiple historical learnings replayed through the redesigned workflow.
- LinkedIn publication experiment — Improved consistency observed after introducing explicit editorial reasoning.

---

## Consequences

### Benefits

- Improves output consistency.
- Makes reasoning inspectable.
- Enables independent optimisation of judgement and execution.
- Simplifies prompt responsibilities.
- Creates reusable intermediate artefacts.

### Costs

- Additional orchestration steps.
- Increased end-to-end latency.
- More artefacts to maintain.
- Higher workflow complexity.

### Failure modes

- Poor contracts propagate poor decisions downstream.
- Excessive decomposition creates unnecessary orchestration overhead.
- Judgement boundaries become ambiguous if responsibilities are not clearly defined.

---

## Reuse notes

This pattern is appropriate when workflows combine strategic reasoning with execution.

Examples include:

- Editorial systems
- Architecture governance
- Planning agents
- Product discovery workflows

It is unlikely to add value for straightforward deterministic tasks where judgement is minimal.

A minimal implementation consists of:

Evidence
→
Judgement
→
Structured Contract
→
Execution

The contract should be explicit, stable and independently reviewable.

---

## Confidence

**Medium**

Observed repeatedly within the Editorial Pipeline and supported by multiple validation cycles across historical Weekly Learnings.

The underlying architectural principle is expected to generalise beyond editorial workflows, but additional implementations are needed before the pattern can be considered stable.
