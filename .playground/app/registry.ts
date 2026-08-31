// Central registry that drives the playground dashboard.
// - `components` is the auto-discovered list of every .vue component in the kit.
// - `demos` provides hand-tuned prop/slot configs for components that need
//   required props or specific demo data. Anything not listed falls back to a
//   generic renderer with sensible defaults.

import { markRaw } from 'vue';

// Auto-import every component so it can be referenced by name via <component :is>.
const modules = import.meta.glob('../../components/*.vue', { eager: true });

export interface ComponentMeta {
  name: string;
  // Raw component definition (eagerly imported).
  component: any;
}

export const components: ComponentMeta[] = Object.entries(modules)
  .map(([path, mod]: [string, any]) => {
    const name = path.split('/').pop()!.replace('.vue', '');
    return {
      name,
      component: markRaw(mod.default)
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export const componentNames = components.map((c) => c.name);

// Shared sample datasets so data-heavy tabs/charts render meaningfully.
const sampleBuckets = Array.from({ length: 30 }, (_, i) => ({
  date: `2026-07-${String(i + 1).padStart(2, '0')}`,
  expense: (i * 37) % 120,
  income: i % 5 === 0 ? (i * 31) % 400 : 0,
  net: ((i * 53) % 200) - 80,
  txCount: (i % 4) + 1
}));

const sampleCategories = [
  { id: 1, name: 'Food', type: 'expense', color: '#3b82f6', amount: 640, percentage: 40 },
  { id: 2, name: 'Transport', type: 'expense', color: '#f59e0b', amount: 320, percentage: 20 },
  { id: 3, name: 'Salary', type: 'income', color: '#10b981', amount: 3000, percentage: 100 }
];

export interface DemoConfig {
  props?: Record<string, any>;
}

// Hand-tuned prop configs keyed by component name.
// Components that need slot content are rendered as dedicated demos in
// DashboardMain via the `slottedComponents` set below.
export const slottedComponents = new Set([
  'TButton',
  'TInfoButton',
  'TCard',
  'TContainer',
  'TStack',
  'TGrid',
  'TSplit',
  'TPanel',
  'TPageShell',
  'TDropdown',
  'TTabs',
  'TModalBody',
  'TModalFooter',
  'TFormRow',
  'CollapsibleSection'
]);

export const demos: Record<string, DemoConfig> = {
  TButton: {},
  TCard: {
    props: { title: 'Card title' }
  },
  TInfoButton: {},
  TDivider: {},
  TContainer: {},
  TStack: {},
  TGrid: {},
  TSplit: {},
  TPanel: {
    props: { title: 'Panel' }
  },
  TPageShell: {
    props: { title: 'Page shell' }
  },
  TDropdown: {
    props: { text: 'Menu' }
  },
  TDropdownItem: {
    props: { text: 'Action' }
  },
  TTabs: {
    props: {
      'active-tab': 'first',
      tabs: [
        { id: 'first', label: 'First' },
        { id: 'second', label: 'Second' }
      ]
    }
  },
  TTopCard: {
    props: { pageName: 'wallet', pageNamePlural: 'wallets' }
  },
  TTransactionCard: {
    props: {
      statistics: {
        net: -42.5,
        count: 12,
        topCategory: 'Food',
        totalIncome: 3000,
        totalExpense: 2100
      },
      primaryCurrency: 'USD',
      formatCompactCurrency: (v, c) => `${Math.round(v)} ${c}`
    }
  },
  TTransactionsCardList: {
    props: {
      transactions: [
        { id: 1, name: 'Groceries', amount: -42.5, category: 'Food', date: '2026-07-18', party: 'Shop' },
        { id: 2, name: 'Salary', amount: 3000, category: 'Income', date: '2026-07-01', party: 'Employer' }
      ],
      formatShortAmount: (v) => `${Math.round(v)}`
    }
  },
  TTransactionSubCard: {
    props: { title: '48', text: 'Transactions' }
  },
  TTableComponent: {
    props: {
      transactions: [
        { id: 1, name: 'Groceries', amount: -42.5, category: 'Food', date: '2026-07-18' },
        { id: 2, name: 'Salary', amount: 3000, category: 'Income', date: '2026-07-01' }
      ],
      parseAmount: (v) => Number(v),
      getCurrencySymbol: (c) => '$',
      convertCurrency: (v) => v
    }
  },
  TFormField: {
    props: {
      label: 'Email address',
      hint: 'We will never share your email.',
      error: ''
    }
  },
  TFormRow: {},
  TListHeader: {
    props: { title: 'Recent transactions' }
  },
  TModalBody: {},
  TModalFooter: {},
  TModal: {
    props: {
      modelValue: true,
      title: 'Confirm action'
    }
  },
  TSectionHeader: {
    props: {
      eyebrow: 'Overview',
      title: 'Account summary',
      subtitle: 'Your financial snapshot'
    }
  },
  TTabList: {
    props: {
      tabs: [
        { id: 'overview', label: 'Overview' },
        { id: 'transactions', label: 'Transactions' },
        { id: 'budgets', label: 'Budgets' }
      ]
    }
  },
  TTabPanel: {
    props: {
      value: 'panel1',
      activeValue: 'panel1'
    }
  },
  EmptyState: {
    props: {
      title: 'No items',
      subtitle: 'There are no transactions to show yet.',
      pageName: 'transactions'
    }
  },
  TipsSection: {
    props: { title: 'Tips', pageName: 'transactions' }
  },
  ContentCard: {
    props: { icon: 'document', name: 'Content', pageName: 'wallets', description: 'A sample item' }
  },
  ContentSection: {
    props: { title: 'Section', pageName: 'budgets' }
  },
  ContentListView: {
    props: {
      entities: [
        { id: 1, name: 'Item one', description: 'Desc one' },
        { id: 2, name: 'Item two', description: 'Desc two' }
      ],
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' }
      ],
      pageName: 'wallet',
      pageNamePlural: 'wallets',
      labels: {
        allItems: 'All {items}',
        searchItems: 'Search {items}...',
        prev: 'Prev',
        next: 'Next',
        show: 'Show',
        perPage: 'per page',
        pageNamePlural: 'wallets'
      }
    }
  },
  ContentTable: {
    props: {
      entities: [
        { id: 1, name: 'Item one', description: 'Desc one' },
        { id: 2, name: 'Item two', description: 'Desc two' }
      ],
      pageName: 'wallet',
      pageNamePlural: 'wallets'
    }
  },
  ConfirmModal: {
    props: { title: 'Delete?', labels: { confirm: 'Yes', cancel: 'No' }, modelValue: true }
  },
  AuthDivider: {},
  Logo: {},
  GoogleIcon: {},
  SettingsDisplay: {
    props: {
      isDark: false,
      labels: { light: 'Light', dark: 'Dark', mode: 'Mode' }
    }
  },
  LoadingSkeleton: {},
  IconPicker: {},
  HamburgerMenu: {},
  KpiCard: {
    props: { label: 'Total balance', value: '$12,340' }
  },
  BudgetCard: {
    props: {
      budget: {
        id: 1,
        name: 'Groceries',
        amount: 400,
        currency: 'USD',
        period_type: 'monthly',
        start_date: '2026-07-01',
        progress: {
          percent_used: 62,
          net_spent: 248,
          effective_limit: 400,
          remaining: 152,
          refunds: 0,
          status: 'on_track',
          period_start: '2026-07-01'
        },
        targets: [
          { type: 'category', name: 'Food' },
          { type: 'wallet', name: 'Main wallet' }
        ]
      },
      labels: { edit: 'Edit', delete: 'Delete', allTransactionsInPeriod: 'All in period', of: 'of', remaining: 'Remaining', refundsAppliedThisPeriod: 'Refunds' }
    }
  },
  WalletCard: {
    props: {
      statistics: {
        totalBalance: 14000.5,
        income: 3000,
        expense: 2100,
        byWallet: [
          { id: 1, name: 'Main', balance: 4200.5, currency: 'USD' },
          { id: 2, name: 'Savings', balance: 9800, currency: 'USD' }
        ]
      },
      availableWallets: [
        { id: 1, name: 'Main', currency: 'USD' },
        { id: 2, name: 'Savings', currency: 'USD' }
      ]
    }
  },
  WalletListCard: {
    props: {
      wallet: { id: 1, name: 'Main wallet', balance: 4200.5, currency: 'USD' },
      isDefault: true
    }
  },
  PartyCard: {
    props: {
      party: {
        id: 1,
        name: 'Acme Ltd',
        type: 'business',
        received: 1200,
        spent: 450,
        lastActivity: '2026-07-15'
      }
    }
  },
  PartyCardList: {
    props: {
      parties: [
        {
          id: 1,
          name: 'Acme Ltd',
          type: 'business',
          received: 1200,
          spent: 450,
          lastActivity: '2026-07-15'
        },
        {
          id: 2,
          name: 'Globex',
          type: 'vendor',
          received: 0,
          spent: 800,
          lastActivity: '2026-07-10'
        }
      ]
    }
  },
  PartyDetailPanel: {
    props: {
      party: {
        id: 1,
        name: 'Acme Ltd',
        type: 'business',
        received: 1200,
        spent: 450
      },
      transactions: [
        { id: 1, name: 'Invoice', amount: -200, date: '2026-07-15' },
        { id: 2, name: 'Payment', amount: 1200, date: '2026-07-12' }
      ]
    }
  },
  WalletDetailPanel: {
    props: {
      wallet: { id: 1, name: 'Main wallet', balance: 4200.5, currency: 'USD' },
      transactions: [
        { id: 1, name: 'Groceries', amount: -42.5, date: '2026-07-18' },
        { id: 2, name: 'Salary', amount: 3000, date: '2026-07-01' }
      ]
    }
  },
  WalletsStatsStrip: {
    props: {
      wallets: [
        { id: 1, name: 'Main', balance: 4200.5, currency: 'USD', income: 3000, expense: 2100 },
        { id: 2, name: 'Savings', balance: 9800, currency: 'USD', income: 0, expense: 0 }
      ]
    }
  },
  PartiesStatsStrip: {
    props: {
      parties: [
        { id: 1, name: 'Acme Ltd', type: 'business', received: 1200, spent: 450 },
        { id: 2, name: 'Globex', type: 'vendor', received: 0, spent: 800 }
      ]
    }
  },
  CategoryBreakdown: {
    props: {
      statistics: {
        total: 1600,
        byCategory: [
          { category: 'Food', amount: 640, color: '#3b82f6' },
          { category: 'Transport', amount: 320, color: '#f59e0b' },
          { category: 'Housing', amount: 480, color: '#10b981' },
          { category: 'Fun', amount: 160, color: '#ef4444' }
        ]
      }
    }
  },
  CategoryDonut: {
    props: {
      data: [
        { name: 'Food', value: 640, color: '#3b82f6' },
        { name: 'Transport', value: 320, color: '#f59e0b' },
        { name: 'Housing', value: 480, color: '#10b981' },
        { name: 'Fun', value: 160, color: '#ef4444' }
      ],
      total: 1600
    }
  },
  CategoryRanking: {
    props: {
      buckets: [
        { category: 'Food', amount: 640, txCount: 24, percentage: 40, delta: 0.12 },
        { category: 'Housing', amount: 480, txCount: 1, percentage: 30, delta: 0 },
        { category: 'Transport', amount: 320, txCount: 12, percentage: 20, delta: -0.08 },
        { category: 'Fun', amount: 160, txCount: 6, percentage: 10, delta: 0.4 }
      ]
    }
  },
  SparkLine: {
    props: { values: [3, 5, 2, 8, 6, 9, 4, 7, 10, 6] }
  },
  DailyBarChart: {
    props: {
      data: [
        { date: '2026-07-01', expense: 42, txCount: 3 },
        { date: '2026-07-02', expense: 18, txCount: 1 },
        { date: '2026-07-03', expense: 75, txCount: 5 },
        { date: '2026-07-04', expense: 12, txCount: 1 },
        { date: '2026-07-05', expense: 64, txCount: 4 },
        { date: '2026-07-06', expense: 30, txCount: 2 },
        { date: '2026-07-07', expense: 90, txCount: 6 }
      ]
    }
  },
  CashflowLineChart: {
    props: {
      data: [
        { label: 'Jan', income: 3000, expense: 2100, net: 900 },
        { label: 'Feb', income: 3200, expense: 2400, net: 800 },
        { label: 'Mar', income: 2800, expense: 1900, net: 900 },
        { label: 'Apr', income: 3500, expense: 2600, net: 900 },
        { label: 'May', income: 3100, expense: 2200, net: 900 },
        { label: 'Jun', income: 3300, expense: 2500, net: 800 }
      ]
    }
  },
  CumulativeNetArea: {
    props: {
      data: [
        { label: 'Jan', cumulative: 900 },
        { label: 'Feb', cumulative: 1700 },
        { label: 'Mar', cumulative: 2600 },
        { label: 'Apr', cumulative: 3500 },
        { label: 'May', cumulative: 4400 },
        { label: 'Jun', cumulative: 5200 }
      ]
    }
  },
  CashflowHero: {
    props: {
      totals: { income: 3000, expense: 2100, net: 900, savingsRate: 0.3 },
      trailing: [
        { income: 2800, expense: 2000, net: 800 },
        { income: 3000, expense: 2100, net: 900 },
        { income: 3200, expense: 2300, net: 900 },
        { income: 2900, expense: 1900, net: 1000 },
        { income: 3100, expense: 2200, net: 900 },
        { income: 3300, expense: 2400, net: 900 }
      ]
    }
  },
  SankeyFlow: {
    props: {
      flow: {
        income: [
          { name: 'Salary', amount: 3200 },
          { name: 'Side gig', amount: 600 }
        ],
        expense: [
          { name: 'Rent', amount: 1200 },
          { name: 'Food', amount: 640 },
          { name: 'Transport', amount: 320 },
          { name: 'Savings', amount: 1640 }
        ]
      }
    }
  },
  CalendarHeatmap: {
    props: {
      buckets: Array.from({ length: 30 }, (_, i) => ({
        date: `2026-07-${String(i + 1).padStart(2, '0')}`,
        expense: (i * 37) % 120,
        net: ((i * 53) % 200) - 80
      }))
    }
  },
  FinancialRatios: {
    props: {
      totals: {
        income: 3000,
        expense: 2100,
        net: 900,
        savingsRate: 0.3,
        expenseRatio: 0.7,
        runwayMonths: 8
      }
    }
  },
  SearchInput: {
    props: { modelValue: '', placeholder: 'Search…' }
  },
  SearchableDropdown: {
    props: {
      options: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
      ]
    }
  },
  ViewToggle: {
    props: { modelValue: 'grid', options: ['grid', 'list'] }
  },
  LanguageSelector: {
    props: { modelValue: 'en', languages: [{ code: 'en', label: 'English' }] }
  },
  ThemeSelector: {
    props: {
      theme: 'light',
      isDark: false,
      isOpen: false,
      labels: { theme: 'Theme', light: 'Light', dark: 'Dark', system: 'System' }
    }
  },
  ThemeToggleButton: {},
  PeriodControl: {
    props: { modelValue: '2026-07' }
  },
  TransactionFilters: {
    props: {
      filters: { search: '', type: 'all' },
      labels: {
        close: 'Close',
        search: 'Search',
        type: 'Type',
        all: 'All',
        income: 'Income',
        expense: 'Expense',
        apply: 'Apply',
        clear: 'Clear'
      }
    }
  },
  NotableStrip: {
    props: {
      notable: {
        biggestExpense: { name: 'Rent', amount: 1200, date: '2026-07-01' },
        biggestSwing: { name: 'Groceries', delta: 0.4 },
        firstTimePayees: { names: ['New Cafe', 'Bookstore'] },
        noSpendStreak: 4,
        longestNoSpendStreak: { days: 4 }
      },
      labels: {
        biggestExpense: 'Biggest expense',
        noExpenses: 'No expenses',
        biggestSwing: 'Biggest swing',
        noComparableChanges: 'No changes',
        firstTimePayees: 'First-time payees',
        allFamiliarNames: 'All familiar',
        noSpendStreak: 'No-spend streak',
        days: 'days',
        everyDayHadSpending: 'Every day had spending'
      }
    }
  },
  QuickInsights: {
    props: {
      statistics: {
        net: 900,
        totalIncome: 3000,
        totalExpense: 2100,
        topCategory: 'Food',
        biggestSpender: 'Rent'
      }
    }
  },
  MonthInReview: {
    props: {
      open: true,
      data: {
        month: 'July',
        summary: 'Great month overall.',
        slides: [
          { kind: 'opening', tone: 'opening', title: 'July in review', body: 'A good month.' },
          { kind: 'stat', tone: 'positive', title: 'Saved', body: 'You saved $900.' }
        ]
      }
    }
  },
  ChatEmptyState: {},
  TypingDots: {},
  ChatMessageList: {
    props: {
      messages: [
        { id: 1, role: 'user', text: 'Hello' },
        { id: 2, role: 'assistant', text: 'Hi, how can I help?' }
      ]
    }
  },
  ChatComposer: {
    props: {
      modelValue: '',
      labels: {
        remove: 'Remove',
        attachFile: 'Attach a file',
        placeholder: 'Ask me anything about your finances...',
        send: 'Send',
        bank_statementLabel: 'Bank statement',
        bank_statementHint: 'Import transactions from a CSV or PDF',
        receiptLabel: 'Receipt',
        receiptHint: 'A photo or scan of a receipt',
        invoiceLabel: 'Invoice',
        invoiceHint: 'A bill or invoice document',
        photoLabel: 'Photo',
        photoHint: 'Any image from your device',
        documentLabel: 'Document',
        documentHint: 'CSV, PDF, spreadsheet or text file'
      }
    }
  },
  DiscussionDropdown: {
    props: {
      sessions: [
        { id: 1, title: 'Budget help', created_at: '2026-07-18', updated_at: '2026-07-18' },
        { id: 2, title: 'Spending review', created_at: '2026-07-15', updated_at: '2026-07-15' }
      ],
      currentId: 1,
      currentTitle: 'Budget help',
      labels: { newChat: 'New chat', noConversations: 'No conversations yet' }
    }
  },
  ChatCanvasBlock: {
    props: {
      block: {
        type: 'canvas',
        title: 'Monthly Report',
        blocks: [
          { type: 'kpi', title: 'Summary', items: [{ label: 'Net', value: 900, currency: 'USD' }] },
          { type: 'table', title: 'Top expenses', columns: ['name', 'amount'], rows: [{ name: 'Rent', amount: 1200 }] }
        ]
      },
      labels: { document: 'Document', sectionCount: '{count} sections', openInCanvas: 'Open in canvas' }
    }
  },
  ChatSidebar: {
    props: {
      sessions: [
        { id: 1, title: 'Budget help', preview: 'How do I…', updatedAt: '2026-07-18' },
        { id: 2, title: 'Spending review', preview: 'Last month', updatedAt: '2026-07-15' }
      ],
      currentSessionId: 1,
      isLoading: false
    }
  },
  ChatResultRenderer: {
    props: {
      result: {
        format_type: 'table',
        rows: [
          { name: 'Groceries', amount: -42.5, date: '2026-07-18' },
          { name: 'Salary', amount: 3000, date: '2026-07-01' }
        ]
      }
    }
  },
  AIChat: {
    props: {
      messages: [{ id: 1, role: 'assistant', text: 'How can I help?' }]
    }
  },
  LoginCard: {},
  RegisterCard: {},
  AuthCarousel: {
    props: {
      slides: [
        { title: 'Welcome', text: 'Manage money simply.' },
        { title: 'Insights', text: 'See where it goes.' }
      ]
    }
  },
  AuthFooterLink: {
    props: { text: 'Need help?', to: '#' }
  },
  DashboardOnboarding: {
    props: { steps: [{ title: 'Add wallet' }, { title: 'Add transaction' }] }
  },
  OnboardingEmptyState: {
    props: { pageType: 'wallets' }
  },
  LearningModal: {
    props: { open: true, title: 'Learn more' }
  },
  PasswordModal: {
    props: { open: true }
  },
  RecurringModal: {
    props: {
      isOpen: true,
      transaction: { id: 1, name: 'Groceries', amount: -42.5, date: '2026-07-18' }
    }
  },

  ImportSessionsList: {
    props: {
      sessions: [
        {
          id: 1,
          file_name: 'july_bank_statement.csv',
          status: 'confirmed',
          created_at: '2026-07-18T10:00:00Z',
          metadata: { total_suggestions: 24, duplicates_found: 2 }
        },
        {
          id: 2,
          file_name: 'utility_bill_june.pdf',
          status: 'analyzing',
          created_at: '2026-07-19T08:30:00Z'
        }
      ],
      labels: {
        recentImports: 'Recent imports',
        suggestions: 'suggestions',
        duplicates: 'duplicates',
        deleteImport: 'Delete import',
        needsReview: 'Needs review',
        analyzing: 'Analyzing',
        imported: 'Imported',
        failed: 'Failed',
        expired: 'Expired'
      }
    }
  },
  ImportUpload: {
    props: {
      isAnalyzing: false,
      labels: {
        showName: 'Show {name}',
        smartImport: 'Smart import',
        title: 'Bring your statements and receipts to life',
        subtitle: 'Drop a CSV, PDF, or photo. We extract the transactions, match wallets and categories, and let you review before saving.',
        dropzone: 'Drop your file here or click to browse',
        supportedFormats: 'Supports CSV, PDF, PNG, JPG, TIFF, BMP',
        remove: 'Remove',
        documentType: 'Document type',
        autoDetect: 'Auto-detect',
        bankStatement: 'Bank statement',
        receipt: 'Receipt',
        invoice: 'Invoice',
        payStub: 'Pay stub',
        utilityBill: 'Utility bill',
        analyzing: 'Analyzing...',
        analyzeDocument: 'Analyze document',
        csvLabel: 'Spreadsheet',
        csvFormat: 'CSV / XLSX',
        pdfLabel: 'Bank statement',
        pdfFormat: 'PDF document',
        imageLabel: 'Receipt photo',
        imageFormat: 'PNG · JPG · TIFF',
        receiptPhotoLabel: 'Paper receipt',
        receiptPhotoFormat: 'Scanned image'
      }
    }
  },
  ImportAnalyzing: {
    props: { progress: 60 }
  },
  ImportConfirmDialog: {
    props: {
      show: true,
      acceptedCount: 1,
      rejectedCount: 0,
      duplicatesInAccepted: 0,
      isConfirming: false,
      newWalletCount: 1,
      newPartyCount: 1,
      newCategoryCount: 2,
      missingWalletCount: 0,
      labels: {
        confirmImport: 'Confirm import',
        youAreAboutToImport: 'You are about to import {n} transactions.',
        mayBeDuplicates: 'Some may be duplicates.',
        suggestionsSkipped: 'Suggestions skipped: {n}',
        someTransactionsReference: 'Some reference missing wallets.',
        createNewWallets: 'Create {n} new wallets',
        createNewParties: 'Create {n} new parties',
        createNewCategories: 'Create {n} new categories'
      }
    }
  },
  BudgetForm: {
    props: {
      modelValue: { name: 'Groceries', limit: 400 },
      labels: {
        editBudget: 'Edit budget',
        createBudget: 'Create budget',
        budgetName: 'Name',
        spendingLimit: 'Limit',
        addWalletFirst: 'Add a wallet first',
        budgetPeriod: 'Period',
        weekly: 'Weekly',
        monthly: 'Monthly',
        yearly: 'Yearly',
        customRange: 'Custom',
        startDate: 'Start',
        endDate: 'End',
        budgetDescription: 'Description',
        budgetTargets: 'Targets',
        budgetTargetsHint: 'Pick targets',
        targetTabs: { category: 'Category', group: 'Group', wallet: 'Wallet' },
        noItemsToChoose: 'None',
        rolloverUnused: 'Rollover',
        rolloverHint: 'Carry over',
        alertThreshold: 'Alert',
        off: 'Off',
        alertThresholdHint: 'Warn me',
        forecastAlerts: 'Forecast',
        forecastAlertsHint: 'Predict',
        active: 'Active',
        cancel: 'Cancel',
        updateBudget: 'Update'
      }
    }
  },
  CategoryForm: {
    props: { pageName: 'Category', modelValue: { name: '', type: 'expense' } }
  },
  GroupForm: {
    props: { modelValue: { name: '' } }
  },
  PartiesForm: {
    props: { modelValue: { name: '', type: 'customer' } }
  },
  ReminderForm: {
    props: { modelValue: { note: '' } }
  },
  WalletForm: {
    props: {
      modelValue: { name: 'Main', balance: 0, type: 'bank' },
      labels: {
        editWallet: 'Edit wallet',
        createWallet: 'Create wallet',
        walletName: 'Name',
        walletNamePlaceholder: 'My wallet',
        walletNameRequired: 'Name is required',
        chooseIcon: 'Choose icon',
        walletType: 'Type',
        selectWalletType: 'Select type',
        bankAccount: 'Bank',
        cash: 'Cash',
        creditCard: 'Card',
        currency: 'Currency',
        initialBalance: 'Balance',
        cancel: 'Cancel',
        save: 'Save'
      },
      defaults: { currency: 'USD' }
    }
  },
  TransferForm: {
    props: { modelValue: { amount: 0 } }
  },
  TransferFormContainer: {
    props: { modelValue: { amount: 0 } }
  },
  CalendarTab: {
    props: { modelValue: '2026-07-18', buckets: sampleBuckets }
  },
  CategoriesTab: {
    props: {
      incomeCategories: sampleCategories.filter((c) => c.type === 'income'),
      expenseCategories: sampleCategories.filter((c) => c.type === 'expense')
    }
  },
  ChartsTab: {
    props: {
      monthlyBuckets: sampleBuckets,
      dailyBuckets: sampleBuckets,
      incomeCategories: sampleCategories.filter((c) => c.type === 'income'),
      expenseCategories: sampleCategories.filter((c) => c.type === 'expense')
    }
  },
  FlowTab: {
    props: {
      flow: {
        sources: [
          { name: 'Salary', amount: 3200 },
          { name: 'Side gig', amount: 600 }
        ],
        sinks: [
          { name: 'Rent', amount: 1200 },
          { name: 'Food', amount: 640 },
          { name: 'Transport', amount: 320 },
          { name: 'Savings', amount: 1640 }
        ]
      }
    }
  },
  ReportsTabs: {
    props: {
      modelValue: 'overview',
      tabs: [
        { id: 'overview', label: 'Overview' },
        { id: 'charts', label: 'Charts' }
      ]
    }
  },
  CollapsibleSection: {
    props: { title: 'Section' }
  },
  ContentCardGrid: {
    props: {
      entities: [
        { id: 1, name: 'Wallet', description: 'A wallet', pageName: 'wallets' },
        { id: 2, name: 'Budget', description: 'A budget', pageName: 'budgets' }
      ]
    }
  },
  ReportsEmpty: {
    props: { title: 'No reports', pageName: 'reports' }
  },
  SuggestionReviewTable: {
    props: {
      suggestions: [
        {
          id: 1,
          date: '2026-07-18',
          description: 'Groceries',
          amount: -42.5,
          type: 'expense',
          partyName: 'Shop',
          categoryName: 'Food',
          walletName: 'Main',
          confidence: 0.9
        }
      ],
      wallets: [{ id: 1, name: 'Main' }],
      categories: [{ id: 1, name: 'Food' }],
      parties: [{ id: 1, name: 'Shop' }],
      acceptedCount: 1,
      rejectedCount: 0,
      pendingCount: 1,
      labels: {
        acceptAll: 'Accept all',
        rejectAll: 'Reject all',
        summary: 'Review',
        date: 'Date',
        description: 'Description',
        amount: 'Amount',
        type: 'Type',
        party: 'Party',
        category: 'Category',
        wallet: 'Wallet',
        confidence: 'Confidence'
      }
    }
  },
  ChatProgressSteps: {
    props: { steps: ['Analyzing transactions', 'Building summary', 'Done'] }
  },
  ChatCalloutBlock: {
    props: { title: 'Heads up', text: 'This is an informational callout.', variant: 'info' }
  },
  ChatChartBlock: {
    props: {
      title: 'Spending by category',
      chart_hint: 'donut',
      data: [
        { category: 'Food', amount: 640 },
        { category: 'Transport', amount: 320 },
        { category: 'Housing', amount: 480 }
      ]
    }
  },
  ChatComparisonBlock: {
    props: {
      title: 'July vs June',
      series: [
        { heading: 'July', income: 3000, expense: 2100, net: 900 },
        { heading: 'June', income: 2800, expense: 2000, net: 800 }
      ]
    }
  },
  ChatKpiBlock: {
    props: {
      title: 'Key metrics',
      items: [
        { label: 'Net worth', value: 12340, currency: 'USD', delta_percent: 5.2, trend: 'up' },
        { label: 'Savings rate', value: '30%', delta_percent: 0, trend: 'flat' }
      ]
    }
  },
  ChatListBlock: {
    props: {
      title: 'Recent transactions',
      items: [
        { name: 'Groceries', amount: -42.5, currency: 'USD', category: 'Food', date: '2026-07-18' },
        { name: 'Salary', amount: 3000, currency: 'USD', category: 'Income', date: '2026-07-01' }
      ]
    }
  },
  ChatProgressBlock: {
    props: {
      title: 'Budget usage',
      items: [
        { label: 'Food', current: 640, target: 800, currency: 'USD' },
        { label: 'Transport', current: 320, target: 400, currency: 'USD' }
      ]
    }
  },
  ChatQuestionBlock: {
    props: {
      prompt: 'What would you like to do?',
      options: [
        { label: 'View report', message: 'show report' },
        { label: 'Add transaction', message: 'add tx' }
      ]
    }
  },
  ChatQuickActionsBlock: {
    props: {
      actions: [
        { label: 'Show spending by category' },
        { label: 'Compare this month to last' },
        { label: 'Export CSV' }
      ]
    }
  },
  ChatTableBlock: {
    props: {
      title: 'Transaction details',
      columns: ['name', 'amount', 'date'],
      rows: [
        { name: 'Groceries', amount: -42.5, date: '2026-07-18' },
        { name: 'Salary', amount: 3000, date: '2026-07-01' }
      ]
    }
  },
  ChatTimelineBlock: {
    props: {
      title: 'Recent activity',
      items: [
        { title: 'Groceries', amount: -42.5, currency: 'USD', date: '2026-07-18', description: 'Weekly shopping' },
        { title: 'Salary', amount: 3000, currency: 'USD', date: '2026-07-01', description: 'Monthly salary' }
      ]
    }
  },
  MonthInReviewHeader: {
    props: {
      slides: [{ kind: 'opening', tone: 'opening', headline: 'July recap' }],
      currentIndex: 0,
      labels: { close: 'Close', prev: 'Prev', next: 'Next', pause: 'Pause' },
      monthLabel: 'July 2026'
    }
  },
  MonthInReviewFooter: {
    props: {
      slides: [{ kind: 'opening', tone: 'opening' }],
      currentIndex: 0,
      labels: { prev: 'Prev', next: 'Next', pause: 'Pause' },
      data: { monthLabel: 'July 2026' }
    }
  },
  MonthInReviewSlide: {
    props: {
      slides: [{ kind: 'opening', tone: 'opening', eyebrow: 'Recap', headline: 'A stellar month', detail: 'Here is your recap' }],
      currentIndex: 0,
      currentSlide: { kind: 'opening', tone: 'opening', eyebrow: 'Recap', headline: 'A stellar month', detail: 'Here is your recap' },
      animatedValue: 100,
      currency: 'USD',
      formatter: (n) => `$${Math.round(n)}`,
      labels: {}
    }
  },
  OutreachComposerAudience: {
    props: {
      selectedSegment: 'all',
      segments: [{ id: 'all', label: 'All users' }, { id: 'active', label: 'Active users' }]
    }
  },
  OutreachComposerMessage: {
    props: {
      subject: 'Monthly Newsletter',
      body: 'Hello team!'
    }
  },
  TSidebarRail: {
    props: {
      activeTab: 'dashboard',
      items: [{ id: 'dashboard', label: 'Dashboard', icon: 'home' }]
    }
  },
  TSidebarSub: {
    props: {
      title: 'Menu',
      items: [{ id: 'overview', label: 'Overview' }]
    }
  },
  // --- Phase 6: additional playground coverage (10 missing demos) ---
  ImportUploadDropzone: {
    props: {
      isDragging: false,
      labels: {
        dropzone: 'Drop your file here or click to browse',
        supportedFormats: 'Supports CSV, PDF, PNG, JPG, TIFF, BMP'
      }
    }
  },
  ImportUploadFileList: {
    props: {
      files: [
        { name: 'bank-statement.csv', size: 24576 },
        { name: 'receipt.jpg', size: 102400 }
      ],
      labels: { remove: 'Remove' }
    }
  },
  MonthInReviewIllustration: {
    props: {
      kind: 'opening',
      confettiDots: []
    }
  },
  TSidebar: {
    props: {
      currentPath: '/dashboard',
      isSidebarOpen: false,
      isMobile: false,
      collapsed: false
    }
  },
  OutreachComposer: {
    props: {
      users: [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com' }
      ],
      previewHtml: '<div style="padding:12px;font-family:sans-serif"><h2>Hello {{first_name}}!</h2><p>Welcome to Trakli — your monthly summary is ready.</p></div>',
      sending: false,
      imageUploading: false
    }
  },
  TForm: {
    props: {
      title: 'Demo form',
      submitLabel: 'Save',
      cancelLabel: 'Cancel',
      showClose: true,
      showCancel: true,
      isSubmitting: false,
      apiError: ''
    }
  },
  ContentTablePagination: {
    props: {
      currentPage: 2,
      totalPages: 5,
      perPage: 10,
      previousPageLabel: 'Previous page',
      nextPageLabel: 'Next page',
      showLabel: 'Show',
      perPageLabel: 'per page'
    }
  },
  TTab: {
    props: {
      value: 'overview',
      label: 'Overview',
      active: true,
      variant: 'pill'
    }
  },
  TFilterToggle: {
    props: {
      activeCount: 2,
      label: 'Filters'
    }
  },
  TransactionFormParties: {
    props: {
      parties: [
        { id: 1, name: 'Acme Ltd', label: 'Acme Ltd', value: 1 },
        { id: 2, name: 'Globex Corp', label: 'Globex Corp', value: 2 }
      ],
      wallets: [
        { id: 10, name: 'Main Wallet', label: 'Main Wallet', value: 10 },
        { id: 11, name: 'Savings', label: 'Savings', value: 11 }
      ],
      filteredWallets: [
        { id: 10, name: 'Main Wallet', label: 'Main Wallet', value: 10 },
        { id: 11, name: 'Savings', label: 'Savings', value: 11 }
      ],
      searchQuery: '',
      walletSearchQuery: '',
      labels: {
        partySentTo: 'Sent to',
        partyReceivedFrom: 'Received from',
        searchParty: 'Search parties…',
        searchWallet: 'Search wallets…',
        walletSentFrom: 'Wallet sent from',
        walletReceivedTo: 'Wallet received to',
        walletError: 'Select a wallet',
        default: 'Default',
        defaultWallet: 'Default wallet'
      },
      isOutcomeSelected: true,
      walletError: false,
      isWalletDefault: false
    }
  },
  TransactionFormAttachments: {
    props: {
      existingAttachments: [
        { id: 1, path: 'receipt.jpg' },
        { id: 2, path: 'invoice.pdf' }
      ],
      existingPreviews: {},
      removingFileIds: new Set(),
      newAttachments: [],
      inputId: 'file-input',
      labels: {
        attachment: 'Attachment',
        remove: 'Remove',
        browseFiles: 'Browse files',
        fileHint: 'Up to 5 files, images or PDFs'
      }
    }
  },
  OnboardingWizard: {},
  TransactionsSpreadsheetToolbar: {
    props: {
      labels: {
        title: 'Transactions spreadsheet',
        rowCount: '{count} rows',
        loadingMore: 'loading…',
        searchPlaceholder: 'Search rows...',
        exportCsv: 'Export CSV',
        close: 'Close',
        addRow: 'Add row',
        deleteSelected: 'Delete selected'
      },
      rowCount: 2,
      isStreaming: false,
      searchValue: '',
      hasSelection: false,
      exportDisabled: false
    }
  },
  TransactionsSpreadsheetEditor: {
    props: {
      editingRow: {
        id: 1,
        datetime: '2026-07-18T10:00:00.000Z',
        type: 'expense',
        amount: 42.5,
        description: 'Groceries',
        categories: [{ name: 'Food' }],
        wallet: { currency: 'USD', name: 'Main' }
      },
      labels: {
        dateCol: 'Date',
        amountCol: 'Amount',
        descCol: 'Description',
        catCol: 'Categories',
        walletCol: 'Wallet',
        save: 'Save',
        cancel: 'Cancel',
        searchPlaceholder: 'Search...'
      },
      currencies: ['USD', 'EUR', 'GBP']
    }
  },
  TransactionFormGroups: {
    props: {
      groups: [
        { id: 1, name: 'General', label: 'General', value: 1 },
        { id: 2, name: 'Work', label: 'Work', value: 2 }
      ],
      categories: [
        { id: 10, name: 'Food', label: 'Food', value: 10 },
        { id: 11, name: 'Transport', label: 'Transport', value: 11 }
      ],
      groupSearchQuery: '',
      categorySearchQuery: '',
      selectedGroupId: 1,
      selectedAdditionalCategoryIds: [10],
      labels: {
        group: 'Group',
        groupError: 'Group required',
        searchGroup: 'Search groups…',
        categories: 'Categories',
        searchCategories: 'Search categories…',
        defaultGroup: 'Default group',
        default: 'Default'
      },
      categoryError: false,
      isGroupDefault: false
    }
  },
  TransactionFormRecurring: {
    props: {
      modelValue: true,
      period: 'monthly',
      interval: 1,
      endsAt: '2026-12-31',
      labels: {
        makeRecurring: 'Make recurring',
        recurrencePeriod: 'Recurrence period',
        repeatEvery: 'Repeat every',
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        yearly: 'Yearly',
        endDate: 'End date',
        optional: 'optional'
      }
    }
  },
  TransactionsSpreadsheet: {
    props: {
      rows: [
        { id: 1, datetime: '2026-07-18T10:00:00.000Z', type: 'expense', amount: 42.5, description: 'Groceries', categories: [{ name: 'Food' }], wallet: { name: 'Main', currency: 'USD' }, party: { name: 'Shop' } },
        { id: 2, datetime: '2026-07-01T09:00:00.000Z', type: 'income', amount: 3000, description: 'Salary', categories: [{ name: 'Income' }], wallet: { name: 'Main', currency: 'USD' }, party: { name: 'Employer' } }
      ],
      isLoading: false,
      isStreaming: false,
      error: '',
      labels: {
        title: 'Transactions spreadsheet',
        rowCount: '{count} rows',
        loadingMore: 'loading…',
        searchPlaceholder: 'Search rows...',
        exportCsv: 'Export CSV',
        close: 'Close',
        loadingTransactions: 'Loading transactions...',
        dateCol: 'Date',
        typeCol: 'Type',
        amountCol: 'Amount',
        currencyCol: 'Currency',
        descCol: 'Description',
        catCol: 'Categories',
        walletCol: 'Wallet',
        partyCol: 'Party',
        markedAsRefund: 'Marked as refund',
        refund: 'refund',
        totals: 'Totals',
        income: 'Income',
        expenses: 'Expenses',
        net: 'Net',
        addRow: 'Add row',
        deleteSelected: 'Delete selected',
        save: 'Save',
        cancel: 'Cancel'
      }
    }
  },
  TransactionForm: {
    props: {
      isOutcomeSelected: true,
      parties: [
        { id: 1, name: 'Acme Ltd' },
        { id: 2, name: 'Globex Corp' }
      ],
      wallets: [
        { id: 10, name: 'Main Wallet', currency: 'USD' },
        { id: 11, name: 'Savings', currency: 'USD' }
      ],
      groups: [
        { id: 1, name: 'General' },
        { id: 2, name: 'Work' }
      ],
      categories: [
        { id: 10, name: 'Food' },
        { id: 11, name: 'Transport' }
      ],
      defaultWalletId: 10,
      defaultGroupId: 1,
      defaultCurrency: 'USD',
      recentExpenses: []
    }
  },
  TransactionFormContainer: {
    props: {}
  },
  TransactionFormSection: {
    props: { pageName: 'Transaction' }
  },
  TransactionFormIntent: {
    props: {
      modelValue: 'regular',
      options: [
        { value: 'regular', label: 'Regular', side: 'both' },
        { value: 'loan_received', label: 'Loan received', side: 'income' },
        { value: 'gift', label: 'Gift', side: 'both' }
      ],
      label: 'Intent',
      labels: { intentLabels: { regular: 'Regular', loan_received: 'Loan received', gift: 'Gift' } }
    }
  },
  TransactionsContentSection: {
    props: {
      transactions: [
        { id: 1, name: 'Groceries', amount: -42.5, category: 'Food', date: '2026-07-18', party: 'Shop' },
        { id: 2, name: 'Salary', amount: 3000, category: 'Income', date: '2026-07-01', party: 'Employer' }
      ],
      totals: { income: 3000, expenses: 42.5, net: 2957.5 },
      currentPage: 1,
      totalPages: 1,
      totalItems: 2,
      perPage: 20,
      activeFilterCount: 0,
      searchQuery: '',
      isLoading: false,
      pageName: 'Transaction',
      pageNamePlural: 'Transactions',
      labels: {
        income: 'Income',
        expenses: 'Expenses',
        net: 'Net',
        spreadsheetMode: 'Spreadsheet mode',
        openSpreadsheetView: 'Open spreadsheet view',
        noResultsFound: 'No results found',
        noResultsText: 'No transactions match your current filters.',
        clearAllFilters: 'Clear all filters'
      }
    }
  },
  // --- Batch 3: next 22 missing demos ---
  AuthSocialLogin: {
    props: {
      mode: 'login',
      labels: { signInWithGoogle: 'Sign in with Google', signUpWithGoogle: 'Sign up with Google' }
    }
  },
  CanvasPanel: {
    props: {
      canvas: {
        blocks: [
          { type: 'kpi', title: 'Overview', items: [{ label: 'Net', value: 900, currency: 'USD', trend: 'up' }] },
          { type: 'table', title: 'Top expenses', columns: ['name', 'amount'], rows: [{ name: 'Rent', amount: 1200 }] }
        ]
      },
      sessionId: 1,
      messageId: 1,
      labels: {
        eyebrow: 'Canvas',
        defaultTitle: 'Document',
        downloadMarkdown: 'Download as Markdown',
        printPdf: 'Print / Save as PDF',
        close: 'Close'
      }
    }
  },
  CategoryDrillModal: {
    props: {
      open: true,
      bucket: { name: 'Food', count: 24, amount: 640, delta: 0.12, trend: [20, 40, 30, 50, 60, 40], color: '#3b82f6' },
      transactions: [
        { id: 1, name: 'Groceries', amount: -42.5, date: '2026-07-18' },
        { id: 2, name: 'Restaurant', amount: -28, date: '2026-07-17' }
      ],
      trailingMonths: [
        { label: 'Jun', amount: 540 },
        { label: 'Jul', amount: 640 }
      ],
      currency: 'USD',
      formatter: (n) => `$${Math.round(n)}`,
      labels: {
        periodOverview: 'Period overview · {n} transactions',
        close: 'Close',
        total: 'Total',
        avgPerMonth: 'Avg / month',
        peakMonth: 'Peak month',
        vsPriorPeriod: 'vs prior period',
        trendLast6Months: 'Trend (last 6 months)',
        topKind: 'Top {kind}',
        sources: 'sources',
        payees: 'payees',
        noTransactionsMatch: 'No transactions match.',
        transactions: 'Transactions',
        showMore: 'Show {n} more'
      }
    }
  },
  ChatExperience: {
    props: {
      mode: 'landing',
      sessions: [
        { id: 1, title: 'Budget help', created_at: '2026-07-18', updated_at: '2026-07-18' },
        { id: 2, title: 'Spending review', created_at: '2026-07-15', updated_at: '2026-07-15' }
      ],
      currentSessionId: 1,
      currentTitle: 'Budget help',
      messages: [
        { id: 1, role: 'assistant', text: 'How can I help?' },
        { id: 2, role: 'user', text: 'Show my spending' }
      ],
      isLoadingSessions: false,
      isSending: false,
      modelValue: '',
      openCanvas: null,
      canvasMessageId: null,
      suggestions: [{ id: 1, label: 'Show spending by category' }],
      labels: {
        heroTitle: 'What can I help with?',
        heroSubtitle: 'Ask about your money, log a transaction, or import a statement.',
        toggleHistory: 'Toggle history',
        newChat: 'New chat',
        assistant: 'Assistant',
        fullscreen: 'Full screen',
        exitFullscreen: 'Exit full screen',
        canvas: {}
      }
    }
  },
  ChatImportReviewBlock: {
    props: {
      block: { file_name: 'july.csv', total: 24 },
      status: 'ready',
      labels: {
        document: 'Document',
        reviewImport: 'Review import',
        analyzing: 'Analyzing document…',
        ready: 'Ready to review',
        confirmed: 'Imported',
        failed: 'Import failed',
        expired: 'Import expired',
        unavailable: 'Import unavailable'
      }
    }
  },
  ChatLandingInsights: {
    props: {
      loading: false,
      income: 3000,
      expenses: 2100,
      savingsRate: 0.3,
      txCount: 48,
      avgExpense: 42.5,
      biggestExpense: 'Rent',
      topCategory: { name: 'Food', pct: 40 },
      topCategories: [
        { name: 'Food', amount: 640 },
        { name: 'Transport', amount: 320 }
      ],
      trend: [2000, 2100, 1900, 2300, 3000, 2100],
      spotlights: [
        { title: 'Food up 12%', detail: 'vs last month' }
      ],
      formatMoneyFn: (v) => `$${Math.round(v)}`,
      labels: {
        emptyHint: "Add a few transactions and I'll start spotting trends for you.",
        askAboutThis: 'Ask about this',
        netFlow: 'Net flow',
        saved: 'Saved',
        topCategory: 'Top category',
        cashflowTrend: 'Cashflow trend',
        transactions: 'Transactions',
        avgExpense: 'Avg expense',
        biggestExpense: 'Biggest expense',
        inLabel: 'In'
      }
    }
  },
  ChatMarkdownBlock: {
    props: { text: '# Hello\n\nThis is **markdown** with a [link](https://example.com) and a list:\n\n- Item one\n- Item two\n' }
  },
  ChatProposedActionBlock: {
    props: {
      block: {
        summary: 'Create expense transaction',
        risk: 'low',
        status: 'pending',
        fields: [
          { key: 'amount', label: 'Amount', type: 'number', value: 42.5 },
          { key: 'description', label: 'Description', type: 'text', value: 'Groceries' },
          { key: 'datetime', label: 'Date', type: 'datetime', value: '2026-07-18T10:00' }
        ]
      },
      wallets: [{ id: 1, name: 'Main' }],
      categories: [{ id: 1, name: 'Food' }],
      parties: [{ id: 1, name: 'Shop' }],
      busy: false,
      labels: {
        none: 'None',
        working: 'Working…',
        confirm: 'Confirm',
        dismiss: 'Dismiss',
        done: 'Done',
        dismissed: 'Dismissed'
      }
    }
  },
  ComponentLoader: {
    props: {
      isLoading: false,
      error: null,
      hasData: true,
      showEmpty: true,
      emptyStateName: 'items',
      skeletonVariant: 'default',
      skeletonCount: 3,
      skeletonColumns: 4,
      labels: { retry: 'Retry', empty: 'No items' }
    }
  },
  DashboardAgentHero: {
    props: {
      name: 'Alex',
      labels: {
        dismiss: 'Dismiss',
        greeting: 'Hey {name}',
        defaultName: 'there',
        subtitle: "Tell me what you want and I'll do it.",
        placeholder: 'e.g. log 12 for lunch, or build me a report',
        send: 'Send',
        logTransaction: 'Log a transaction',
        transferMoney: 'Transfer money',
        buildReport: 'Build a report',
        importDocument: 'Import a document'
      }
    }
  },
  DashboardKPIs: {
    props: {
      statistics: { total_balance: 12340, total_income: 3000, total_expenses: 2100 },
      currency: 'USD',
      isCustomActive: false,
      activeFilterChips: [],
      labels: {
        balance: 'Balance',
        income: 'Income',
        expenses: 'Expenses',
        net: 'Net',
        clearAll: 'Clear all'
      }
    }
  },
  DashboardQuickActionModal: {
    props: {
      action: 'log',
      wallets: [
        { id: 1, name: 'Main', currency: 'USD' },
        { id: 2, name: 'Savings', currency: 'USD' }
      ],
      parties: [
        { id: 1, name: 'Acme Ltd' },
        { id: 2, name: 'Globex' }
      ],
      busy: false,
      labels: {
        close: 'Close',
        expense: 'Expense',
        income: 'Income',
        amount: 'Amount',
        whatFor: 'What for?',
        coffeePlaceholder: 'e.g. coffee',
        wallet: 'Wallet',
        optional: 'optional',
        defaultOption: 'Default',
        party: 'Party',
        noneOption: 'None',
        when: 'When',
        fromWallet: 'From wallet',
        toWallet: 'To wallet',
        selectWallet: 'Select a wallet',
        exchangeRate: 'Exchange rate',
        period: 'Period',
        thisMonth: 'This month',
        lastMonth: 'Last month',
        thisYear: 'This year',
        focus: 'Focus',
        focusPlaceholder: 'e.g. dining, subscriptions',
        document: 'Document',
        chooseFile: 'Choose a file'
      }
    }
  },
  DashboardWalletSelector: {
    props: {
      selectedWalletId: null,
      wallets: [
        { id: 1, name: 'Main Wallet' },
        { id: 2, name: 'Savings' }
      ],
      allWalletsLabel: 'All Wallets'
    }
  },
  DescriptorRenderer: {
    props: {
      contribution: {
        key: 'demo-integration',
        slot: 'dashboard.widgets',
        configured: true,
        integration: {
          key: 'demo',
          name: 'Demo Integration',
          description: 'An example integration card.',
          icon: 'Puzzle',
          configured: true
        },
        ui: {
          slots: ['dashboard.widgets'],
          card: { title: 'Demo Integration', description: 'An example integration card.', cta: 'Open', href: '#' },
          onboarding: null,
          component: null
        }
      },
      needsSetupLabel: 'Needs setup'
    }
  },
  ExtensionSlot: {
    props: {
      contributions: [
        {
          key: 'demo-integration',
          slot: 'dashboard.widgets',
          configured: true,
          integration: {
            key: 'demo',
            name: 'Demo Integration',
            description: 'An example integration card.',
            icon: 'Puzzle',
            configured: true
          },
          ui: {
            slots: ['dashboard.widgets'],
            card: { title: 'Demo Integration', description: 'An example integration card.', cta: 'Open', href: '#' },
            onboarding: null,
            component: null
          }
        }
      ]
    }
  },
  FinancialPositionDrill: {
    props: {
      open: true,
      group: {
        label: 'Earned income',
        eyebrow: 'Money in',
        tone: 'income',
        metric: '$3,200',
        hint: 'Regular salary and side gig.',
        intents: ['regular'],
        icon: null
      },
      rows: [
        { id: 1, title: 'Salary', meta: '2026-07-01', amount: '3,000 USD', amountNum: 3000, type: 'income', intent: 'regular', currency: 'USD' },
        { id: 2, title: 'Side gig', meta: '2026-07-15', amount: '200 USD', amountNum: 200, type: 'income', intent: 'regular', currency: 'USD' }
      ],
      isLoading: false,
      labels: {
        close: 'Close',
        noTransactions: 'No transactions for this in the selected period.',
        nTransactions: '{n} transactions'
      },
      formatAmountFn: (amount, currency) => `${amount} ${currency}`
    }
  },
  FinancialPositionHero: {
    props: {
      position: {
        net_worth_delta: 900,
        total_net_worth: 52340,
        cash_balance: 12340,
        holdings_value: 40000
      },
      currency: 'USD',
      totalIn: 3800,
      totalOut: 2100,
      labels: {
        netWorthChange: 'Net worth change',
        building: 'Building',
        shrinking: 'Shrinking',
        heroSub: 'Real earnings minus real spend.',
        moneyIn: 'Money in',
        moneyOut: 'Money out',
        totalNetWorthNow: 'Total net worth now',
        cash: 'Cash',
        holdings: 'Holdings'
      }
    }
  },
  FinancialPositionView: {
    props: {
      position: {
        net_worth_delta: 900,
        total_net_worth: 52340,
        cash_balance: 12340,
        holdings_value: 40000,
        earned_income: 3200,
        investment_returns: 400,
        gifts_received: 200,
        loan_received: 0,
        debt_owed: 0,
        discretionary_spend: 2100,
        investment_principal: 500,
        loan_repayment: 0,
        debt_settled: 0
      },
      currency: 'USD',
      partial: false,
      unconvertedCurrencies: [],
      isLoading: false,
      activePreset: 'current_month',
      presets: [
        { value: 'current_month', label: 'This month' },
        { value: 'last_3_months', label: 'Last 3 months' },
        { value: 'all_time', label: 'All time' }
      ],
      labels: {
        title: 'Financial position',
        subtitle: 'Where your money came from and where it went.',
        partialNote: 'Some amounts could not be converted: {currencies}.',
        netWorthChange: 'Net worth change',
        building: 'Building',
        shrinking: 'Shrinking',
        heroSub: 'Real earnings minus real spend.',
        moneyIn: 'Money in',
        moneyOut: 'Money out',
        totalNetWorthNow: 'Total net worth now',
        cash: 'Cash',
        holdings: 'Holdings',
        cashNotNetWorth: 'cash, not net worth',
        footNote: 'Greyed rows move cash but not net worth.',
        noDataForPeriod: 'No data for this period yet.',
        presetLabels: { current_month: 'This month', last_3_months: 'Last 3 months', all_time: 'All time' },
        rowLabels: {
          earned: 'Earned income',
          returns: 'Investment returns',
          gift: 'Gifts received',
          loan_in: 'Loan received',
          debt_in: 'Debt repaid to you',
          spend: 'Discretionary spend',
          invested: 'Invested',
          loan_out: 'Loan repayment',
          debt_out: 'Debt settled'
        }
      }
    }
  },
  FormSection: {
    props: {
      editingItem: null,
      isSubmitting: false,
      labels: { expense: 'Expense', income: 'Income', transfer: 'Transfer' }
    }
  },
  HoldingForm: {
    props: {
      open: true,
      editing: null,
      submitting: false,
      defaultCurrency: 'USD',
      currencies: [{ code: 'USD' }, { code: 'EUR' }, { code: 'GBP' }],
      searchResults: [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' }
      ],
      labels: {
        editHolding: 'Edit holding',
        addHolding: 'Add holding',
        close: 'Close',
        cancel: 'Cancel',
        priceSource: 'Price source',
        live: 'Live',
        manual: 'Manual',
        coin: 'Coin',
        searchCoin: 'Search Bitcoin, Ethereum...',
        pricedAutomatically: 'Priced automatically from provider',
        name: 'Name',
        namePlaceholder: 'Bitcoin, Apple, Rental flat...',
        symbol: 'Symbol',
        optional: 'optional',
        quantity: 'Quantity',
        currency: 'Currency',
        pricePerUnit: 'Price per unit',
        saveChanges: 'Save changes',
        nameRequired: 'Name is required.',
        quantityRequired: 'Enter a quantity greater than 0.',
        coinRequired: 'Pick a coin to price it automatically.'
      }
    }
  },
  NotificationBell: {
    props: {
      notifications: [
        { id: 1, title: 'New transaction', body: 'Groceries -42.5 USD', read: false, created_at: '2026-07-18T10:00:00Z' },
        { id: 2, title: 'Budget alert', body: 'Food 80% used', read: true, created_at: '2026-07-17T10:00:00Z' }
      ],
      unreadCount: 1,
      loading: false,
      labels: {
        notifications: 'Notifications',
        markAllRead: 'Mark all read',
        loading: 'Loading...',
        noNotifications: 'No notifications yet',
        markAsRead: 'Mark as read',
        viewAllNotifications: 'View all notifications',
        justNow: 'Just now',
        minAgo: '{n} min ago',
        hAgo: '{n}h ago',
        dAgo: '{n}d ago'
      }
    }
  },
  NotificationsContainer: {
    props: {
      notifications: [
        { id: 1, type: 'success', title: 'Saved', message: 'Transaction saved successfully.' },
        { id: 2, type: 'error', title: 'Error', message: 'Failed to save.' }
      ],
      confirmModal: null
    }
  },
  // --- Batch 4: final 22 missing demos ---
  PartyDetailContent: {
    props: {
      party: { id: 1, name: 'Acme Ltd', type: 'business', description: 'Top client', receivedAmount: 1200, spentAmount: 450, icon: 'Building2' },
      transactions: [
        { id: 1, partyId: 1, amount: -42.5, type: 'expense', category: 'Food', date: new Date().toISOString().slice(0, 10), description: 'Groceries' },
        { id: 2, partyId: 1, amount: 1200, type: 'INCOME', category: 'Sales', date: new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10), description: 'Invoice paid' },
        { id: 3, partyId: 1, amount: -80, type: 'expense', category: 'Transport', date: new Date(Date.now() - 86400000 * 5).toISOString().slice(0, 10), description: 'Courier' }
      ],
      currency: 'USD',
      formatter: (n, c) => `$${Math.round(Number(n))} ${c || 'USD'}`,
      labels: {
        backToList: 'Back to list',
        edit: 'Edit',
        delete: 'Delete',
        received: 'Received',
        spent: 'Spent',
        net: 'Net',
        lastSixMonths: 'Last 6 months',
        activity: 'Activity',
        receivedAmount: 'Received',
        spentAmount: 'Spent',
        recentTransactions: 'Recent transactions',
        shown: 'shown',
        viewAll: 'View all',
        noActivity: 'No activity yet.',
        transaction: 'Transaction',
        noTransactions: 'No transactions.',
        individual: 'Individual',
        business: 'Business',
        organization: 'Organization',
        vendor: 'Vendor',
        client: 'Client',
        party: 'Party'
      }
    }
  },
  RecentTransactions: {
    props: {
      transactions: [
        { id: 1, type: 'INCOME', amount: '1200', party: 'Acme Ltd', category: 'Sales', date: new Date().toISOString().slice(0, 10) },
        { id: 2, type: 'EXPENSE', amount: '42.50', party: 'ShopMart', category: 'Food', date: new Date(Date.now() - 86400000).toISOString().slice(0, 10) },
        { id: 3, type: 'EXPENSE', amount: '18.99', party: 'Transit Co', category: 'Transport', date: new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10) },
        { id: 4, type: 'INCOME', amount: '300', party: 'Globex', category: 'Freelance', date: new Date(Date.now() - 86400000 * 3).toISOString().slice(0, 10) },
        { id: 5, type: 'EXPENSE', amount: '65', party: 'Bookstore', category: 'Education', date: new Date(Date.now() - 86400000 * 4).toISOString().slice(0, 10) }
      ],
      limit: 5,
      labels: {
        recentTransactions: 'Recent Transactions',
        viewAll: 'View All',
        noTransactionsYet: 'No transactions yet',
        today: 'Today',
        yesterday: 'Yesterday',
        dAgo: '{n}d ago',
        wAgo: '{n}w ago',
        moAgo: '{n}mo ago'
      }
    }
  },
  SettingsAccount: {
    props: {
      isEditMode: false,
      user: { first_name: 'Jane', last_name: 'Doe', username: 'janedoe', email: 'jane@example.com' },
      avatarUrl: 'https://i.pravatar.cc/100?img=5',
      labels: {
        profilePicture: 'Profile Picture',
        userAvatar: 'User Avatar',
        firstName: 'First Name',
        lastName: 'Last Name',
        username: 'Username',
        emailAddress: 'Email Address',
        password: 'Password',
        changePassword: 'Change Password',
        updateAccount: 'Update Account'
      }
    }
  },
  SettingsConnections: {
    props: {
      endpoint: 'https://api.trakli.com/mcp',
      tokens: [
        { id: 1, name: 'Claude Desktop', last_used_at: new Date().toISOString() },
        { id: 2, name: 'Cursor', last_used_at: null }
      ],
      loading: false,
      creating: false,
      createdToken: null,
      labels: {
        intro: 'Connect an AI client like Claude Desktop or Cursor to your Trakli data over the Model Context Protocol.',
        mcpEndpoint: 'MCP endpoint',
        copy: 'Copy',
        endpointHint: 'Add this URL to your AI client and authenticate with one of the tokens below.',
        accessTokens: 'Access tokens',
        tokenNamePlaceholder: 'Token name, e.g. Claude Desktop',
        generateToken: 'Generate token',
        lastUsed: 'Last used',
        neverUsed: 'Never used',
        revoke: 'Revoke',
        noTokensYet: 'No tokens yet.',
        copyTokenNow: 'Copy your token now',
        tokenShownOnce: 'This token is shown only once. Store it somewhere safe before closing.',
        done: 'Done'
      }
    }
  },
  SettingsGeneral: {
    props: {
      isEditMode: false,
      initialLanguage: 'en',
      initialCurrency: 'USD',
      languages: [
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Español' },
        { code: 'fr', label: 'Français' }
      ],
      currencies: [
        { code: 'USD', label: 'US Dollar' },
        { code: 'EUR', label: 'Euro' },
        { code: 'GBP', label: 'British Pound' }
      ],
      labels: {
        defaultLanguage: 'Default Language',
        currentCurrency: 'Current Currency',
        updateGeneralSettings: 'Update General Settings'
      }
    }
  },
  SettingsNotifications: {
    props: {
      isEditMode: false,
      loading: false,
      preferences: {
        channels: { email: true, push: false, inapp: true },
        types: { reminders: true, insights: false, inactivity: true }
      },
      labels: {
        loadingPreferences: 'Loading preferences...',
        notificationChannels: 'Notification Channels',
        emailNotifications: 'Email Notifications',
        emailDesc: 'Receive notifications via email',
        pushNotifications: 'Push Notifications',
        pushDesc: 'Receive notifications on your device',
        inAppNotifications: 'In-App Notifications',
        inAppDesc: 'See notifications in the app',
        notificationTypes: 'Notification Types',
        reminders: 'Reminders',
        remindersDesc: 'Get notified about your reminders',
        financialInsights: 'Financial Insights',
        insightsDesc: 'Weekly/monthly spending summaries',
        engagementReminders: 'Engagement Reminders',
        engagementDesc: "Gentle nudges when you haven't tracked",
        savePreferences: 'Save Preferences'
      }
    }
  },
  SettingsWallets: {
    props: {
      isEditMode: false,
      wallets: [
        { id: 1, name: 'Main Wallet', currency: 'USD' },
        { id: 2, name: 'Savings', currency: 'EUR' }
      ],
      groups: [
        { id: 1, name: 'General' },
        { id: 2, name: 'Work' }
      ],
      defaultWalletId: 1,
      defaultGroupId: 1,
      allowNegativeBalance: false,
      labels: {
        defaultWallet: 'Default Wallet',
        currentlySelected: 'Currently Selected',
        defaultGroup: 'Default Group',
        none: 'None',
        allowNegativeBalances: 'Allow Negative Balances',
        allowNegativeDesc: 'Permit wallet balances to go below zero when spending or transferring.',
        updateWalletsAndGroups: 'Update Wallets & Groups'
      }
    }
  },
  StatsFilterModal: {
    props: {
      wallets: [
        { id: 1, name: 'Main Wallet', currency: 'USD' },
        { id: 2, name: 'Savings', currency: 'EUR' },
        { id: 3, name: 'Cash', currency: 'USD' }
      ],
      currentPeriod: 'current_month',
      initialFilters: { startDate: '2026-07-01', endDate: '2026-07-31', walletIds: [] },
      labels: {
        title: 'Filter Statistics',
        dateRange: 'Date Range',
        startDate: 'Start date',
        endDate: 'End date',
        wallets: 'Wallets',
        reset: 'Reset',
        applyFilters: 'Apply Filters',
        presets: {
          current_week: 'This Week',
          current_month: 'This Month',
          last_3_months: 'Last 3 months',
          current_year: 'This Year',
          all_time: 'All time'
        }
      }
    }
  },
  TAvatar: {
    props: {
      imageUrl: 'https://i.pravatar.cc/100?img=12',
      userName: 'Jane Doe',
      showName: true,
      showDropdown: false,
      user: { first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', is_admin: true },
      labels: {
        accountMenu: 'Account menu',
        settings: 'Settings',
        admin: 'Admin',
        logout: 'Logout'
      }
    }
  },
  TCardActionMenu: {
    props: {
      triggerLabel: 'More actions',
      moreLabel: 'More actions',
      editLabel: 'Edit',
      deleteLabel: 'Delete',
      items: [
        { action: 'edit', label: 'Edit' },
        { action: 'delete', label: 'Delete', variant: 'danger' }
      ]
    }
  },
  TDashboardTopCard: {
    props: {
      showFilters: true,
      activePeriod: 'current_month',
      isCustomActive: false,
      customOpen: false,
      periodSubtitle: 'July 2026 · All wallets',
      periods: [
        { value: 'current_month', label: 'This month' },
        { value: 'last_month', label: 'Last month' },
        { value: 'current_year', label: 'This year' }
      ],
      labels: {
        overview: 'Overview',
        custom: 'Custom'
      }
    }
  },
  TEmptyState: {
    props: {
      title: 'No items yet',
      description: 'There are no items to display. Create your first one to get started.'
    }
  },
  TFormInput: {
    props: {
      modelValue: 'Hello world',
      type: 'text',
      placeholder: 'Enter text...',
      size: 'md'
    }
  },
  TFormSelect: {
    props: {
      modelValue: 'option1',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3 (disabled)', value: 'option3', disabled: true }
      ],
      size: 'md'
    }
  },
  TFormTextarea: {
    props: {
      modelValue: 'A short description with a few lines of text to preview the textarea component.',
      rows: 4,
      placeholder: 'Enter details...'
    }
  },
  TModalHeader: {
    props: {
      title: 'Confirm action',
      showClose: true
    }
  },
  TNavbar: {
    props: {
      isMobile: false,
      isSidebarOpen: false,
      labels: {
        addTransaction: 'Add transaction',
        openLearningModal: 'Open learning modal',
        learnTitle: 'Learn how to use Trakli'
      }
    }
  },
  TPagination: {
    props: {
      currentPage: 2,
      totalPages: 5,
      totalEntries: 48,
      itemsPerPage: 10,
      maxVisible: 5,
      showLabels: false,
      prevLabel: 'Previous',
      nextLabel: 'Next',
      entryText: 'Showing 11 to 20 of 48 entries'
    }
  },
  TTableRow: {
    props: {
      txn: { id: 1, type: 'INCOME', amount: '$1,200.00', party: 'Acme Ltd', category: 'Sales', date: new Date().toISOString(), datetime: new Date().toISOString(), isTransfer: false, isRefund: false, isRecurring: false },
      labels: { transfer: 'Transfer', refund: 'Refund', recurring: 'Recurring' },
      formatDate: (txn) => new Date(txn.date || txn.datetime).toLocaleDateString(),
      formatTimeAgo: (txn) => 'Today'
    }
  },
  TTableTotals: {
    props: {
      totals: { income: 3000, expenses: 2100, net: 900 },
      labels: { totals: 'Totals', income: 'Income', expenses: 'Expenses', net: 'Net' },
      formatCurrency: (v) => `$${Math.round(Number(v)).toLocaleString()}`
    }
  },
  UserDetail: {
    props: {
      detail: {
        user: { first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', is_admin: false, created_at: '2024-03-15T10:00:00Z' },
        preferences: { country: 'United States', language: 'English', currency: 'USD' },
        counts: { transactions: 42, wallets: 3, categories: 8, parties: 5, groups: 2, budgets: 4 },
        last_transaction_at: new Date().toISOString()
      },
      loading: false,
      error: '',
      labels: {
        backToUsers: 'Back to users',
        loading: 'Loading...',
        admin: 'Admin',
        profile: 'Profile',
        joined: 'Joined',
        country: 'Country',
        language: 'Language',
        currency: 'Currency',
        lastTransaction: 'Last transaction',
        countLabels: {
          transactions: 'Transactions',
          wallets: 'Wallets',
          categories: 'Categories',
          parties: 'Parties',
          groups: 'Groups',
          budgets: 'Budgets'
        }
      }
    }
  },
  WalletDetailContent: {
    props: {
      wallet: { id: 1, name: 'Main Wallet', balance: 4200.5, currency: 'USD', type: 'bank', stats: { total_income: 3000, total_expense: 2100 }, icon: 'Wallet' },
      isDefault: true,
      transactions: [
        { id: 1, walletId: 1, amount: 42.5, type: 'expense', category: 'Food', party: 'ShopMart', date: new Date().toISOString().slice(0, 10), description: 'Groceries' },
        { id: 2, walletId: 1, amount: 3000, type: 'INCOME', category: 'Income', party: 'Employer', date: new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10), description: 'Salary' },
        { id: 3, walletId: 1, amount: 18.99, type: 'expense', category: 'Transport', party: 'Transit Co', date: new Date(Date.now() - 86400000 * 5).toISOString().slice(0, 10), description: 'Bus pass' }
      ],
      formatter: (n, c) => `$${Math.round(Number(n)).toLocaleString()} ${c || 'USD'}`,
      labels: {
        backToList: 'Back to list',
        edit: 'Edit',
        delete: 'Delete',
        balance: 'Balance',
        income: 'Income',
        expense: 'Expense',
        net: 'Net',
        last6Months: 'Last 6 months',
        activity: 'Activity',
        noActivity: 'No activity yet.',
        recentTransactions: 'Recent transactions',
        shown: 'shown',
        viewAll: 'View all',
        transaction: 'Transaction',
        noTransactions: 'No transactions.',
        default: 'Default',
        walletType: { bank: 'Bank', cash: 'Cash', creditCard: 'Credit card', savings: 'Savings' }
      }
    }
  }
};

// Generic fallback for components without a tuned demo.
export function getDemo(name: string): DemoConfig {
  return demos[name] || { props: {} };
}

// Human-friendly groupings for the usage landing. A component is filed under
// the first matching prefix/keyword; anything left over lands in "Other".
const CATEGORY_RULES: { label: string; match: (n: string) => boolean }[] = [
  { label: 'Buttons & actions', match: (n) => /^T(Button|InfoButton|Divider|Dropdown|DropdownItem)|^(ViewToggle|ThemeToggleButton|HamburgerMenu|TypingDots|TipsSection|CollapsibleSection)$/.test(n) },
  { label: 'Layout & containers', match: (n) => /^(TContainer|TStack|TGrid|TSplit|TPanel|TPageShell|Content(Card|Section|Table|ListView|CardGrid))$/.test(n) },
  { label: 'Cards & summaries', match: (n) => /Card|Strip|Kpi|Hero|Ratios|Onboarding|EmptyState|Logo|GoogleIcon|LoadingSkeleton|SparkLine|Auth/.test(n) },
  { label: 'Charts & data viz', match: (n) => /Chart|Donut|Breakdown|Ranking|Sankey|Heatmap|Bar|Cumulative|Calendar|Flow|Reports|Notable|QuickInsights/.test(n) },
  { label: 'Tables & lists', match: (n) => /Table|List|Tabs|Session|Suggestion/.test(n) },
  { label: 'Forms & inputs', match: (n) => /Form|Filters|Search|Period|Reminder|Group|Category|Party|Wallet|Transfer|Budget|Login|Register|Language|Theme|Settings|IconPicker|Import/.test(n) },
  { label: 'Modals & dialogs', match: (n) => /Modal|Dialog|Confirm|Learning|Password|Recurring|MonthInReview/.test(n) },
  { label: 'AI & chat', match: (n) => /Chat|AIChat/.test(n) }
];

export const categories: { label: string; items: string[] }[] = (() => {
  const buckets: Record<string, string[]> = {};
  for (const c of components) {
    const rule = CATEGORY_RULES.find((r) => r.match(c.name)) || { label: 'Other' };
    (buckets[rule.label] ||= []).push(c.name);
  }
  return Object.entries(buckets)
    .map(([label, items]) => ({ label, items: items.sort() }))
    .sort((a, b) => a.label.localeCompare(b.label));
})();
