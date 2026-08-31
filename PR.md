## Summary

Extracted the reusable UI components (buttons, cards, tables, charts, forms, modals, auth, and AI chat) out of `trakli/webui` into this UI-kit repo, and added a Nuxt playground so every component is live-previewable with realistic sample data.

## What changed

- **~95 components** added under `components/`, covering:
  - Buttons & actions, layout & containers (T* primitives)
  - Cards & summaries (wallets, budgets, parties, KPIs, onboarding, empty states)
  - Charts & data viz (cashflow, donut, Sankey, heatmap, sparklines, reports)
  - Tables & lists, forms & inputs, modals & dialogs
  - Auth (login, register, carousel) and AI chat (sidebar, composer, message list, result renderer)
  - Most ship with Storybook stories (`.stories.js`) and Cypress component tests (`.cy.js`)
- **`.playground/` Nuxt app** — a Nuxt layer host (`extends: ['..']`) that pulls in the kit's components and design tokens.
  - `app/pages/index.vue`: sidebar dashboard listing every component grouped by category, with search and live rendering.
  - `app/registry.ts`: auto-discovers all `components/*.vue`, hand-tunes prop/slot demos with realistic sample data, and auto-buckets components into categories.
  - `app/components/UsageLanding.vue`: the `/` page documenting installation & usage.
- **`package.json`**: added `dev` (`nuxi dev .playground`) and `build` (`nuxt build .playground`) scripts.
- **`public/`**: static assets (logo, icons).

`SYNC.md` is intentionally left out of the commit (local sync notes).

## How to review

```bash
npm install
npm run dev   # opens the playground at / — landing page explains usage, sidebar previews each component
```

## Notes

- Components are adapted from `trakli/webui`; this commit seeds them here as a standalone kit.
- The playground maps the `@trakli/ui-kit` alias locally; the published layer relies on the real npm alias.
