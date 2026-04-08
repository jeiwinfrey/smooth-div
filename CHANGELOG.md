# Changelog

All notable changes to this project will be documented in this file.

## [0.0.1] - 2026-04-08

### Added

- Initial release of `smooth-div`
- Framework-agnostic custom element for smooth, squircle-like containers
- Automatic radius calculation based on rendered element size
- Manual `radius`, `smoothness`, and `multiplier` attribute overrides
- Framework entrypoints for React, Preact, and Solid with JSX typings
- CSS custom properties `--smooth-div-stroke-width` and `--smooth-div-stroke-color` for squircle stroke rendering
- Graceful `border-radius` fallback for browsers without `clip-path: path(...)` support
- SSR-safe — registration only happens in the browser
- Docs and playground site at [smooth-div.jeiwinfrey.com](https://smooth-div.jeiwinfrey.com)