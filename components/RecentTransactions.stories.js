import RecentTransactions from './RecentTransactions.vue';

export default {
  title: 'Components/RecentTransactions',
  component: RecentTransactions,
  tags: ['autodocs'],
};

const transactions = [
  { id: 1, type: 'EXPENSE', party: 'Starbucks', category: 'Dining', amount: '$5.40', date: new Date().toISOString().split('T')[0] },
  { id: 2, type: 'INCOME', party: 'Acme Corp', category: 'Salary', amount: '$3,000', date: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
  { id: 3, type: 'EXPENSE', party: 'Uber', category: 'Transport', amount: '$18.20', date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0] },
  { id: 4, type: 'EXPENSE', party: 'Grocery Mart', category: 'Groceries', amount: '$42.10', date: new Date(Date.now() - 86400000 * 10).toISOString().split('T')[0] },
];

export const Default = {
  args: {
    transactions,
    limit: 5,
  },
};

export const Empty = {
  args: {
    transactions: [],
    limit: 5,
  },
};

export const LimitedToTwo = {
  args: {
    transactions,
    limit: 2,
  },
};

export const SingleTransaction = {
  args: {
    transactions: [transactions[0]],
    limit: 5,
  },
};
