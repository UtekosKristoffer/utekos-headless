# PLAN source-citation requirements update

## Specific changes

- Added a mandatory source-citation section at the bottom of `PLAN.md` for
  future cache, rendering, performance, and related optimization work.
- Required every technical claim in process updates to include a file path and
  line range.
- Required framework and library claims to cite documentation files from
  `UtekosKristoffer/utekos-docs` with exact line ranges.
- Required application-specific claims to cite local workspace files with exact
  line ranges and to be labeled as local code evidence.
- Required documentation sources, local code evidence, audit evidence, and
  validation output to be separated in future process updates.

## Why

The existing plan required a process-update file after process-related fixes,
but it did not define how sources must be cited in those files
(`PLAN.md#L202-L204`). The new section records the stricter citation standard
directly in the plan so future agents have the rule before they start similar
work (`PLAN.md#L206-L228`).

## Documentation sources used

- None. This update records a project-process requirement from the current user
  request, not a Next.js, React, platform, or library behavior claim.

## Local evidence checked

- `PLAN.md#L202-L204` - existing process-update requirement.
- `PLAN.md#L206-L228` - new mandatory source-citation requirements.

## Validation

- `git --no-pager diff --check -- PLAN.md` passed after the `PLAN.md` edit.
