# Writing

## Core writing principles
- Follow progressive disclosure of complexity.
- Lead with outcomes, not implementation details.
- Capability first, motivation second.
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

--- 

## Guide to Writing a Value Framework for Technical Documentation

### Step 1: Identify the Current State

- **Objective**: Clearly define the existing situation or problem. - **Action**: Describe how the current system operates, focusing on inefficiencies or pain points. - **Example**: "Sequential request processing leads to delays and resource inefficiencies."

### Step 2: Highlight the Implication

- **Objective**: Explain the impact of the current state on the system or users. - **Action**: Illustrate how the identified problem affects performance, user experience, or scalability. - **Example**: "This creates bottlenecks, limiting the system's ability to handle multiple tasks during peak usage."

### Step 3: Describe the Future State

- **Objective**: Present the solution or improvement being implemented. - **Action**: Detail how the new approach or technology resolves the issues outlined in the current state. - **Example**: "LitServe uses asynchronous processing to run multiple operations simultaneously."

### Step 4: Emphasize the Benefits

- **Objective**: Highlight the advantages of implementing the solution. - **Action**: Focus on tangible outcomes such as improved performance, increased efficiency, and better user satisfaction. - **Example**: "This enhancement boosts system performance and throughput, providing faster, more reliable responses."

### Step 5: Conciseness and Clarity

- **Objective**: Ensure the paragraph is easy to read and understand. - **Action**: Use simple language, remove unnecessary jargon, and keep the paragraph concise. - **Example**: Ensure the value framework reads smoothly and is straightforward for entry-level engineers.

### Final Tips:

- **Audience Awareness**: Always keep the target audience in mind, ensuring that explanations are accessible. - **Consistency**: Maintain a consistent structure and tone across different documentation pages. - **Review and Edit**: Revise the paragraph for clarity and brevity, ensuring it effectively communicates the intended message.
