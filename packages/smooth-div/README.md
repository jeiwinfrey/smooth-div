# smooth-div

A framework-agnostic custom element for smooth, squircle-like containers.

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

## Usage

Import the package once so the custom element is registered:

```ts
import "smooth-div"
```

Then use `<smooth-div>` like a normal container:

```html
<smooth-div class="bg-white p-4">Hello</smooth-div>

<smooth-div class="w-64 h-32 bg-blue-500 p-4 text-white">Card</smooth-div>

<smooth-div radius="20" class="bg-gray-100 p-6">Fixed radius</smooth-div>

<smooth-div multiplier="2.2" smoothness="1" class="w-48 h-48 bg-indigo-500">
  Widget
</smooth-div>
```

## Framework entrypoints

- React: `import "smooth-div"` or `import "smooth-div/react"`
- Preact: `import "smooth-div/preact"`
- Solid: `import "smooth-div/solid"`
- Vue, Svelte, Astro, and plain HTML/JS: `import "smooth-div"`
- Angular: `import "smooth-div"` and add `CUSTOM_ELEMENTS_SCHEMA` in the consuming app

The runtime is the same for every entrypoint. The framework-specific subpaths only add JSX typings where the framework needs them.

## API

### Attributes

- `radius`
- `smoothness`
- `multiplier`

All numeric attributes can be passed as strings in markup:

```html
<smooth-div radius="20" smoothness="0.8" multiplier="2.2"></smooth-div>
```

### Properties

- `element.radius?: number`
- `element.smoothness?: number`
- `element.multiplier?: number`

### Defaults

- `smoothness = 0.6`
- `multiplier = 2.2`
- `radius = multiplier * Math.sqrt(Math.min(width, height))` when not explicitly provided

The computed radius is clamped so it never exceeds half the smaller side.

## Design notes

The default `smoothness = 0.6` comes from the iOS 60 smoothing value in Figma.

The automatic radius formula was derived by analyzing width, height, and radius values from samples in Apple's official design kit in Figma, then fitting a practical approximation for this cubic Bezier implementation.

## Browser support

`smooth-div` keeps children in the light DOM, so utility classes and regular CSS work normally.

On browsers that support `clip-path: path(...)`, it applies the generated squircle path directly.

On browsers that do not, it falls back to regular `border-radius`, so layout, content, and styling still work even if the exact squircle shape is unavailable.

## SSR

`smooth-div` is safe to import in SSR builds because registration only happens in the browser.

The shape is applied after hydration when the element can measure its rendered size.
