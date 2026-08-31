import FinancialRatios from '../components/FinancialRatios.vue';

export default {
  title: 'Components/FinancialRatios',
  component: FinancialRatios,
  tags: ['autodocs'],
};

export const Default = { args: {
  totals: { income: 3200, expenses: 1800, net: 1400, savingsRate: 0.25, expenseRatio: 0.56, runwayMonths: 6, netDelta: 10, savingsRateDelta: 2 },
  currency: 'USD',
  formatter: (n) => `$${Math.round(n)}`
} };
export const Empty = { args: {
  totals: null,
  currency: ''
} };
export const Alternative = { args: {
  totals: { income: 3200, expenses: 1800, net: 1400, savingsRate: 0.25, expenseRatio: 0.56, runwayMonths: 6, netDelta: 10, savingsRateDelta: 2 },
  currency: 'EUR',
  formatter: (n) => `$${Math.round(n)}`
} };
