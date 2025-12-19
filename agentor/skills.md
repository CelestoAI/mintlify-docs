---
title: "Agent Skills"
sidebarTitle: "Agent Skills"
---

Skills are directories containing instructions, scripts, and resources that an agent loads dynamically to improve performance on specialized tasks.

Agent Skills help agents pull just the right context from simple Markdown files. The agent first sees only a skill's name and short description. When a task matches a skill, the agent loads the rest of `SKILL.md`, follows the steps, and can execute commands in a shell environment as specified by the skill.


<Card img="/assets/cat.gif">
Credits: 🤖 Agent Z
</Card>


Agentor provides native support for skills. Simply provide the directory or path to a `SKILL.md` file, and Agentor will automatically inject the skill metadata into the system prompt. Key features of Agentor skills:

- **Starts light**: Discover skills by name and description only
- **Loads on demand**: Pull full instructions from `SKILL.md` when relevant
- **Executes safely**: Run skill-driven commands in an isolated shell

Skill layout example:

```
example-skill/
├── SKILL.md        # required instructions + metadata
├── scripts/        # optional helpers the agent can call
├── assets/         # optional templates/resources
└── references/     # optional docs or checklists
```

Using a skill to create a GIF:

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

