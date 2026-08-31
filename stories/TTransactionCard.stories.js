import TTransactionCard from '../components/TTransactionCard.vue';

export default {
  title: 'Components/TTransactionCard',
  component: TTransactionCard,
  tags: ['autodocs'],
};

export const Default = { args: {
  statistics: { income_insights: { biggest_source: { party: 'Salary', amount: 3000 }, biggest_category: { category: 'Salary', amount: 3000 } }, expense_insights: { biggest_expense: { party: 'Rent', amount: 1200 }, biggest_category: { category: 'Housing', amount: 1200 } } },
  primaryCurrency: 'USD',
  formatCompactCurrency: (v) => `$${v}`
} };
export const Empty = { args: {
  statistics: null,
  primaryCurrency: ''
} };
export const Alternative = { args: {
  statistics: { income_insights: { biggest_source: { party: 'Salary', amount: 3000 }, biggest_category: { category: 'Salary', amount: 3000 } }, expense_insights: { biggest_expense: { party: 'Rent', amount: 1200 }, biggest_category: { category: 'Housing', amount: 1200 } } },
  primaryCurrency: 'USD',
  formatCompactCurrency: (v) => `$${v}`
} };
