# Feature: Architecture Knowledge Section (Sync Mode)

You are modifying the **ideas-to-life-web** Astro project.

Your goal is to ensure the **Architecture section is always up-to-date and self-maintaining**, based on the current repository state.

This prompt is designed to be run:

- repeatedly (weekly or CI/CD)
- safely (idempotent)
- incrementally (only apply necessary changes)

---

# Core Principle

Treat the Architecture section as a **derived view of the repository**, not a manually maintained feature.

---

# Responsibilities

Ensure the Architecture section:

- discovers diagrams automatically
- renders them consistently
- links them to experiments, patterns, and learnings
- remains stable across repeated executions

---

# Architecture folder structure

Ensure this structure exists (create if missing, do not overwrite content):

architecture/
    platform/
    experiments/

Do NOT delete or rename existing files.

---

# Supported diagram types

Support both:

- *.drawio.svg  (editable diagrams)
- *.svg         (generated diagrams, e.g. patterns)

Render both identically.

---

# Pages to manage

Ensure these pages exist and are correct:

- src/pages/architecture/index.astro
- src/pages/architecture/platform.astro
- src/pages/architecture/experiments/[slug].astro

If already present:

- update only if required
- do not rewrite unnecessarily

---

# Architecture index page

Must:

- list Platform Architecture
- list Experiment Architectures

Auto-discover:

architecture/experiments/

For each folder:

→ create link:
  /architecture/experiments/<slug>

---

# Platform architecture page

Scan:

architecture/platform/

Render all diagrams:

- *.drawio.svg
- *.svg

---

## Ordering rules

Sort diagrams by:

1. system-context
2. container / architecture
3. runtime / flow
4. alphabetical fallback

---

## Title generation

Convert filename:

- replace "-" with space
- capitalize words

---

# Experiment architecture page

Dynamic route:

/architecture/experiments/[slug]

Load from:

architecture/experiments/<slug>/

---

## Rendering rules

- render all *.drawio.svg and *.svg
- if folder "sequence/" exists:

→ render under:
  "Runtime Flows"

---

# Linking strategy (IMPORTANT)

## Experiments

If exists:

/experiments/<slug>

→ show:
"View experiment"

---

## Patterns

If pattern exists:

/patterns/<pattern-slug>

→ show:
"Related patterns"

Matching priority:

1. exact slug match
2. exact name match
3. partial keyword match

Do NOT fail if no match.

---

## Learnings

If exists:

/learnings/<slug>

→ show:
"Related learnings"

Use same matching strategy.

---

# Pattern diagram integration

Patterns generate diagrams under:

/patterns/*.svg

If a pattern includes:

diagram: "/patterns/<patternId>.svg"

Ensure:

- diagram renders correctly on pattern page (no duplication needed)
- architecture pages remain compatible

---

# Conceptual model (IMPORTANT)

Treat architecture as a connected system:

- Experiments → produce patterns
- Patterns → describe architecture decisions
- Learnings → explain why

Pages should reflect relationships, not just files.

---

# Navigation

Ensure navigation includes:

Architecture

Order:

Home  
Experiments  
Learnings  
Architecture  
About

---

# Styling

Follow existing styling:

- experiments pages
- learnings pages

Use:

- h1: page title
- h2: section
- h3: diagram title

Ensure diagrams are responsive.

---

# Fallback behaviour

If folder exists but no diagrams:

Display:

"Architecture diagrams coming soon."

Do NOT break rendering.

---

# Idempotency rules (CRITICAL)

- Do NOT duplicate components
- Do NOT recreate existing pages unless required
- Do NOT change unrelated files
- Preserve formatting where possible

---

# Change detection (IMPORTANT)

Before modifying:

- check if page already satisfies requirements
- only update missing or incorrect parts

---

# CI/CD compatibility

This prompt must:

- run without manual input
- succeed even if no new diagrams exist
- not introduce breaking changes
- produce consistent output across runs

---

# Success criteria

After execution:

- /architecture is accessible
- diagrams auto-discovered and rendered
- new diagrams appear automatically
- links to experiments, patterns, learnings work
- no manual configuration required

---

# Future extensibility (do not implement now)

Allow optional:

architecture/metadata.json

For:

- ordering
- descriptions
- explicit linking

---

# Output

Return:

- files created/updated
- summary of changes
- confirmation of successful sync