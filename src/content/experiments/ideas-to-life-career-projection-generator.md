---
title: Career Projection / Interview-Playbook Generator
summary: Exploring how structured career evidence can generate role-specific career projections and evidence-grounded interview playbooks.
description: An experiment in transforming reusable career and portfolio evidence into role-specific career projections and interview preparation artefacts using governed AI workflows.
status: "exploring"
domain: ["Career", "Generative AI"]
date: 2026-08-07
tags: ["career-projection", "interview-playbook", "skills", "sub-agents", "generative-ai"]
image: "/assets/career-projection-generator.png"
draft: false
---

> This experiment follows the Ideas to Life **Experiments Charter**.
> Experiments are learning artefacts, not products.
> They test reusable patterns, not one-off implementations.

# Career Projection / Interview-Playbook Generator

## Why This Exists

Preparing for a new role often requires repeatedly translating the same career history, experience, and portfolio evidence into a different context.

The challenge is not simply generating interview answers. It is determining how existing evidence maps to a target role, where the strongest alignment exists, where gaps or risks remain, and how that evidence can support credible interview conversations without inventing experience.

This experiment explores whether that preparation can become a reusable, governed workflow rather than a manual exercise repeated for every opportunity.

## What This Experiment Explores

What question(s) are you trying to answer?

- Can structured career and portfolio evidence be projected consistently against a specific role or opportunity?
- Can specialised Skills and sub-agents separate evidence extraction, role analysis, career projection, and interview preparation while maintaining traceability to source evidence?
- Can the resulting interview playbook remain grounded in demonstrated experience while still adapting its emphasis, questions, and narratives to different roles?

## What Was Built

- A reusable workflow that takes a target role or opportunity and projects it against an existing body of career and portfolio evidence.
- A Skills and sub-agent orchestration pattern that separates evidence retrieval, role interpretation, career projection, and interview-playbook generation.
- A structured interview-playbook artefact that turns the resulting projection into role-specific themes, evidence-backed narratives, likely discussion areas, questions, and preparation guidance.

## Key Trade-offs

What you deliberately chose *not* to do — and why.

- The workflow does not optimise for presenting the candidate as a perfect match. Evidence grounding takes precedence over persuasive but unsupported claims.
- The experiment does not attempt to create a general-purpose recruitment or career-management product. It focuses on validating the reusable pattern of turning governed career evidence into opportunity-specific preparation.

## Current Status

This experiment is currently in the **Exploring** phase.

Progress at this stage means testing the workflow across real role contexts, examining the quality and traceability of its projections and generated playbooks, and refining the Skills, sub-agent responsibilities, and artefact contracts before determining whether the pattern demonstrates repeatable value. Alignment with the Experiments Charter Definition of Done will require the experiment to be publicly published, listed on the Experiments index, supported by at least one accessible artefact, and linked to working evidence where applicable.

## Related Learnings
- [From career knowledge to reusable evidence](/learnings/20260807)

## Related Patterns
- [Judgement before Execution](/architecture/patterns/judgement-before-execution)

## Architecture
- <a href="/architecture/experiments/career-projection-generator">Career Projection Generator</a>