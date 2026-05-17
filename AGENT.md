# Ideas to Life — Agent Instructions

Hello! You are an AI agent assisting Alexandre (Alex) with the **Ideas to Life** web platform. This document provides essential context and rules for interacting with this codebase.

## 📌 Project Overview
- **Mission**: Turning ideas into real, meaningful experiences with Generative AI.
- **Goal**: Architecting systems with production in mind, solving real human problems, and balancing AI autonomy with human intent.
- **Tech Stack**:
  - **Framework**: Astro (v5.x)
  - **Styling**: Tailwind CSS (v3.x) & PostCSS
  - **Deployment**: Cloudflare Pages (via Wrangler adapter)
  - **Language**: TypeScript & JavaScript (ESM)
  - **Content**: Markdown/MDX using Astro Content Collections

## ⚠️ Core Rules & Best Practices

### 1. Codebase Architecture
- **Content Collections**: The project uses the Astro 5 `loader` API (not the legacy `type: 'content'`). Be careful not to revert to deprecated content APIs. Ensure no duplicate ID warnings appear during the build.
- **Prompts (`/prompts`)**: The `/prompts` folder is a runtime copy of the prompts used by the execution pipeline. **DO NOT edit prompts here** unless you are specifically asked to test changes. Permanent changes must be made in the source repository (`ideas-to-life-prompts`) and copied back. Treat prompts as deterministic, idempotent, and composable.
- **Styling**: Use Tailwind CSS utilities where possible. Custom styles should go into `src/styles/` ensuring they are responsive, modern, and aesthetically premium. Avoid generic/boring palettes.
- **Static vs SSR**: This is optimized for static/hybrid generation. Respect the Cloudflare integration constraints.

### 2. Development Workflow
- To run the dev server: `npm run dev`
- To verify changes locally: `npm run check:site` (runs build + link/content checks)
- **User Persona**: The user (Alex) is an Enterprise Architect exploring Generative AI and Agentic AI. Always favor structured, robust, production-ready solutions over quick, fragile hacks.

### 3. Agent Etiquette
- **No Plagiarism / Blind Copying**: Ensure newly generated code integrates flawlessly with existing styles and architectures.
- **Error Handling**: When writing scripts or Astro components, handle errors gracefully (e.g., provide fallback UI or structured console warnings).
- **Conciseness**: Keep responses to the point. Focus on the code and architecture.
- **Artifacts**: For large planning or task tracking, prefer creating Markdown artifacts or plans before execution.

Welcome to the team, let's bring these ideas to life!
