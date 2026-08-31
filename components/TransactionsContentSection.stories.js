import TransactionsContentSection from './TransactionsContentSection.vue';

export default {
  title: 'Components/TransactionsContentSection',
  component: TransactionsContentSection,
  tags: ['autodocs'],
};

export const Default = { args: {
  transactions: [{ id: 1, description: 'Grocery run', amount: 85, type: 'expense', date: '2026-08-10', currency: 'USD' }, { id: 2, description: 'Salary', amount: 3000, type: 'income', date: '2026-08-05', currency: 'USD' }],
  totals: { income: 3200, expenses: 1800, net: 1400, savingsRate: 0.25, expenseRatio: 0.56, runwayMonths: 6, netDelta: 10, savingsRateDelta: 2 },
  currentPage: 1,
  totalPages: 3,
  totalItems: 45,
  perPage: 20,
  activeFilterCount: 2,
  searchQuery: '',
  isLoading: false,
  pageName: 'Transaction',
  pageNamePlural: 'Transactions'
} };
export const Empty = { args: {
  transactions: [],
  totals: null,
  searchQuery: '',
  isLoading: false,
  pageName: '',
  pageNamePlural: ''
} };
export const Loading = { args: {
  transactions: [{ id: 3, description: 'Alt expense', amount: 45, type: 'expense', date: '2026-08-12', currency: 'EUR' }],
  totals: { income: 3200, expenses: 1800, net: 1400, savingsRate: 0.25, expenseRatio: 0.56, runwayMonths: 6, netDelta: 10, savingsRateDelta: 2 },
  currentPage: 1,
  totalPages: 3,
  totalItems: 45,
  perPage: 20,
  activeFilterCount: 2,
  searchQuery: '',
  isLoading: true,
  pageName: 'Transaction',
  pageNamePlural: 'Transactions'
} };
