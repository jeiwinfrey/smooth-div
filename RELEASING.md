# Releasing

## Release checklist

1. Run `pnpm check`.
2. Review `packages/smooth-div/README.md` and `CHANGELOG.md`.
3. Bump the version in `packages/smooth-div/package.json`.
4. Commit the release changes.
5. Create a git tag for the version.
6. Publish with `pnpm --filter smooth-div publish --access public`.
7. Push the commit and tag to GitHub.
8. Add release notes on GitHub if needed.

## Notes

- The package is published from `packages/smooth-div`.
- `prepublishOnly` already runs the package build.
- `pnpm pack --dry-run` is included in `pnpm check` to catch publish-surface issues before release.
