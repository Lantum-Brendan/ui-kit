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
  ImportUpload: {
    props: {
      labels: {
        showName: 'Show {name}',
        smartImport: 'Smart import',
        bringToLife: 'Bring statements to life',
        dropStatement: 'Drop a file to import.',
        dropHere: 'Drop your file here',
        supports: 'Supports CSV, PDF, images',
        remove: 'Remove',
        documentType: 'Document type',
        autoDetect: 'Auto-detect',
        bankStatement: 'Bank statement',
        receipt: 'Receipt',
        invoice: 'Invoice',
        payStub: 'Pay stub',
        utilityBill: 'Utility bill',
        analyzing: 'Analyzing…',
        analyzeDocument: 'Analyze document',
        docTypes: [
          { key: 'csv', name: 'Spreadsheet', format: 'CSV / XLSX', badge: 'CSV' },
          { key: 'pdf', name: 'Bank statement', format: 'PDF', badge: 'PDF' },
          { key: 'image', name: 'Receipt photo', format: 'PNG · JPG', badge: 'IMG' }
        ]
      }
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
  OnboardingWizard: {}
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
