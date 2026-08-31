import MonthInReview from '../components/MonthInReview.vue';

export default {
  title: 'Components/MonthInReview',
  component: MonthInReview,
  tags: ['autodocs'],
};

export const Default = { args: {
  open: true,
  data: { month: '2026-08', totals: { income: 3200, expense: 1800, net: 1400 }, topCategory: { name: 'Food', amount: 600 }, biggestExpense: { amount: 250, description: 'New phone' } },
  currency: 'USD',
  formatter: (n) => `$${Math.round(n)}`
} };
export const Empty = { args: {
  open: false,
  data: null,
  currency: ''
} };
export const Alternative = { args: {
  open: true,
  data: { month: '2026-08', totals: { income: 3200, expense: 1800, net: 1400 }, topCategory: { name: 'Food', amount: 600 }, biggestExpense: { amount: 250, description: 'New phone' } },
  currency: 'EUR',
  formatter: (n) => `$${Math.round(n)}`
} };
