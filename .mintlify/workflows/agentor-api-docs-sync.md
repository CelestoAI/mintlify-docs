---
name: "API docs sync"
on:
  cron: "0 0 * * 1"
---

Update the docs for either Agentor or SmolVM based on which repository changed.

## Core writing principles
- Follow progressive disclosure of complexity.
- Lead with outcomes, not implementation details.
- The first paragraph of every page must be plain English with no jargon.
- Assume the reader may be a beginner engineer or even a non-developer.
- Do not assume prior knowledge.
- Explain what the user can do and why it matters before explaining how it works.
- Do not introduce a new concept unless the page truly needs it.
- If you must use a technical term, explain it immediately in simple language.
- Prefer short, concrete sentences over dense explanations.

## Examples and commands
- Every code sample must be copy-pasteable and consistent with the current codebase.
- Every command must be runnable as written, with correct filenames, flags, and prerequisites.
- If a command depends on being in the repo, say so before using repo-relative paths like `./scripts/...`.
- If an example file exists in the repo, prefer linking to it or mirroring it instead of inventing a new inline example.
- Keep quickstarts minimal: one clear path that works end to end.
- Use examples that show the real user outcome, not internal mechanics.

## Product framing
- For top-level docs, make sure a new reader can quickly understand:
  1. what the product is,
  2. what they can do with it,
  3. where to start next.
- Organize docs so readers can discover use cases and then drill into details.
- Cover both SDK and CLI when both are part of the product.

## SmolVM-specific guidance
- Prefer plain words like `sandbox`, `browser`, `agent`, and `run code`.
- Do not lead with low-level virtualization details.
- Present isolation details later, only after the user understands the product outcome.
- Make sure docs reflect SmolVM as more than just a microVM library when the code supports browser-use or computer-use workflows.
- Help the reader discover use cases such as running code, starting a browser session, and integrating with agent tools.

## Output quality bar
The updated docs should help a first-time reader glance at the page, understand the product direction, and find the right next example or workflow without confusion.
