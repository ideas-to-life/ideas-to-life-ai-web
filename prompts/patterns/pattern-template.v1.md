---
patternId: "<kebab-case-id>"
title: "<Pattern Name>"
summary: "<1 sentence describing the problem solved and the structural move>"
date: YYYY-MM-DD
tags: ["patterns", "<tag>", "<tag>"]
status: "exploring" # exploring | validating | stable | retired
confidence: "medium" # low | medium | high
domain: ["Agentic AI", "Architecture"]
relatedExperiments: ["<experiment-slug>"] # optional
relatedLearnings: ["<learning-slug>"]     # optional
sources: ["<repo or evidence source>"]    # required
---

## Intent

What problem does this pattern solve?

Keep it 1–3 sentences.
Be precise.
Avoid abstract language.

---

## Context

When and where does this pattern appear?

Describe:
- The system type
- The architectural pressure
- Why this pattern emerged

Avoid storytelling.
Ground in execution.

---

## Agentic profile

Describe the agentic architecture shape explicitly.
Use `unknown` if not evidenced.
Do not guess.

- **System shape:** single-agent | multi-agent | hybrid | unknown
- **Orchestration mode:** sequential | parallel | swarm | event-driven | hybrid | unknown

### Agent-to-agent interaction

- **Present:** true | false | unknown
- **Mechanism:** messages | shared-state | blackboard | planner-worker | other | unknown
- **Evidence:** `<path#symbol>` (required if present = true)

### Tool protocols

- **MCP:** present | absent | unknown
- **Tool calling:** present | absent | unknown
- **Evidence:** `<path#symbol>` (required if present)

### Optimisation target

- **Primary:** cost | quality | latency | reliability | safety | developer-velocity | unknown
- **Secondary:** <optional list>
- **Notes:** <1–2 lines max>

### Simplicity vs autonomy

- **Position:** simplicity | balanced | autonomy | unknown
- **Rationale:** <grounded explanation based on forces/solution>

---

## Forces

List the tensions or constraints:

- <constraint>
- <trade-off>
- <pressure>

Do not fabricate trade-offs.
Use only those observed.

---

## Solution

Describe the structural move.

- What boundary is introduced?
- What contract is defined?
- What is separated from what?
- What becomes explicit?

Be concrete.
Avoid general best-practice phrasing.

---

## Implementation signals

Observable signs this pattern exists:

- <signal visible in code or structure>
- <signal in workflow or documentation>
- <signal in testing or contracts>

Signals must be externally observable.

---

## Evidence

Reference specific artefacts:

- `<path#symbol>` — short explanation
- `<file:line>` — short explanation
- `<PR or commit>` — if relevant

Evidence must be real.
If evidence is weak, reduce scope.

---

## Consequences

### Benefits

- <benefit observed>
- <benefit observed>

### Costs

- <cost observed>
- <cost observed>

### Failure modes

- <how it can break>
- <risk if misapplied>

Do not speculate beyond what execution supports.

---

## Reuse notes

How can this pattern be reused safely?

- Where it fits
- Where it does NOT fit
- Minimal version
- Preconditions

Focus on clarity and guardrails.

---

## Confidence

High | Medium | Low

Justify briefly:

- High → repeated across contexts with stable trade-offs
- Medium → observed clearly but limited validation
- Low → emerging pattern, limited evidence