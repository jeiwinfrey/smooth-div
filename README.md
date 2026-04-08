# smooth-div

A framework-agnostic custom element for smooth, squircle-like containers.

[![npm version](https://img.shields.io/npm/v/smooth-div)](https://www.npmjs.com/package/smooth-div)
[![npm downloads](https://img.shields.io/npm/dm/smooth-div)](https://www.npmjs.com/package/smooth-div)
[![license](https://img.shields.io/npm/l/smooth-div)](./LICENSE)

`smooth-div` gives you a `<smooth-div>` element that behaves like a normal container, works with regular CSS and utility classes, and falls back gracefully when a browser cannot render the full squircle path.

## Install

```bash
npm install smooth-div
```

```bash
pnpm add smooth-div
```

```bash
yarn add smooth-div
```

```bash
bun add smooth-div
```

## Quick Start

Register the custom element once:

```ts
import "smooth-div"
```

Then use it like a normal container:

```html
<smooth-div class="p-4">Hello</smooth-div>

<smooth-div radius="20" class="w-64 h-32">
  Card
</smooth-div>
```

## Why `smooth-div`

- Framework-agnostic runtime built on custom elements
- Works with plain CSS, utility classes, and normal DOM content
- Automatic radius calculation based on rendered size
- Manual `radius`, `smoothness`, and `multiplier` overrides when needed
- Graceful `border-radius` fallback for browsers without full `clip-path: path(...)` support

## Docs

- npm: [npmjs.com/package/smooth-div](https://www.npmjs.com/package/smooth-div)
- Package docs: [`packages/smooth-div/README.md`](packages/smooth-div/README.md)
- Repo: [github.com/jeiwinfrey/smooth-div](https://github.com/jeiwinfrey/smooth-div)
- Site: [smooth-div.jeiwinfrey.com](https://smooth-div.jeiwinfrey.com)
- Changelog: [`CHANGELOG.md`](CHANGELOG.md)

## Monorepo

- `packages/smooth-div`: publishable package
- `apps/site`: demo app

## Development

```bash
pnpm install
pnpm dev
```

## Checks

```bash
pnpm check
```
