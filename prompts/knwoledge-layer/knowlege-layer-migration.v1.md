You are updating markdown content files to introduce a **Knowledge Layer schema (v1)**.

## Goal

Add new metadata fields to existing frontmatter WITHOUT breaking current functionality.

This is a **non-destructive, additive migration**.

---

## Scope

Apply changes to ALL markdown files under:

- src/content/patterns/
- src/content/learnings/
- src/content/learnings/threads/

---

## CRITICAL RULES

- DO NOT remove or rename existing fields
- DO NOT change the existing `type` field
- ONLY add new fields if they are missing
- DO NOT duplicate fields if they already exist
- Preserve formatting and ordering where possible
- Output must remain valid frontmatter YAML

---

## New schema fields

### 1. Patterns

If file is a pattern (heuristics: folder = patterns OR contains "## Intent"):

Add:

knowledgeId: "<slug-or-filename>"
knowledgeType: "pattern"

source:
  learning: ""

signals: []

applies_to: []

automation_ready: false

---

### 2. Learnings

If file is a learning (folder = learnings):

Add:

knowledgeId: "<wl-date-based-if-available>"
knowledgeType: "learning"

produces:
  patterns: []
  signals: []

context:
  system: ""
  scope: ""

confidence: "medium"

---

### 3. Signals

If file is a signal or thread representing a signal:

Add:

knowledgeId: "<slug-or-filename>"
knowledgeType: "signal"
signalType: "curated-thread"

category: ""

strength: "emerging"

derived_from: []

---

## KnowledgeID generation rules

- Prefer existing slug if available
- Else derive from filename:
  - lowercase
  - replace spaces with "-"
  - remove special characters

Examples:
- "Architecture Workflow Loop" → "architecture-workflow-loop"
- "2026-04-13.md" → "wl-2026-04-13"

---

## Detection heuristics

Use best effort:

- patterns → src/content/patterns/
- learnings → src/content/learnings/
- threads → treat as signals if analytical in nature

---

## Field population rules

- If value is unknown → leave empty or default
- Do NOT hallucinate links or relationships
- Do NOT infer signals or patterns unless explicitly present

---

## Category Suggestion (Signals Only)

For files with:

knowledgeType: "signal"

You may suggest a `category` based on the content.

### Rules

- Category is OPTIONAL
- Only add if high confidence
- If unsure → leave empty
- Do NOT invent meaning beyond the text
- Prefer simplicity over specificity

---

### Allowed categories (v1)

Use ONLY from this list:

- boundaries
- state
- execution
- governance
- workflow
- human-ai

---

### Heuristics

- If signal relates to layer separation, contracts → boundaries
- If signal relates to persistence, snapshots, data → state
- If signal relates to orchestration, triggering, flow → execution
- If signal relates to validation, control, audit → governance
- If signal relates to process, iteration, learning loops → workflow
- If signal relates to human-AI interaction → human-ai

---

### Examples

"Implicit contracts between layers" → boundaries  
"Orchestration owns execution flow" → execution  
"Snapshot is single source of truth" → state  

---

### Fallback

If no clear mapping:

DO NOT add category


## Idempotency

Before adding any field:

- check if it already exists
- if yes → do nothing

---

## Output

- Update files in place
- Return summary:
  - files updated
  - fields added
  - any skipped files

---

## Success criteria

- All files include `knowledgeType`
- No existing functionality is broken
- Astro build still works
- Files remain readable for humans

---

## Important mindset

This is NOT a refactor.

This is the introduction of a **parallel knowledge schema layer** that will later be used by:

- pattern generation
- agent skills
- knowledge querying