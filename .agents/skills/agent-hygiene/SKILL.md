---
name: agent-hygiene
description: Enforces mandatory cleanup of temporary files created during task execution. Use this skill whenever an agent is concluding a task, calling the notify_user tool to report completion, or when explicit trigger words like "ferdig", "avslutt", "done", "cleanup", or "finish" are mentioned.
---

# Agent Workspace Hygiene Protocol

You are required to follow a zero-footprint policy for temporary workspace files. The OS does not reliably clean up `/tmp/` or `/private/tmp/` in a way that prevents editor clutter.

## Core Rule

Any scratch files, analysis scripts, data parsers, or temporary testing modules created in `/tmp/` or `/private/tmp/` **MUST** be explicitly deleted by you before finishing a task.

## Actionable Steps

1. **Review Actions**: Before calling `notify_user` or marking a task as complete, review the files you created during your execution.
2. **Identify Temp Files**: Locate any files you wrote to `/tmp/`, `/private/tmp/`, or the root directory that were purely for intermediate analysis.
   - _Example Target_: `/private/tmp/fetch_hidden_data.py`
3. **Execute Deletion**: Use the `run_command` tool (or equivalent terminal access) to delete the identified temporary files.
   - _Example Command_: `rm -f /private/tmp/fetch_hidden_data.py`
4. **Skip Artifacts**: Do not touch or delete any files located in `.gemini/antigravity/brain/...` (e.g., `task.md`, `implementation_plan.md`, `walkthrough.md`). These are required persistent artifacts.

## Examples

### Scenario: Temporary script used for analysis

1. Agent creates `/private/tmp/fix_json.py` to parse files.
2. Script is executed, output is analyzed, and the result is applied to the main project files.
3. _Required Cleanup Action_: Agent executes the following terminal command before reporting task completion to the user:
   `rm -f /private/tmp/fix_json.py`
