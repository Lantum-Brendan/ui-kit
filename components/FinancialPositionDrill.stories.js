import FinancialPositionDrill from './FinancialPositionDrill.vue';

export default {
  title: 'Components/FinancialPositionDrill',
  component: FinancialPositionDrill,
  tags: ['autodocs'],
};

const group = {
  label: 'Earned income',
  eyebrow: 'Money in',
  tone: 'income',
  metric: '$5,200',
  hint: 'From salaries and freelance',
  metricClass: 'is-in',
  icon: null,
  intents: ['regular'],
};

const rows = [
  { id: 1, intent: 'regular', type: 'income', title: 'Salary', meta: 'Apr 01 · Main Wallet', amount: '$3,000', amountNum: 3000, currency: 'USD', currencyCode: 'USD' },
  { id: 2, intent: 'regular', type: 'income', title: 'Freelance', meta: 'Apr 15 · Main Wallet', amount: '$2,200', amountNum: 2200, currency: 'USD' },
];

export const OpenWithRows = {
  args: {
    open: true,
    group,
    rows,
    isLoading: false,
  },
};

export const Loading = {
  args: {
    open: true,
    group,
    rows: [],
    isLoading: true,
  },
};

export const Empty = {
  args: {
    open: true,
    group,
    rows: [],
    isLoading: false,
  },
};

export const Closed = {
  args: {
    open: false,
    group,
    rows,
    isLoading: false,
  },
};
