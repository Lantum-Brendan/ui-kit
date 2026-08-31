import CategoryDrillModal from '../components/CategoryDrillModal.vue';

export default {
  title: 'Components/CategoryDrillModal',
  component: CategoryDrillModal,
  tags: ['autodocs'],
};

const bucket = {
  name: 'Groceries',
  count: 12,
  amount: 842.5,
  delta: 8.2,
  trend: [120, 140, 110, 160, 180, 132],
  color: '#3b82f6',
  kind: 'expense',
};
const range = { start: new Date('2026-04-01'), end: new Date('2026-04-30') };
const transactions = [
  { id: 1, category: 'Groceries', type: 'EXPENSE', date: '2026-04-10', amount: '42.50 USD', party: 'Grocery Store' },
  { id: 2, category: 'Groceries', type: 'EXPENSE', date: '2026-04-08', amount: '18.00 USD', party: 'Market' },
];
const trailingMonths = [{ label: 'Feb', value: 300 }, { label: 'Mar', value: 420 }];
const formatter = (n, cur) => new Intl.NumberFormat('en-US', { style: 'currency', currency: cur || 'USD' }).format(n);

export const Closed = {
  args: {
    open: false,
    bucket,
    range,
    transactions,
    trailingMonths,
    currency: 'USD',
    formatter,
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
      showMore: 'Show {n} more',
    },
  },
};

export const Open = {
  args: {
    open: true,
    bucket,
    range,
    transactions,
    trailingMonths,
    currency: 'USD',
    formatter,
  },
};

export const IncomeBucket = {
  args: {
    open: true,
    bucket: { ...bucket, name: 'Salary', kind: 'income', color: '#10b981', amount: 5000 },
    range,
    transactions: [{ id: 3, category: 'Salary', type: 'INCOME', date: '2026-04-01', amount: '2500 USD', party: 'Employer' }],
    trailingMonths,
    currency: 'USD',
    formatter,
  },
};
