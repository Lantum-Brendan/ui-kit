import TTableTotals from './TTableTotals.vue';

export default {
  title: 'Components/TTableTotals',
  component: TTableTotals,
  tags: ['autodocs'],
};

const labels = { totals: 'Totals', income: 'Income', expenses: 'Expenses', net: 'Net' };
const formatCurrency = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export const Default = {
  args: {
    totals: { income: 5000, expenses: 3200, net: 1800 },
    labels,
    formatCurrency,
  },
};

export const Negative = {
  args: {
    totals: { income: 2000, expenses: 4500, net: -2500 },
    labels,
    formatCurrency,
  },
};

export const Zero = {
  args: {
    totals: { income: 0, expenses: 0, net: 0 },
    labels,
    formatCurrency,
  },
};
