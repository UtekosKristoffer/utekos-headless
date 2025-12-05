# AGENTS

- Role: Codex assists with edits; keep existing user changes; ask before
  destructive steps.
- Execution limits: sandboxed/read-only by default with no network; request
  approval before writes, installs, or privileged commands.
- Commands: prefer `rg` for search; avoid resets/reverts (e.g.,
  `git reset --hard`, `checkout --`); do not amend commits unless explicitly
  asked.
- Editing: default to ASCII; add only necessary clarifying comments; favor
  `apply_patch` for single-file edits; preserve unrelated diffs.
- Testing: run project-standard tests only when helpful; summarize results; do
  not delete/skip failing tests without direction.
- Data handling: no external fetches without approval; avoid logging secrets or
  private data.
- types should be created and placed in the `src/types`. Imported for use from
  "@types". Always try to reuse existing types.

additional conversions reported
