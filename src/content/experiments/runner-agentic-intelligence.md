---
title: "Runner Agentic Intelligence"
summary: "Agentic Intelligent ecosystem that empowers every runner with insights."
description: "Multi-agentic system that coaches runners by generating personalised training plans, insights, charts, and chat with your running data."
image: "/assets/runner.ai.v2.png"
date: 2026-01-03
status: "exploring"
domain: ["Autonomous Agents", "Task Execution"]
tags: ["agents", "automation", "validating"]
---

## Why This Exists
Recreational and experienced runners, like myself, lack an intelligent, automated system that:
- ingests messy activity files
- extracts meaningful features
- generates insights and training plans
- visualizes trends
- allows natural coaching conversations

All without requiring data science or coaching expertise.

## Features

**Agents**
1. Feature Extractor Agent (LLM with schema validation)
2. Insights Agent (analyses trends and features)
3. Plan Agent (produces weekly training plan)
5. Plot Agent (alternative chart generator using custom execute_plot_code tool)
6. Chat Agent (LLM coach for Q&A)

**Agent Orchestration**
• ParallelAgent: runs insights_agent and plan_agent simultaneously
• SequentialAgent: feature extraction → parallel insights/plan → visualisation → plotting

**Tools**
• Custom execute_plot_code tool
• Pydantic schemas for model outputs

**Data Pipeline**
• TCX, GPX, FIT files ingestion
• Multi-agent reasoning
• Visualisation generation
• Chat interface for coaching


## Current Status
This experiment is in the **Validating** phase.
