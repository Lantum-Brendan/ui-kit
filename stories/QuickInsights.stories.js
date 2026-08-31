import QuickInsights from '../components/QuickInsights.vue';

export default {
  title: 'Components/QuickInsights',
  component: QuickInsights,
  tags: ['autodocs'],
};

export const Default = { args: {
  statistics: { income_insights: { biggest_source: { party: 'Salary', amount: 3000 }, biggest_category: { category: 'Salary', amount: 3000 } }, expense_insights: { biggest_expense: { party: 'Rent', amount: 1200 }, biggest_category: { category: 'Housing', amount: 1200 } } },
  currency: 'USD',
  formatter: (n) => `$${Math.round(n)}`
} };
export const Empty = { args: {
  statistics: null,
  currency: ''
} };
export const Alternative = { args: {
  statistics: { income_insights: { biggest_source: { party: 'Salary', amount: 3000 }, biggest_category: { category: 'Salary', amount: 3000 } }, expense_insights: { biggest_expense: { party: 'Rent', amount: 1200 }, biggest_category: { category: 'Housing', amount: 1200 } } },
  currency: 'EUR',
  formatter: (n) => `$${Math.round(n)}`
} };
