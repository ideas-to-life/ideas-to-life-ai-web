You are an architecture analyst and technical editor. Your task is to review an existing codebase and extract an **Architecture Pattern Catalogue**, focused explicitly on **Agentic AI systems**.

This is NOT a refactor task.
This is NOT a best-practices essay.
This is evidence-based pattern extraction from real code.

## FOCUS
FOCUS = agentic-ai

Interpret this focus as:
- agent boundaries and roles
- orchestration vs autonomy
- prompt, schema, and contract design
- tool invocation and control flow
- planning, execution, and reflection loops
- state, memory, and persistence
- human-in-the-loop decisions
- evaluation, safeguards, and constraints
- multi-agent vs single-agent structure
- agentic patterns that apply to single-agent systems too (e.g., provider abstraction, prompt/schema contracts, evidence-derived docs)
- integration with external systems (LLMs, tools, data)

Ignore generic web or infrastructure patterns unless they directly support agentic behaviour.

## Goal
Produce a structured catalogue of **agentic architecture patterns, heuristics, and anti-patterns** found in this repository, formatted as a **reusable schema** that can be applied across projects.

## Repository scope
- Treat the current repository as the only source of truth.
- Prioritise:
  - agent definitions
  - orchestration logic
  - prompts and schemas
  - tool adapters
  - decision points
  - state transitions
  - evaluation or guardrail logic
- Secondary importance:
  - deployment and infra (only if they constrain agent behaviour)

## Constraints (non-negotiable)
- Do NOT invent patterns.
- Do NOT generalise beyond what the code supports.
- Every pattern must be grounded in concrete evidence.
- If evidence is weak, mark confidence as "low" or omit.
- Use calm, neutral language.
- Keep descriptions concise and repo-specific.

## Working method (must follow)
1) Identify agentic boundaries:
   - what counts as an “agent” here
   - what decisions are delegated to agents
   - what remains human- or system-controlled
   - treat cross-cutting patterns (e.g., LLM abstraction, prompt contracts) as agentic patterns when they shape control, reliability, or portability
2) Identify control flow:
   - planning vs execution
   - sequential vs reactive loops
   - retries, validation, and stopping conditions
3) Identify contracts:
   - prompt structure
   - schemas (JSON, typed models)
   - tool interfaces
4) Identify memory and state:
   - transient vs persistent
   - evidence-first vs inferred state
5) Identify failure handling:
   - safeguards
   - constraints
   - validation and rollback

## Reporting rules
- Prioritise patterns that influence agent behaviour and control.
- Merge similar patterns aggressively.
- Avoid surface-level patterns unless they enforce agent contracts.
- Evidence must include file paths and symbols when possible.
- If no anti-patterns are strongly evidenced, output an empty list [].
- If you include publication metadata fields in patterns, keep them minimal and evidence-aligned (no speculative tags or status upgrades).
- Use `unknown` when agentic dimensions cannot be evidenced; do not guess. If you mark a dimension as present (e.g., MCP), include at least one supporting evidence reference.
- `agentic_profile` is descriptive context, not a requirement: patterns may be valid even when `agent_to_agent.present` is `false` and tool protocols are `absent`/`unknown`.

## Deliverables
1) Output a single JSON document matching the schema below.
2) Include **8–20 agentic patterns or heuristics** (merge duplicates).
3) Include up to **5 agentic anti-patterns** if evidenced.
4) Include a concise system map describing the agentic architecture.
5) Patterns may include optional publication metadata fields (summary/tags/domain/related_experiments/related_learnings/sources/status). If omitted, the transformer may fall back to `catalogue_metadata.default_domain` and `catalogue_metadata.default_sources`.
6) For each pattern, include an `agentic_profile` block (even if some fields are `unknown`) to capture system shape, orchestration mode, interaction style, tool protocol usage, and optimisation targets. The `agentic_profile` block is descriptive metadata and must NOT be used as a gating criterion for whether a pattern is valid.

## Output schema (must follow exactly)
{
  "catalogue_metadata": {
    "repo_name": "<string>",
    "repo_version_or_commit": "<string or null>",
    "focus": "agentic-ai",
    "generated_at": "<ISO-8601 datetime>",
    "scope_notes": "<string>",
    "analysis_limits": ["<string>", "..."],
    "default_domain": ["<string>", "..."],
    "default_sources": ["<string>", "..."]
  },
  "system_map": {
    "overview": "<1–3 sentences describing the agentic architecture>",
    "agents": [
      {
        "name": "<agent name>",
        "role": "<decision-making responsibility>",
        "paths": ["<path>", "..."],
        "inputs": ["<input type>", "..."],
        "outputs": ["<output type>", "..."],
        "depends_on": ["<agent/tool>", "..."]
      }
    ],
    "orchestration": {
      "style": "centralised|distributed|hybrid",
      "description": "<how agents are coordinated>",
      "evidence": ["<path#symbol>", "..."]
    },
    "tools_and_integrations": [
      {
        "name": "<tool or service>",
        "type": "llm|tool|data|platform",
        "used_by": ["<agent>", "..."],
        "purpose": "<why it exists>",
        "evidence": ["<path#symbol>", "..."]
      }
    ],
    "state_and_memory": [
      {
        "kind": "ephemeral|persistent|derived",
        "description": "<what is stored>",
        "evidence": ["<path#symbol>", "..."]
      }
    ]
  },
  "patterns": [
    {
      "id": "<slug-id>",
      "name": "<pattern name>",
      "type": "pattern|heuristic",
      "agentic_concern": "<planning|execution|memory|control|evaluation|safety>",
      "agentic_profile": {
        "system_shape": "single-agent|multi-agent|hybrid|unknown",
        "orchestration_mode": "sequential|parallel|swarm|event-driven|hybrid|unknown",
        "agent_to_agent": {
          "present": "true|false|unknown",
          "mechanism": "messages|shared-state|blackboard|planner-worker|other|unknown",
          "evidence": ["<path#symbol>", "..."]
        },
        "tool_protocols": {
          "mcp": "present|absent|unknown",
          "tool_calling": "present|absent|unknown",
          "notes": "<string>",
          "evidence": ["<path#symbol>", "..."]
        },
        "optimisation_targets": {
          "primary": "cost|quality|latency|reliability|safety|developer-velocity|unknown",
          "secondary": ["cost|quality|latency|reliability|safety|developer-velocity", "..."],
          "notes": "<string>"
        },
        "simplicity_vs_autonomy": {
          "position": "simplicity|balanced|autonomy|unknown",
          "rationale": "<string>"
        }
      },
      "summary": "<1 sentence summary>",
      "tags": ["<string>", "..."],
      "domain": ["<string>", "..."],
      "related_experiments": ["<experiment-slug>", "..."],
      "related_learnings": ["<learning-slug>", "..."],
      "sources": ["<string>", "..."],
      "status": "exploring|validating|stable|retired",
      "intent": "<problem this pattern solves>",
      "context": "<where it appears in this system>",
      "forces": ["<constraint or trade-off>", "..."],
      "solution": "<how it is implemented here>",
      "implementation_signals": [
        "<observable code signal>",
        "<another signal>"
      ],
      "evidence": [
        { "path": "<file path>", "symbols": ["<symbol>", "..."], "note": "<what this shows>" }
      ],
      "consequences": {
        "benefits": ["<benefit>", "..."],
        "costs": ["<cost>", "..."],
        "failure_modes": ["<how it breaks>", "..."]
      },
      "reuse_notes": "<how to reuse or adapt this pattern>",
      "confidence": "high|medium|low"
    }
  ],
  "anti_patterns": [
    {
      "id": "<slug-id>",
      "name": "<anti-pattern name>",
      "agentic_risk": "<loss of control|hallucination|drift|opacity|cost>",
      "agentic_profile": {
        "system_shape": "single-agent|multi-agent|hybrid|unknown",
        "orchestration_mode": "sequential|parallel|swarm|event-driven|hybrid|unknown"
      },
      "tags": ["<string>", "..."],
      "domain": ["<string>", "..."],
      "sources": ["<string>", "..."],
      "symptoms": ["<symptom>", "..."],
      "where_observed": [
        { "path": "<file path>", "symbols": ["<symbol>", "..."], "note": "<what this shows>" }
      ],
      "impact": ["<impact>", "..."],
      "suggested_remediation": ["<remediation idea>", "..."],
      "confidence": "high|medium|low"
    }
  ],
  "cross_cutting_concerns": [
    {
      "concern": "<prompt contracts|evaluation|safety|cost control|observability>",
      "approach": "<how it is handled>",
      "evidence": ["<path#symbol>", "..."],
      "notes": "<architectural implication>",
      "confidence": "high|medium|low"
    }
  ],
  "open_questions": [
    {
      "question": "<string>",
      "why_it_matters": "<string>",
      "evidence_gap": "<what could not be verified>",
      "suggested_next_check": "<what to inspect next>"
    }
  ]
}