import CategoryBreakdown from '../components/CategoryBreakdown.vue';

export default {
  title: 'Components/CategoryBreakdown',
  component: CategoryBreakdown,
  tags: ['autodocs'],
};

const stats = {
  category_breakdown: {
    expense_categories: [
      { category: 'Food', amount: 320 },
      { category: 'Rent', amount: 1200 },
      { category: 'Transport', amount: 180 },
      { category: 'Utilities', amount: 90 },
    ],
  },
};
export const Default = { args: { statistics: stats, defaultCurrency: 'USD' } };
export const Empty = { args: { statistics: { category_breakdown: { expense_categories: [] } }, defaultCurrency: 'USD' } };
export const NoData = { args: { statistics: {}, defaultCurrency: 'USD' } };

