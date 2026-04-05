# Contributing

Thanks for contributing to `smooth-div`.

## Getting started

```bash
pnpm install
pnpm dev
```

## Before opening a PR

Run the repo checks:

```bash
pnpm check
```

## Pull request guidelines

- Keep changes focused.
- Update docs when the public API or behavior changes.
- Add or update validation when a change could regress package output or browser behavior.
- Call out browser-specific behavior or fallbacks in the PR description.

## Development notes

- `packages/smooth-div` contains the publishable package.
- `apps/site` is the demo app used for manual validation.
- Framework-specific typing entrypoints live alongside the package surface and should stay in sync with the runtime API.
