# @trakli/ui-kit

Shared Trakli UI primitives, distributed as a Nuxt layer. Consume it straight from GitHub today; npm publishing comes later.

This repo also serves as the reference shape for plugin client-UI layers in the plugin-UI extensibility architecture: a plugin that needs custom frontend ships a thin Nuxt layer exactly like this one.

## Consume

In the host app's `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ['github:trakli/ui-kit'],
})
```

The components are auto-imported into the host with their original names (`TButton`, `TCard`, ...), so usage is unchanged:

```vue
<template>
  <TCard>
    <TButton text="Save" variant="primary" @click="save" />
  </TCard>
</template>
```

Peer dependencies (provided by the host): `vue`, `nuxt`, `sass`, `lucide-vue-next`, `@heroicons/vue`.

## Theming contract

Components never hardcode colours. Their styles read SCSS variables (`assets/scss/_vars.scss`) that resolve to CSS custom properties (`--color-primary`, spacing, radius, elevation, ...). Those variables emit no CSS of their own.

The default values live in one place: `assets/css/tokens.css`, shipped with light (`:root`) and dark (`:root.dark`) palettes. The Nuxt layer loads it automatically.

A host themes the kit by overriding the custom properties in its own global stylesheet, loaded after the defaults. Override only what you need:

```css
:root {
  --color-primary: #047844;
  --color-primary-rgb: 4, 120, 68;
}
```

Because the kit's SCSS variables point at the custom properties, an override flows through every component automatically. No SCSS recompilation of the kit is required.

## Components

Primitives (extracted from the app):

- `TButton`, `TCard`, `TTabs`, `TDropdown`, `TDropdownItem`, `TInfoButton`, `TTopCard`, `ThemeToggleButton`

Layout (generic, authored here; the app will adopt them over time):

- `TContainer` (max-width centred), `TStack` (flex stack), `TGrid` (responsive grid), `TPanel` (surface card), `TSplit` (main plus aside), `TPageShell` (sidebar/header/main), `TDivider`

All are free of app composables, routing, and i18n.

Deferred (need decoupling before they can move): components bound to app state, routing, theme, or translation (for example `TNavbar`, `TSidebar`, `TAvatar`). These move once their i18n strings and behaviour are lifted into props or peer composables.

## Develop

```bash
npm install
npm run storybook   # interactive component docs at localhost:6006
npm run test:ct     # Cypress component tests (headless)
```

Storybook is the component workshop and documentation. Cypress component testing mounts each component in a real browser and asserts its behaviour.

## Status

Seed release. The host app still owns its in-app copies; switching the host to consume this layer is a separate, later step.
