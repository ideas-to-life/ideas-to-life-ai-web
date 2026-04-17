---
patternId: "pipeline-intelligence-snapshot"
title: "Pipeline Intelligence Snapshot"
summary: "Produce a canonical intelligence artifact at the end of a pipeline to consolidate distributed agent outputs into a single system state."
date: 2026-03-15
tags: ["patterns", "agentic-ai", "pipeline", "state-artifact"]
status: "exploring"
confidence: "medium"
domain: ["Agentic AI", "Architecture"]
relatedExperiments: ["runner-agentic-intelligence"]
relatedLearnings: ["20260309"]
sources: ["runner-agentic-intelligence"]
diagram: "/architecture/patterns/pipeline-intelligence-snapshot.svg"
knowledgeId: "pipeline-intelligence-snapshot"
knowledgeType: "pattern"
source:
  learning: ""
signals: []
applies_to: []
automation_ready: false
---

## Intent

Provide a single canonical artifact representing the system’s computed intelligence state after a multi-step agentic pipeline executes.

The pattern consolidates distributed signals produced by agents and services into one object that downstream surfaces (UI, integrations, analytics) can consume consistently.

## Context

This pattern appears in agentic pipelines where multiple agents compute different aspects of a system state.

Typical architecture pressures include:
	•	multiple agents generating partial outputs
	•	UI or integrations consuming many independent signals
	•	need for a coherent “system intelligence state”

In the runner intelligence system, signals such as:
	•	weekly training snapshot
	•	trend analysis
	•	runner positioning
	•	goal trajectory
	•	next run recommendation
	•	coaching insight

are computed across different pipeline steps and agents.

Without consolidation, the final system state remains distributed across multiple context fields.

The pattern emerges to produce a canonical intelligence artifact.

## Agentic profile
	•	System shape: hybrid
	•	Orchestration mode: hybrid

## Agent-to-agent interaction
	•	Present: false
	•	Mechanism: shared-state
	•	Evidence: src/core/pipeline/context.py

Agents operate sequentially and in parallel via a shared PipelineContext.

## Tool protocols
	•	MCP: absent
	•	Tool calling: present
	•	Evidence: src/agents/insights/agent.py

Agents invoke LLM tools but do not communicate directly with each other.

## Optimisation target
	•	Primary: reliability
	•	Secondary: developer-velocity, integration-readiness
	•	Notes: The snapshot stabilizes the system state and simplifies downstream consumption.

## Simplicity vs autonomy
	•	Position: balanced
	•	Rationale:
Agents retain autonomy in producing signals, but the system introduces a simple aggregation artifact to maintain coherence.

## Forces
	•	Multiple agents produce partial intelligence outputs.
	•	UI and integrations require a coherent system state.
	•	Context objects accumulate loosely structured fields.
	•	Observability needs a stable representation of runner state.
	•	Future integrations (Strava, WhatsApp) need a stable interface.

These pressures push toward introducing a canonical artifact layer.

## Solution

Introduce a post-pipeline intelligence artifact that aggregates signals produced by agents and services.

Key characteristics:
	1.	The artifact is generated after pipeline execution.
	2.	It aggregates already-computed values, introducing no new logic.
	3.	It becomes the canonical representation of system intelligence.

Example structure:

RunnerIntelligenceSnapshot

Containing signals such as:
	•	training state
	•	health signal
	•	runner positioning
	•	goal trajectory
	•	coaching insight
	•	next run recommendation
	•	weekly metrics

The artifact is stored in:

context.intelligence_snapshot

and can be consumed by:

UI
external integrations
analytics systems
notifications

## Implementation signals

Observable signals of this pattern include:
	•	A dedicated snapshot model representing aggregated intelligence.
	•	Snapshot creation after pipeline execution.
	•	Pipeline context exposing a canonical intelligence object.
	•	Observability events emitted when the snapshot is produced.
	•	UI or integrations referencing the snapshot instead of individual signals.

## Evidence

Examples from the runner intelligence system:
	•	src/core/intelligence/runner_intelligence_snapshot.py — canonical intelligence model
	•	src/core/intelligence/snapshot_builder.py — aggregation logic
	•	src/core/pipeline/context.py — snapshot stored in pipeline context
	•	src/agents/orchestrator.py — snapshot generated after pipeline execution

Observability:
	•	event runner_intelligence_snapshot_generated

## Consequences

Benefits
	•	Establishes a single system intelligence artifact.
	•	Simplifies UI and integration consumption.
	•	Improves observability of system state.
	•	Reduces signal drift across agents.

## Costs
	•	Introduces an additional aggregation layer.
	•	Requires discipline to prevent business logic creeping into the snapshot builder.

Failure modes
	•	Snapshot becomes a second source of truth if logic is duplicated.
	•	Agents begin depending on the snapshot instead of context inputs.
	•	Aggregation layer grows into a business logic layer.

## Reuse notes

Where it fits
	•	Agentic pipelines with multiple intelligence-producing agents.
	•	Systems producing a coherent user-facing state from many signals.
	•	Architectures needing stable integration interfaces.

## Where it does NOT fit
	•	Simple single-agent systems.
	•	Systems where state is already produced by a single service.

## Minimal version

A minimal implementation can be:

context.system_snapshot = Snapshot(...)

produced once at the end of orchestration.

## Preconditions
	•	Pipeline context already contains structured outputs.
	•	Signals are computed before aggregation.
	•	Snapshot introduces no new business logic.

## Confidence

Medium

The pattern is clearly evidenced in the runner intelligence architecture but has not yet been validated across multiple independent systems.
