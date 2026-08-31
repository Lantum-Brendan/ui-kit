import WalletDetailContent from './WalletDetailContent.vue';

export default {
  title: 'Components/WalletDetailContent',
  component: WalletDetailContent,
  tags: ['autodocs'],
};

const wallet = {
  id: 1,
  name: 'Main Wallet',
  type: 'bank',
  icon: 'Wallet',
  balance: 4520.5,
  currency: 'USD',
  stats: { total_income: 8000, total_expense: 3479.5 },
};
const transactions = [
  { id: 1, walletId: 1, amount: 120, type: 'income', party: 'Employer', date: '2026-04-10', category: 'Salary' },
  { id: 2, walletId: 1, amount: 42, type: 'expense', party: 'Grocery', date: '2026-04-09', category: 'Food' },
  { id: 3, walletId: 1, amount: 15, type: 'expense', party: 'Coffee Shop', date: '2026-04-08', category: 'Food' },
];
const labels = {
  backToList: 'Back to list',
  default: 'Default',
  edit: 'Edit',
  delete: 'Delete',
  balance: 'Balance',
  income: 'Income',
  expense: 'Expense',
  net: 'Net',
  last6Months: 'Last 6 months',
  activity: 'Activity',
  noActivity: 'No activity yet',
  recentTransactions: 'Recent transactions',
  shown: 'shown',
  viewAll: 'View all',
  noTransactions: 'No transactions',
  transaction: 'Transaction',
  walletType: { bank: 'Bank', cash: 'Cash', card: 'Card' },
};
const formatter = (n, cur) => new Intl.NumberFormat('en-US', { style: 'currency', currency: cur || 'USD' }).format(n);

export const Default = {
  args: {
    wallet,
    isDefault: true,
    transactions,
    formatter,
    showBack: false,
    locale: 'en',
    labels,
  },
};

export const NotDefault = {
  args: {
    wallet: { ...wallet, name: 'Savings', type: 'cash', balance: 12000 },
    isDefault: false,
    transactions,
    formatter,
    showBack: true,
    locale: 'en',
    labels,
  },
};

export const NoTransactions = {
  args: {
    wallet,
    isDefault: false,
    transactions: [],
    formatter,
    showBack: false,
    locale: 'en',
    labels,
  },
};
