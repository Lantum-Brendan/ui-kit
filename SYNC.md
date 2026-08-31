# ui-kit ← webui : Component Extraction Plan

**Scope rule:** Nothing in `webui` is modified. All work happens in `ui-kit`.
We copy source files from `webui/components/**` into `ui-kit/components/**`
and apply the transformations described below, entirely within `ui-kit`.

---

## 1. Why this exists

`ui-kit` is a standalone **Nuxt layer** (`nuxt.config.ts` → `components/`
auto-imported, tokens shipped via `assets/css/tokens.css`). It was extracted
from `webui`, which still carries its own duplicate `T*` copies. The goal of
this plan is to bring the rest of `webui`'s presentational components into the
kit **without coupling the kit to webui's runtime** (i18n, API, auth, router).

---

## 2. The standard (from prior review)

A kit component MUST be:

- **Presentational** — no `useI18n`, no `useRouter`/`useRoute`, no `/api`,
  `useAuth`, `runtimeConfig`, `axios`, or other host-only runtime.
- **Token-driven** — all color/spacing/radius/type via SCSS vars from
  `ui-kit/assets/scss/_vars.scss` (which map to CSS custom properties in
  `assets/css/tokens.css`). No hardcoded design values.
- **BEM-ish class names** (`block`, `block--modifier`, `block__element`) kept
  stable — host apps may target them.
- **Named `T*` for primitives**; non-primitive composites keep their webui name.
- **Co-located companion files** (optional but standard):
  - `<Name>.stories.js` — Storybook CSF (title / component / args / argTypes + named states)
  - `<Name>.cy.js` — Cypress component test (`cy.mount`, assert classes/events)
  - **Do NOT port** webui's `*.test.ts` (Vitest) — the kit uses Cypress.

### The exact transform (only real difference between repos)

| webui | ui-kit |
|-------|--------|
| `@use '@/assets/scss/_variables.scss' as *;` | `@use '../assets/scss/_vars.scss' as *;` |
| `@use '~/assets/scss/_variables' as *;` | `@use '../assets/scss/_vars.scss' as *;` |

> The token file is also **renamed**: webui `_variables.scss` ↔ kit `_vars.scss`
> (same content). This filename mismatch is the single root friction; the kit
> standard is `_vars.scss`.

---

## 3. Classification of webui components

Run the scan mentally / via the verification grep (§6). Result buckets:

### ✅ Tier A — COPY-READY (presentational, transform-only)
Pure primitives needing only the SCSS path rewrite (and, where used, an svg).
Text inside these must already be props/slots, not `t(...)`.
> Paths below keep their webui `<path>/` prefix for traceability ONLY —
> in the kit every file lands FLAT in `ui-kit/components/` (see §4 step 1).

- `AuthDivider.vue`, `AuthFooterLink.vue`
- `ContentCard.vue`, `ContentSection.vue`* (see dep note), `ContentCardGrid.vue`**, `ContentListView.vue`**, `ContentTable.vue`**
- `EmptyState.vue`** (uses `t()` → refactor or 🔴), `HamburgerMenu.vue`, `IconPicker.vue`
- `icons/GoogleIcon.vue`, `LoadingSkeleton.vue`, `Logo.vue`
- `modals/ConfirmModal.vue`, `modals/LearningModal.vue`, `modals/RecurringModal.vue`*
- `onboarding/DashboardOnboarding.vue`, `onboarding/OnboardingWizard.vue`, `onboarding/OnboardingEmptyState.vue`**
- `PartyCardList.vue`, `PartyCard.vue`**
- `reports/charts/CategoryDonut.vue`, `reports/charts/CumulativeNetArea.vue` (done), `reports/charts/CashflowLineChart.vue`** (done — `labels` prop), `reports/charts/DailyBarChart.vue`** (done — `transactionsLabel` + `locale` props)
 - `reports/KpiCard.vue` (done — transform-only, props), `reports/ReportsTabs.vue` (done — transform-only, `tabs`+`modelValue` props), `reports/SparkLine.vue` (done — prior)
- `reports/*` tabs (CalendarHeatmap (done — `labels`+`locale`), CalendarTab (done — `labels`+`locale`, forwards to CalendarHeatmap), CashflowHero (done — `labels`), CategoriesTab (done — `labels`, forwards to CategoryRanking), CategoryRanking (done — `labels`+`fill()`), ChartsTab (done — `labels`+`locale`+`fill()`, forwards to charts), FinancialRatios (done — `labels`+`fill()`), FlowTab (done — `labels`, forwards to SankeyFlow), MonthInReview (done — `labels`+`fill()`), NotableStrip (done — `labels`+`locale`), PeriodControl (done — `labels`), ReportsEmpty (done — `labels`+`cta` slot), SankeyFlow (done — `labels`))** — i18n → refactor or 🔴
- `SearchableDropdown.vue`* (done — transform-only, heroicons + props), `SearchInput.vue`** (done — prior)
- `settings/CollapsibleSection.vue` (done — transform-only, lucide + props), `settings/PasswordModal.vue`** (done — `labels`+`messages` props, i18n stripped), `settings/Settings*`** (🔴 api/i18n — NOT copied)
- `TipsSection.vue`** (done — prior), `ViewToggle.vue` (done — prior)
- `TransactionFormContainer.vue`, `TransactionFormSection.vue`, `TransferFormContainer.vue` (done — transform-only, child imports flattened)
- `TTransactionSubCard.vue` (done — transform-only, props), `wallets/WalletsStatsStrip.vue`** (done — prior)
- `ai/TypingDots.vue` (done — transform-only, flat `TypingDots.vue`)

> ** = currently `i18n`-flagged in webui. Before copy, confirm text is supplied
> via props/slots; if it calls `t(...)` directly, either (a) refactor text to a
> prop/slot (preferred) or (b) move to 🔴.
> * = imports a shared dep (Tier B, §4).

### 🟡 Tier B — COPY WITH SHARED DEPS
Approach taken: instead of copying webui's `composables/`/`types/` into the kit
(which would drag runtime coupling), every Tier-B dependency was **converted to a
prop/emit** (e.g. `useStatistics` → `statistics`/`formatCurrency` props,
`useSharedData` → `wallets`/`defaultCurrency` props, `useSidebar` →
`isTabletOrBelow` prop, `utils/currency` → inlined local helpers). Result: **no
Tier-B deps copied** — all 103 components are fully self-contained.

Extracted components that originally carried Tier-B deps (now prop-driven):
`ContentSection`, `ImportAnalyzing`, `ImportConfirmDialog`, `SuggestionReviewTable`,
`NotificationsContainer`, `TTransactionCard`, `WalletCard`, `WalletDetailPanel`,
`WalletForm`, `WalletListCard`, `TransferForm`, `AIChat`, `QuickInsights`,
`TTableComponent`, `TransactionFilters`, `PartyDetailPanel`, `LanguageSelector`,
`ThemeSelector`, `ThemeToggleButton`, `SettingsDisplay`, `PartiesStatsStrip`,
`BudgetCard`, `BudgetForm`, `CategoryBreakdown`.

### 🔴 Tier C — DO NOT COPY (coupled to webui runtime) — 20 REMAINING
Leave these in webui. They use api/auth/router composables or `ComponentLoader`:

- `ai/ChatMessageList`, `ai/ChatResultRenderer`, `ai/ChatSidebar` (aiApi types + router)
- `reports/CategoryDrillModal` (`useTransactions` composable)
- `ComponentLoader` (Tier-C loader — must never be copied)
- `dashboard/DashboardKPIs` (`useWallets`), `RecentTransactions` (`useRouter`+`useTransactions`)
- `NotificationBell` (`notificationsApi`), `TAvatar` (`useRouter`+`useAuth`+`logout`)
- `SettingsAccount` (`useAuth`), `SettingsGeneral` (`configurationsApi`),
  `SettingsNotifications` (`notificationsApi`), `SettingsWallets` (api ×3)
- `StatsFilterModal` (`useWallets`), `TDashboardTopCard` (`useAuth`)
- `TNavbar` (`useAuth`), `TSidebar` (`useRoute`+`useRouter`)
- `TransactionForm` (`api`+`apiHelpers`), `TransactionsContentSection` (`useTransactions`),
  `TransactionsSpreadsheet` (`api`), `TransferForm` (`api`) — NOTE: `TransferForm.vue`
  in kit is the presentational wrapper; this Tier-C `TransactionForm.vue` is the
  data-fetching parent, distinct file.

> If a Tier C component is desired later, the correct path is to **extract a
> presentational core** (strip i18n/API, expose props/slots/emits) — that is a
> refactor, not a copy.

### ✅ EXTRACTION STATUS
- **103 / 116** webui components extracted to `ui-kit/components/` (flat), all §6-clean.
- **20** remain in webui as Tier-C blockers (api/router/composables/`ComponentLoader`).
- All i18n text refactored to `labels` props (English defaults) + `fill()` where interpolated.

---

## 4. The copy procedure (per file, all in ui-kit)

```
1. COPY  webui/components/<path>/Name.vue  →  ui-kit/components/Name.vue
   NOTE: the kit is FLAT — drop the source subpath. All components live
   directly in `ui-kit/components/`, co-located with their `.stories.js` /
   `.cy.js`. Do NOT recreate `reports/`, `settings/`, `modals/`, etc.
   subfolders (e.g. webui `components/reports/SparkLine.vue`
   → `ui-kit/components/SparkLine.vue`).
2. REWRITE scss import:
     '@/assets/scss/_variables.scss'  →  '../assets/scss/_vars.scss'
     '~/assets/scss/_variables'       →  '../assets/scss/_vars.scss'
3. IF useI18n | useRouter | useRoute | /api | useAuth | runtimeConfig | axios
     → refactor text to prop/slot OR move to Tier C; STOP if can't.
4. (Tier B) copy referenced types/composables into ui-kit, rewrite their
   @/~/ paths to relative; re-run step 3 on each dep.
5. COPY referenced public svgs → ui-kit/public/ (box.svg, bulbIcon.svg,
   logo-mark.svg, icons/imports/*.svg as needed).
6. ADD <Name>.stories.js (kit Storybook convention).
7. ADD <Name>.cy.js (Cypress) for interactive components.
8. Confirm BEM class names unchanged.
```

---

## 5. Checklist — task complete when ALL boxes ticked

### Per-component (repeat for each copied file)
- [ ] File copied into `ui-kit/components/...` with correct name
- [ ] `@use` line is `'../assets/scss/_vars.scss' as *;` (no `@/` or `~/` left)
- [ ] No `useI18n`, `useRouter/useRoute`, `/api`, `useAuth`, `runtimeConfig`, `axios`
- [ ] All `$token`s used exist in `ui-kit/assets/scss/_vars.scss`
- [ ] Tier B deps copied + their `@/`/`~/` rewritten to relative
- [ ] Referenced svgs present in `ui-kit/public/`
- [ ] `<Name>.stories.js` co-located
- [ ] `<Name>.cy.js` added for interactive components
- [ ] BEM class names unchanged from webui source

### Assets
- [ ] Required svgs copied to `ui-kit/public/` (box.svg, bulbIcon.svg, logo-mark.svg, icons/imports/*)

### Repo integrity
- [ ] All components are FLAT in `ui-kit/components/` (no `reports/`, `settings/`, etc. subfolders)
- [ ] No `.test.ts` (Vitest) ported from webui
- [ ] `ui-kit/assets/scss/_vars.scss` = canonical token set (add missing `$vars` only if a component needs them, mirroring `tokens.css`)
- [ ] `nuxt.config.ts` unchanged (auto-import already covers `components/**`)

### Verification (run in ui-kit)
- [ ] `grep -rnE "useI18n|useRouter|useRoute|/api|useAuth|runtimeConfig|@/|~/" ui-kit/components` → **no output**
- [ ] `grep -rn "@use" ui-kit/components | grep -v "../assets/scss/_vars.scss"` → **no output**
- [ ] `npx sass ui-kit/assets/scss/_vars.scss >/dev/null` → compiles
- [ ] `npx nuxi typecheck` (or `storybook build`) → passes

---

## 6. Quick verification commands (copy from here)

```bash
# 1. Forbidden coupling must be absent everywhere in the kit
grep -rnE "useI18n|useRouter|useRoute|/api|useAuth|runtimeConfig|axios|@/|~/" \
  components | grep -v "assets/scss/_vars.scss"

# 2. All components must import tokens via the canonical relative path
grep -rn "@use" components | grep -v "../assets/scss/_vars.scss"

# 3. Tokens compile
npx sass assets/scss/_vars.scss >/dev/null && echo "tokens OK"

# 4. Type/lint the layer
npx nuxi typecheck
```

---

## 7. Recommended execution order

1. **Proof component** — `EmptyState.vue` + `box.svg` + `.stories.js` (validates
   pipeline; refactor `t()` to a prop first).
2. **Tier A bulk** — copy remaining ✅ primitives, transform SCSS, add stories.
3. **Tier B** — port deps + components together, verifying dep chain is clean.
4. **Final verification** — run §6 greps + build. Do not touch Tier C.
