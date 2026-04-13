You are generating a Pattern SVG diagram for the Ideas to Life `/patterns` catalogue.

Input:
- Pattern Markdown (frontmatter + sections)
- patternId: <patternId>

Goal:
Produce:
1) A single SVG file content to save as:
   public/patterns/<patternId>.svg
2) A single YAML frontmatter line to add to the pattern:
   diagram: "/patterns/<patternId>.svg"

Non-negotiables:
- Use the existing SVG style tokens from our templates:
  - public/patterns/_template.svg
  - public/patterns/_template-hub-spoke.svg
  - public/patterns/_template-boundary-adapters.svg
- Do not introduce new fonts, colors, icons, or gradients.
- Keep diagram minimal: 4–7 boxes max.
- One primary direction flow.
- Text must be short (1–2 lines per node).
- Represent architecture “shape”, not details.

Step 1: Choose layout
- If the pattern is about abstraction, adapters, boundaries, contracts, providers → use Boundary + adapters.
- If the pattern is about orchestration, coordinator, router, planner-worker, multiple agents → use Hub-and-spoke.
- Otherwise → use Linear template.

Step 2: Extract nodes
From the pattern sections:
- Intent + Context → identify the system components
- Solution → identify the boundary/contract/move
- Implementation signals → pick the observable components
Pick 3–6 nodes that best express the structural move.

Step 3: Output
Return exactly:

A) SVG FILE:
<full svg xml>

B) FRONTMATTER LINE:
diagram: "/patterns/<patternId>.svg"

No commentary.
No extra text.