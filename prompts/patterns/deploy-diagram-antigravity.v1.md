Add a new Pattern diagram.

Inputs:
- patternId: <patternId>
- SVG content: <paste SVG xml>
- diagram path: /patterns/<patternId>.svg

Tasks:
1) Create file:
   public/patterns/<patternId>.svg
   Paste the SVG content exactly.
2) Update pattern markdown:
   src/content/patterns/<patternId>.md
   Add (or update) frontmatter:
   diagram: "/patterns/<patternId>.svg"
3) Verify:
   - pattern detail page renders the diagram above the content
   - astro build passes