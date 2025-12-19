---
title: "Agent Skills"
sidebarTitle: "Agent Skills"
---

<img src="/assets/cat.gif"/>

Skills are directories containing instructions, scripts, and resources that an agent loads dynamically to improve performance on specialized tasks.

Agent Skills help agents pull just the right context from simple Markdown files. The agent first sees only a skill's name and short description. When a task matches a skill, the agent loads the rest of `SKILL.md`, follows the steps, and can execute commands in a shell environment as specified by the skill.


## Agentor x Skills

Agentor provides native support for skills. Simply provide the directory or path to a `SKILL.md` file, and Agentor will automatically inject the skill metadata into the system prompt. Key features of Agentor skills:

- **Starts light**: Discover skills by name and description only
- **Loads on demand**: Pull full instructions from `SKILL.md` when relevant
- **Executes safely**: Run skill-driven commands in an isolated shell


## Creating Your First Skill

Skill follow the following layout:

```
example-skill/
├── SKILL.md        # required instructions + metadata
├── scripts/        # optional helpers the agent can call
├── assets/         # optional templates/resources
└── references/     # optional docs or checklists
```


Follow these steps to build and integrate a custom skill into your agent.

<Steps>
  <Step title="Create the skill directory">
    Organize your skill in a dedicated folder. At minimum, you need a `SKILL.md` file.
    
    ```bash
    mkdir -p .skills/my-new-skill
    touch .skills/my-new-skill/SKILL.md
    ```
  </Step>
  <Step title="Define instructions in SKILL.md">
    The first few lines should contain a clear name and description. The rest of the file should provide detailed, step-by-step instructions for the agent.

    ```markdown SKILL.md
    # Image Optimizer
    Description: Optimizes PNG and JPG files for web usage using ffmpeg.

    ## Instructions
    1. Locate the images in the provided path.
    2. Use `ffmpeg` to reduce file size without losing quality.
    3. Notify the user once complete.
    ```
  </Step>
  <Step title="Register the skill">
    Pass the path to your skill folder when initializing your agent.
    
    ```python
    agent = Agentor(
        skills=[".skills/my-new-skill"],
        name="ImageOptim"
    )
    ```
  </Step>
</Steps>

## Usage Examples

### Creating a GIF

```python
from agentor.tools import ShellTool
from agentor import Agentor

agent = Agentor(
    name="AgentZ",
    model="gemini/gemini-3-flash-preview",
    instructions="Your job is to create GIFs. Lean on the shell tool and any available skills.",
    skills=[".skills/slack-gif-creator"],
    tools=[ShellTool()],
)

async for chunk in await agent.chat("produce a cat gif", stream=True):
    print(chunk)
```

## Best Practices

<AccordionGroup>
  <Accordion title="Writing effective SKILL.md files">
    - **Clear Descriptions**: The first 2-3 lines are critical. They determine if the agent "activates" the skill.
    - **Modular Steps**: Break complex logic into smaller, numbered instructions.
    - **Error Handling**: Tell the agent what to do if a command fails (e.g., "If ffmpeg is missing, suggest the user install it").
  </Accordion>
  <Accordion title="Organizing resources">
    Use the `scripts/` folder for complex Python or Bash scripts that the agent can call via the shell. This keeps the `SKILL.md` focused on logic rather than raw code.
  </Accordion>
</AccordionGroup>

<Warning>
  **Security Note**: Since skills can execute shell commands, always run your agents in isolated environments (like Docker or a VM) when using skills from untrusted sources.
</Warning>

