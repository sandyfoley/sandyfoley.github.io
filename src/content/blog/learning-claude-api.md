---
title: "Inside Claude Code and the SDK: What I Learned"
description: "So you wanna know more about Claude Code and SDK?"
image: https://sandyfoley.github.io/images/blog/learning-claude-code.png
publishDate: 2026-05-28
audience:
  - Developers
  - Sonnet 4.6 / Medium
tags:
  - claude
  - certification
draft: false
---

<figure>
  <img src="/images/blog/learning-claude-code.png" alt="Learning Claude Code and its SDK" />
</figure>

I didn't expect to come away from studying Claude Code and SDK thinking less about prompts and more about systems architecture, but that's what happened.
I found that it's a layered runtime for thinking and that turned out to be the most interesting part of learning it.  Here's a mind dump of what I learned.

## CLAUDE.md = Memory
Let's start with the base of making Claude yours: CLAUDE.md.
It's used for things like repository structure maps, architecture decisions, naming conventions, testing expectations, and domain-specific constraints. 
Most importantly, it can exist at different scopes depending on setup, with project-level being most common and user or global-level instructions layered on top.
It behaves less like memory and more like bootstrapping a runtime state with every prompt.  Be careful, AI can sometimes forget to look at it!

## Skills = Focused taskmasters
Claude Code distributes capability across a concept called Skills which are reusable bundles of instructions, scripts, and reference materials that load on demand. At session start, Claude sees only the skill's name and description. When a task matches, the full instructions load; if those reference other files or scripts, those load too. Their source code never consumes tokens.

## Hooks = Deterministic guard dogs
Hooks are shell commands, HTTP endpoints, or LLM prompts that fire at specific lifecycle points regardless of what the model decides to do.
The official event taxonomy organizes them into three cadences: once per session (SessionStart, SessionEnd), once per turn (UserPromptSubmit, Stop, StopFailure), and on every tool call in the agentic loop (PreToolUse, PostToolUse).
The LLM model reasons and the hooks enforce rules. 
- A PreToolUse hook can validate arguments or block an unsafe operation with a non-zero exit code before the tool ever runs.
- A PostToolUse hook can auto-format a file after every edit or trigger a linter without asking the model to remember to do it. 
- A SessionStart hook can inject project context so every prompt begins from a consistent state.

This introduces deterministic structure around probabilistic reasoning. 

## Subagents = Delegation
Subagents handle specific responsibilities in their own context windows with their own prompts, tool access, and permissions.
Common patterns: a code-writing flow focused only on implementation, a PR flow that inspects changes, a test-generation flow that builds and runs validation cases, a research flow that gathers external context. Each subagent operates in isolation, which prevents the main thread from becoming bloated or unstable over time.
There are also structural safeguards against runaway delegation or recursive loops, which keeps the overall behavior predictable. 

## MCP = Toolbox
The Model Context Protocol is where everything opens outward. Instead of building one-off integrations for every external system, MCP provides a standardized interface layer for connecting external capabilities (GitHub, databases, internal APIs, file systems, custom enterprise tools) into the model's environment.
The architectural shift is that you're no longer wiring tools directly into prompts. You're exposing them to be like a node inside a larger operational network.

## In Summary ...
The biggest surprise was the collection of features. Each piece of architecture solves a specific class of problems: 
- persistent context
- modular capability
- deterministic control
- delegation
- external integration

This is what it feels like to build systems around intelligence rather than just access to it.