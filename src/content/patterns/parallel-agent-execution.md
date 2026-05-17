---
patternId: "parallel-agent-execution"
title: "Parallel Agent Execution"
summary: "Concurrently executes independent agents or pipeline steps using async orchestration to reduce end-to-end latency without compromising state integrity."
date: 2026-04-17
tags: ["patterns", "concurrency", "performance"]
status: "stable"
confidence: "high"
domain: ["Agentic AI", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
relatedLearnings: ["20260309"]
sources: ["runner-agentic-intelligence"]
diagram: "/architecture/patterns/parallel-agent-execution.svg"

knowledgeType: pattern
knowledgeId: parallel-agent-execution

source:
  learning: wl-2026-03-09

signals:
  - execution-ownership

applies_to:
  - pipeline
  - orchestrator
  - execution-flow

automation_ready: true
---

## Intent

What problem does this pattern solve?

It solves the latency bottleneck inherent in sequential LLM-based systems. By running independent agents (e.g., Insights, Plans, and Visualizations) concurrently, it reduces the total execution time from the sum of all agent calls to the duration of the longest single call.

---

## Context

When and where does this pattern appear?

This pattern is triggered during the "Intelligence Generation" phase of the Runner pipeline. It emerged when the system reached a level of complexity where generating a full coaching report (Insights + Plan + Charts) sequentially was taking 10-20 seconds, impacting the responsiveness of the UI and integration hooks.

---

## Agentic profile

Describe the agentic architecture shape explicitly.

- **System shape:** multi-agent
- **Orchestration mode:** parallel (hybrid with sequential)

### Agent-to-agent interaction

- **Present:** true
- **Mechanism:** shared-state (writes to independent fields in context)
- **Evidence:** pipeline step

### Tool protocols

- **MCP:** absent
- **Tool calling:** present
- **Evidence:** intelligent steps and insights

### Optimisation target

- **Primary:** latency
- **Secondary:** quality
- **Notes:** Prioritizes fast delivery of intelligence by fanning out I/O bound LLM calls.

### Simplicity vs autonomy

- **Position:** balanced
- **Rationale:** Agents are kept simple and focused on single tasks, while the orchestrator manages the complexity of concurrency and synchronization.

---

## Forces

List the tensions or constraints:

- **Latency vs State Safety:** Running tasks in parallel increases speed but risks race conditions if agents write to the same memory/context fields.
- **Resource Constraints:** Parallel execution increases the burst rate of API calls to LLM providers, potentially hitting rate limits.
- **Error Handling:** A failure in one parallel branch must be handled without necessarily crashing the entire pipeline.

---

## Solution

Describe the structural move.

The orchestrator identifies "parallel blocks" in the execution plan. Independent agent tasks are extracted as awaitables and wrapped in an `asyncio.gather` (or equivalent) call. This introduces a "Fan-out/Fan-in" boundary where parallel agents are prohibited from depending on each other's results, ensuring they can be executed safely in any order.

---

## Implementation signals

Observable signs this pattern exists:

- Use of `asyncio.gather`, `asyncio.wait`, or `TaskGroups` in the orchestration layer.
- Methods like `run_parallel_agents` that return lists of tasks instead of executing them immediately.
- Clearly separated "Output" fields in the state object that are only written to by a single agent.

---

## Evidence

Reference specific artefacts:

- Pipeline synchronization point.
- Logic to identify and return independent agent tasks.
- An independent step executed concurrently with intelligence agents.

---

## Consequences

### Benefits

- **Reduced Latency:** Significant performance gains in multi-agent workflows.
- **Better Resource Utilization:** Makes better use of the asynchronous nature of I/O bound LLM calls.

### Costs

- **Complexity:** Harder to trace and debug interleaved logs from multiple agents.
- **State Integrity Risk:** Requires strict discipline in ensuring agents don't have write collisions.

### Failure modes

- **Race Conditions:** Occurs if two parallel agents try to modify the same context field or database record simultaneously.
- **Partial Failure:** If one agent fails, the orchestrator must decide whether to continue with partial data or fail the whole run.

---

## Reuse notes

How can this pattern be reused safely?

- **Where it fits:** High-latency, I/O bound tasks that are computationally independent.
- **Where it does NOT fit:** When Agent B requires the output of Agent A to function (Sequential Dependency).
- **Minimal version:** A simple `asyncio.gather` around two independent LLM calls.
- **Preconditions:** Requires a non-blocking (async) runtime and a state management system that supports concurrent writes to different fields.

---
## Confidence

- High → The pattern is explicitly architected into the core `RunnerPipeline` and `IntelligenceStep`, with clear evidence of task extraction and synchronization.