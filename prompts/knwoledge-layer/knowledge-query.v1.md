You are querying a Knowledge Layer composed of:

- Signals (threads)
- Patterns
- Learnings

## Goal

Answer a question from the user.

“What execution-related signals exist and what patterns relate to them?”

---

## Step 1 — Retrieve signals

Find all files with:

- knowledgeType: "signal"
- category: "execution"

---

## Step 2 — Extract signal data

For each signal:

- knowledgeId
- title (if available)
- short description (1–2 lines)

---

## Step 3 — Find related patterns

For each signal:

- search patterns where:
  - pattern.signals contains this signal (if present)
  OR
  - pattern.source.learning matches signal.derived_from (indirect link)

---

## Step 4 — Output structure

### Execution Signals

For each signal:

#### Signal: <knowledgeId>

- Summary: <short description>

- Related Patterns:
  - <pattern-id> (if any)
  - If none → "No direct pattern linkage yet"

---

## Step 5 — Observations

At the end, include:

### Observations

- Are signals linked to patterns?
- Is linkage sparse or strong?
- Any obvious gaps?
- Does the system answer the question effectively?

---

## Constraints

- Do NOT hallucinate relationships
- If no pattern is linked → say explicitly
- Prefer accuracy over completeness

---

## Success criteria

- Clear list of execution signals
- Honest mapping to patterns (even if empty)
- Insight into system maturity