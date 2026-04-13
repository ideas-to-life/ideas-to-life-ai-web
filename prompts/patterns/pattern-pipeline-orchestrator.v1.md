# Feature: Architecture Pattern Pipeline Orchestrator

You are executing the full **Architecture Pattern Production Pipeline**.

This pipeline transforms extracted pattern JSON into:

1. Pattern Markdown
2. Pattern SVG diagram
3. Website-ready deployment
4. Architecture section sync

---

# Execution modes

This pipeline must support:

- manual execution (developer-triggered)
- automated execution (CI/CD)

Behaviour must be identical in both modes.

---

# Inputs

- Pattern JSON (catalogue schema)
- Optional: specific patternId(s)

---

# Core principle

Treat this pipeline as:

→ deterministic  
→ idempotent  
→ non-destructive  

Running multiple times must produce the same result.

---

# Step 0 — Pre-checks (REQUIRED)

- Validate JSON structure
- Ensure required fields exist
- If invalid → stop execution

---

# Step 1 — Pattern selection

If patternId provided:

→ process only those patterns

Else:

→ process all patterns in JSON

---

# Step 2 — Generate Pattern Markdown

For each pattern:

Use:
raw-to-pattern.v1

Output:

src/content/patterns/<patternId>.md

---

## Rules

- Do NOT overwrite unchanged files
- Update only if content differs
- Preserve formatting consistency

---

# Step 3 — Generate SVG Diagram

For each pattern:

Use:
pattern-diagram-generator.v1

Output:

public/architecture/patterns/<patternId>.svg

---

## Rules

- Ensure diagram reflects current pattern
- Regenerate only if pattern changed
- Keep layout minimal and consistent

---

# Step 4 — Link Diagram in Markdown

Ensure pattern markdown includes:

diagram: "/architecture/patterns/<patternId>.svg"

---

# Step 5 — Deploy Diagram

Use:
deploy-diagram-antigravity.v1

Ensure:

- SVG file exists
- Path is correct
- Accessible by Astro

---

# Step 6 — Architecture Section Sync (NEW)

Run:

prompts/architecture/architecture-sync-ideas-to-life.v1.md

Purpose:

- ensure diagrams are discoverable
- update architecture pages if needed
- maintain linkage consistency

---

# Step 7 — Validation (REQUIRED)

Validate:

- Markdown files exist and render
- SVG diagrams render correctly
- Diagram paths resolve
- Astro build passes (if applicable)

If validation fails:

→ stop execution  
→ report failure  

---

# Step 8 — Output

Return:

- patterns processed
- files created/updated
- diagrams generated
- architecture sync status
- success / failure

---

# Constraints

- Do NOT modify existing prompts
- Do NOT introduce new formats
- Do NOT change unrelated files
- Prefer omission over incorrect output
- Keep published pattern pages reader-friendly; do not surface raw repository paths as the main visible Evidence or Sources copy unless explicitly required

---

# Editorial rules for published pattern pages

- Evidence shown to readers should be short descriptive statements grounded in repository evidence
- Sources & References shown to readers should use one-line human-readable labels rather than raw file paths
- Raw repository paths may still be used during generation and validation, but they should not dominate published page copy

---

# Determinism rules (CRITICAL)

- Stable ordering of patterns
- Consistent naming
- No randomness
- No speculative content

---

# Idempotency rules

- No duplicate files
- No redundant updates
- Safe to run repeatedly

---

# Success criteria

After execution:

- patterns are published as Markdown
- diagrams are generated and linked
- architecture section reflects new patterns
- no manual steps required

---

# Failure handling

If any step fails:

- stop pipeline
- report exact step
- do not partially apply inconsistent state
