import ChartsTab from '../components/ChartsTab.vue';

export default {
  title: 'Components/ChartsTab',
  component: ChartsTab,
  tags: ['autodocs'],
};

const monthlyBuckets = [
  { label: 'Jan', income: 3000, expense: 1800, net: 1200, cumulative: 1200 },
  { label: 'Feb', income: 2800, expense: 2000, net: 800, cumulative: 2000 },
  { label: 'Mar', income: 3200, expense: 1960, net: 1240, cumulative: 3240 },
];
const dailyBuckets = [
  { date: '2026-08-01', expense: 45, txCount: 3 },
  { date: '2026-08-02', expense: 80, txCount: 5 },
  { date: '2026-08-03', expense: 20, txCount: 1 },
  { date: '2026-08-04', expense: 60, txCount: 4 },
];
const expenseCategories = [
  { name: 'Food', amount: 320, value: 320, count: 12, percentage: 22, color: '#f59e0b', trend: [4, 8, 12] },
  { name: 'Rent', amount: 1200, value: 1200, count: 1, percentage: 45, color: '#ef4444', trend: [10, 10, 10] },
];
const incomeCategories = [
  { name: 'Salary', amount: 4000, value: 4000, count: 2, percentage: 60, color: '#10b981', trend: [10, 20, 15] },
];

export const Default = { args: { monthlyBuckets, dailyBuckets, expenseCategories, incomeCategories, currency: 'USD' } };
export const SingleMonth = { args: { monthlyBuckets: [monthlyBuckets[0]], dailyBuckets: [dailyBuckets[0]], expenseCategories: [expenseCategories[0]], incomeCategories, currency: 'USD' } };
export const EmptyDaily = { args: { monthlyBuckets, dailyBuckets: [], expenseCategories, incomeCategories, currency: 'USD' } };
