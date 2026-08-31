# Component Audit: Primitives vs Page Components

This document categorizes all 196 components in @trakli/ui-kit to identify what should remain in a true primitive layer.

## ✅ TRUE PRIMITIVES (Keep - ~40 components)

These are reusable, generic UI components with no business logic or app-specific concerns.

### Form Primitives
- `TForm` - Form container with submit/cancel
- `TFormField` - Form field wrapper with label/error
- `TFormInput` - Text input primitive
- `TFormSelect` - Select dropdown primitive
- `TFormTextarea` - Textarea primitive
- `TFormRow` - Form row layout helper

### Button & Action Primitives
- `TButton` - Button component
- `TInfoButton` - Info/help button with tooltip
- `TDropdown` - Dropdown menu container
- `TDropdownItem` - Dropdown menu item
- `TFilterToggle` - Filter toggle button

### Card & Layout Primitives
- `TCard` - Generic card container
- `TPanel` - Surface panel/card
- `TContainer` - Max-width centered container
- `TStack` - Flex stack layout
- `TGrid` - Responsive grid layout
- `TDivider` - Visual divider
- `TSplit` - Main + aside split layout

### Tab Primitives
- `TTabs` - Tab component (if different from TTabList)
- `TTab` - Single tab button
- `TTabList` - Tab list container
- `TTabPanel` - Tab panel content

### Table Primitives
- `TPagination` - Pagination controls
- `TListHeader` - List/table header with search

### Modal Primitives
- `TModal` - Modal container
- `TModalHeader` - Modal header section
- `TModalBody` - Modal body section
- `TModalFooter` - Modal footer section
- `ConfirmModal` - Confirmation dialog primitive

### Navigation Primitives (if properly decoupled)
- `TNavbar` - ⚠️ NEEDS REVIEW - Check for app dependencies
- `TSidebar` - ⚠️ NEEDS REVIEW - Check for app dependencies
- `TSidebarRail` - ⚠️ NEEDS REVIEW
- `TSidebarSub` - ⚠️ NEEDS REVIEW
- `TAvatar` - ⚠️ NEEDS REVIEW - Check for user context

### Utility Primitives
- `TEmptyState` - Generic empty state
- `LoadingSkeleton` - Loading skeleton primitive
- `SearchInput` - Search input component
- `ThemeToggleButton` - Theme switcher
- `ThemeSelector` - Theme selection component
- `TypingDots` - Typing indicator animation
- `ViewToggle` - View mode toggle (list/grid)
- `HamburgerMenu` - Hamburger menu icon/button

### Icon & Visual Primitives
- `Logo` - Logo component
- `GoogleIcon` - Google icon
- `IconPicker` - Icon selection component

---

## ❌ PAGE COMPONENTS (Remove - move to app)

These are app-specific page-level components with business logic and domain concerns.

### Dashboard Pages (~10 components)
- `DashboardAgentHero` - Dashboard hero section with agent
- `DashboardKPIs` - Dashboard KPI display
- `DashboardOnboarding` - Dashboard onboarding flow
- `DashboardQuickActionModal` - Dashboard quick actions
- `DashboardWalletSelector` - Dashboard wallet selector
- `TDashboardTopCard` - Dashboard top card
- `TTopCard` - Top card for pages
- `OnboardingEmptyState` - Onboarding empty state
- `OnboardingWizard` - Onboarding wizard flow
- `EmptyState` - ⚠️ Could be primitive if generic enough

### Financial Position Pages (~5 components)
- `FinancialPositionView` - Full financial position page
- `FinancialPositionHero` - Financial position hero section
- `FinancialPositionDrill` - Financial position drill-down
- `FinancialRatios` - Financial ratios display
- `QuickInsights` - Quick insights section

### Transactions Pages (~15 components)
- `TransactionsContentSection` - Transactions content section
- `TransactionForm` - ⚠️ COMPLEX - May need to stay as composite
- `TransactionFormAttachments` - Transaction attachments section
- `TransactionFormContainer` - Transaction form container
- `TransactionFormGroups` - Transaction groups picker
- `TransactionFormIntent` - Transaction intent picker
- `TransactionFormParties` - Transaction parties picker
- `TransactionFormRecurring` - Transaction recurring settings
- `TransactionFormSection` - Transaction form section wrapper
- `TransactionsSpreadsheet` - Transactions spreadsheet view
- `TransactionsSpreadsheetEditor` - Spreadsheet editor
- `TransactionsSpreadsheetToolbar` - Spreadsheet toolbar
- `TransactionFilters` - Transaction filters panel
- `TTransactionCard` - Transaction card display
- `TTransactionsCardList` - Transaction card list
- `TTransactionSubCard` - Transaction sub-card
- `RecentTransactions` - Recent transactions widget
- `TTableComponent` - ⚠️ REVIEW - May be too opinionated
- `TTableRow` - ⚠️ Should be part of generic table
- `TTableTotals` - ⚠️ Should be part of generic table

### Transfer Pages (~2 components)
- `TransferForm` - Transfer form
- `TransferFormContainer` - Transfer form container

### Holdings Pages (~1 component)
- `HoldingForm` - Holding form (crypto/assets)

### Budget Pages (~2 components)
- `BudgetCard` - Budget card display
- `BudgetForm` - Budget form

### Category Pages (~7 components)
- `CategoriesTab` - Categories tab page
- `CategoryBreakdown` - Category breakdown chart
- `CategoryDonut` - Category donut chart
- `CategoryDrillModal` - Category drill-down modal
- `CategoryForm` - Category form
- `CategoryRanking` - Category ranking list

### Charts & Analytics Pages (~10 components)
- `ChartsTab` - Charts tab page
- `CalendarTab` - Calendar tab page
- `FlowTab` - Flow tab page (Sankey)
- `CalendarHeatmap` - Calendar heatmap chart
- `CashflowHero` - Cashflow hero section
- `CashflowLineChart` - Cashflow line chart
- `CumulativeNetArea` - Cumulative net area chart
- `DailyBarChart` - Daily bar chart
- `SankeyFlow` - Sankey flow diagram
- `SparkLine` - Sparkline chart
- `NotableStrip` - Notable items strip

### Party/Contact Pages (~6 components)
- `PartiesForm` - Parties form
- `PartiesStatsStrip` - Parties stats strip
- `PartyCard` - Party card display
- `PartyCardList` - Party card list
- `PartyDetailContent` - Party detail content
- `PartyDetailPanel` - Party detail panel

### Wallet Pages (~6 components)
- `WalletCard` - Wallet card display
- `WalletDetailContent` - Wallet detail content
- `WalletDetailPanel` - Wallet detail panel
- `WalletForm` - Wallet form
- `WalletListCard` - Wallet list card
- `WalletsStatsStrip` - Wallets stats strip

### Group Pages (~1 component)
- `GroupForm` - Group form

### Settings Pages (~6 components)
- `SettingsAccount` - Account settings page
- `SettingsConnections` - Connections settings page
- `SettingsDisplay` - Display settings page
- `SettingsGeneral` - General settings page
- `SettingsNotifications` - Notifications settings page
- `SettingsWallets` - Wallets settings page

### Month in Review Pages (~5 components)
- `MonthInReview` - Month in review page
- `MonthInReviewFooter` - Month in review footer
- `MonthInReviewHeader` - Month in review header
- `MonthInReviewIllustration` - Month in review illustration
- `MonthInReviewSlide` - Month in review slide

### AI Chat Feature (~20 components)
- `AIChat` - AI chat interface
- `ChatCalloutBlock` - Chat callout block
- `ChatCanvasBlock` - Chat canvas block
- `ChatChartBlock` - Chat chart block
- `ChatComparisonBlock` - Chat comparison block
- `ChatComposer` - Chat composer
- `ChatEmptyState` - Chat empty state
- `ChatExperience` - Chat experience wrapper
- `ChatImportReviewBlock` - Chat import review
- `ChatKpiBlock` - Chat KPI block
- `ChatLandingInsights` - Chat landing insights
- `ChatListBlock` - Chat list block
- `ChatMarkdownBlock` - Chat markdown block
- `ChatMessageList` - Chat message list
- `ChatProgressBlock` - Chat progress block
- `ChatProgressSteps` - Chat progress steps
- `ChatProposedActionBlock` - Chat proposed action
- `ChatQuestionBlock` - Chat question block
- `ChatQuickActionsBlock` - Chat quick actions
- `ChatResultRenderer` - Chat result renderer
- `ChatSidebar` - Chat sidebar
- `ChatTableBlock` - Chat table block
- `ChatTimelineBlock` - Chat timeline block

### Import Feature (~6 components)
- `ImportAnalyzing` - Import analyzing view
- `ImportConfirmDialog` - Import confirmation dialog
- `ImportSessionsList` - Import sessions list
- `ImportUpload` - Import upload page
- `ImportUploadDropzone` - Import dropzone component
- `ImportUploadFileList` - Import file list

### Reports Feature (~2 components)
- `ReportsEmpty` - Reports empty state
- `ReportsTabs` - Reports tabs

### Outreach Feature (~3 components)
- `OutreachComposer` - Outreach composer
- `OutreachComposerAudience` - Outreach audience picker
- `OutreachComposerMessage` - Outreach message editor

### Auth Pages (~6 components)
- `LoginCard` - Login card/form
- `RegisterCard` - Registration card/form
- `PasswordModal` - Password modal
- `AuthCarousel` - Auth page carousel
- `AuthDivider` - Auth divider (could be generic)
- `AuthFooterLink` - Auth footer link
- `AuthSocialLogin` - Social login buttons

### Reminders Feature (~2 components)
- `ReminderForm` - Reminder form
- `RecurringModal` - Recurring settings modal

### Other Domain-Specific (~15 components)
- `CanvasPanel` - Canvas panel (app-specific)
- `CollapsibleSection` - ⚠️ Could be primitive
- `ComponentLoader` - ⚠️ Could be primitive
- `ContentCard` - Content card (domain-specific)
- `ContentCardGrid` - Content card grid
- `ContentListView` - Content list view
- `ContentSection` - Content section (app page)
- `ContentTable` - Content table (app-specific)
- `ContentTablePagination` - Content pagination
- `DescriptorRenderer` - Descriptor renderer (domain)
- `DiscussionDropdown` - Discussion dropdown
- `ExtensionSlot` - Extension slot (plugin system)
- `FormSection` - Form section (app-specific)
- `KpiCard` - KPI card (domain-specific)
- `LanguageSelector` - Language selector
- `LearningModal` - Learning modal (onboarding)
- `NotificationBell` - Notification bell (app-specific)
- `NotificationsContainer` - Notifications container
- `PeriodControl` - Period/date range control (domain)
- `SearchableDropdown` - ⚠️ Could be primitive
- `StatsFilterModal` - Stats filter modal
- `SuggestionReviewTable` - Suggestion review (AI feature)
- `TCardActionMenu` - Card action menu (domain-specific)
- `TipsSection` - Tips section (onboarding)
- `TSectionHeader` - Section header (could be primitive)
- `TPageShell` - Page shell (layout - keep if generic)
- `UserDetail` - User detail display

---

## Summary

| Category | Count | Action |
|---|---|---|
| **True Primitives** | ~40 | Keep |
| **Needs Review** | ~10 | Evaluate for decoupling |
| **Page Components** | ~146 | Remove/move to app |

**Next Steps:**
1. Keep the ~40 true primitives
2. Review the 10 flagged components (TNavbar, TSidebar, TAvatar, etc.)
3. Remove all page components from the kit
4. Create migration guide for the consuming app
