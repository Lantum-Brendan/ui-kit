# Primitives to Keep in @trakli/ui-kit

This is the definitive list of components that should remain in the UI kit as true primitives.

## Core Primitives (45 components)

### Form Components (6)
- `TForm.vue`
- `TFormField.vue`
- `TFormInput.vue`
- `TFormSelect.vue`
- `TFormTextarea.vue`
- `TFormRow.vue`

### Buttons & Actions (5)
- `TButton.vue`
- `TInfoButton.vue`
- `TDropdown.vue`
- `TDropdownItem.vue`
- `TFilterToggle.vue`

### Cards & Surfaces (3)
- `TCard.vue`
- `TPanel.vue`
- `TEmptyState.vue`

### Layout (6)
- `TContainer.vue`
- `TStack.vue`
- `TGrid.vue`
- `TDivider.vue`
- `TSplit.vue`
- `TPageShell.vue` *(if generic enough)*

### Tabs (4)
- `TTab.vue`
- `TTabList.vue`
- `TTabPanel.vue`
- `TTabs.vue` *(if different from TTabList)*

### Tables & Lists (2)
- `TPagination.vue`
- `TListHeader.vue`

### Modals (4)
- `TModal.vue`
- `TModalHeader.vue`
- `TModalBody.vue`
- `TModalFooter.vue`
- `ConfirmModal.vue`

### Utility Components (8)
- `LoadingSkeleton.vue`
- `SearchInput.vue`
- `ThemeToggleButton.vue`
- `ThemeSelector.vue`
- `TypingDots.vue`
- `ViewToggle.vue`
- `HamburgerMenu.vue`
- `CollapsibleSection.vue` *(if made generic)*

### Icons & Branding (3)
- `Logo.vue`
- `GoogleIcon.vue`
- `IconPicker.vue`

### Utility Dropdowns (1)
- `SearchableDropdown.vue` *(if made generic, no business logic)*

## Components Requiring Review Before Decision (5)

These need inspection to determine if they're truly decoupled from app concerns:

1. **TNavbar.vue** - Review for routing/i18n/app state dependencies
2. **TSidebar.vue** - Review for routing/i18n/app state dependencies  
3. **TSidebarRail.vue** - Review for app dependencies
4. **TSidebarSub.vue** - Review for app dependencies
5. **TAvatar.vue** - Review for user context dependencies

**Decision criteria:**
- If they accept all content via props/slots and have no internal i18n → Keep
- If they import app composables, routing, or have hardcoded copy → Remove

## Total Expected Count

- **Core Primitives**: 45 components
- **Under Review**: 5 components (keep if decoupled)
- **Final Target**: 40-50 components (down from 196)

## Components to Remove (~151)

All components NOT listed above should be removed from the kit and moved to the consuming application, including:

- All Dashboard* components
- All Settings* components  
- All Chat*/AI* components
- All Import* components
- All *Form components except the generic TForm primitives
- All *Detail*, *Content*, *Stats* components
- All chart/analytics components (SparkLine, SankeyFlow, etc.)
- All domain-specific cards, lists, and modals
- All authentication components
- All onboarding/wizard components

See `COMPONENT_AUDIT.md` for the complete categorization.
