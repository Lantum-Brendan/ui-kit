# Component Review Findings

## Components Under Review - Decision Made

### TNavbar.vue - ❌ REMOVE
**Reason:** Contains `labels` prop with hardcoded app-specific defaults:
```javascript
labels: {
  addTransaction: 'Add transaction',
  openLearningModal: 'Open learning modal',
  learnTitle: 'Learn how to use Trakli'
}
```
- Emits app-specific events: `add-transaction`, `open-learning`
- Imports app-specific components: `LanguageSelector`, `ThemeSelector`
- Not generic enough for a primitive kit

### TSidebar.vue - ❌ REMOVE
**Reason:** Contains `labels` prop and app-specific behavior:
- Emits `navigate` event with hardcoded path `/dashboard`
- Expects app-specific nav structure with `primary` and `footer` items
- Uses `TSidebarRail` and `TSidebarSub` which are also app-specific
- Has knowledge of routing paths (`currentPath`)

### TSidebarRail.vue - ❌ REMOVE
**Reason:** Child component of TSidebar, app-coupled

### TSidebarSub.vue - ❌ REMOVE
**Reason:** Child component of TSidebar, app-coupled

### TAvatar.vue - ❌ REMOVE
**Reason:** Contains `labels` prop with app-specific defaults:
```javascript
labels: {
  accountMenu: 'Account menu',
  settings: 'Settings',
  admin: 'Admin',
  logout: 'Logout'
}
```
- Emits app-specific actions: `settings`, `admin`, `logout`
- Hardcoded dropdown menu structure
- Expects `user` object with app-specific shape

## Additional Components to Review

### TTableComponent.vue - ❌ REMOVE
**Reason:**
- Has extensive `labels` prop with 20+ translation keys
- Tightly coupled to transaction domain (parseAmount, getCurrencySymbol, convertCurrency)
- Uses domain-specific components: TTableRow, TTableTotals
- Too opinionated for a generic table primitive

### TTableRow.vue - ❌ REMOVE
**Reason:** Transaction-specific row component, not generic

### TTableTotals.vue - ❌ REMOVE
**Reason:** Transaction-specific totals component, not generic

### TCardActionMenu.vue - ❌ REMOVE
**Reason:** Domain-specific action menu with edit/delete/recurring actions

### TDashboardTopCard.vue - ❌ REMOVE
**Reason:** Dashboard-specific card component

### TTransactionCard.vue - ❌ REMOVE
**Reason:** Transaction-specific card component

### TTransactionsCardList.vue - ❌ REMOVE
**Reason:** Transaction-specific list component

### TTransactionSubCard.vue - ❌ REMOVE
**Reason:** Transaction-specific sub-card component

### TSectionHeader.vue - ⚠️ EVALUATE
Could be kept if made generic (just eyebrow/title/subtitle/actions), but check for business logic

### TPageShell.vue - ⚠️ EVALUATE
Could be kept if it's truly just a generic sidebar/header/main layout

### SearchableDropdown.vue - ⚠️ EVALUATE
Could be kept if it's generic enough (no business logic)

### CollapsibleSection.vue - ⚠️ EVALUATE
Could be kept if it's generic enough

### ComponentLoader.vue - ⚠️ EVALUATE
Could be kept if it's a generic component loading wrapper

## Final Primitive Count

**Confirmed to Keep:** ~35 components

**Confirmed to Remove:** ~156 components (including the 5 originally under review)

**Still Evaluating:** ~5 components

---

## Next Step: Create Clean Primitives List

After evaluation of the remaining 5 components, create the final list and begin removal process.
