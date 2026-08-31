import ChatLandingInsights from './ChatLandingInsights.vue';

export default {
  title: 'Components/ChatLandingInsights',
  component: ChatLandingInsights,
  tags: ['autodocs'],
};

const formatMoney = (val) => `$${Number(val).toLocaleString()}`;

export const Default = {
  args: {
    loading: false,
    income: 5200,
    expenses: 3100,
    savingsRate: 40,
    txCount: 42,
    avgExpense: 73.8,
    biggestExpense: 'Grocery run $210',
    topCategory: { name: 'Dining', pct: 32 },
    topCategories: [
      { name: 'Dining', height: '80%' },
      { name: 'Groceries', height: '60%' },
      { name: 'Transport', height: '45%' },
    ],
    trend: [1200, 1800, 1500, 2100, 1900, 2500],
    spotlights: [
      { text: 'You spent 20% more on dining this month', prompt: 'Explain dining spend' },
      { text: 'Savings are up $400 vs last month', prompt: 'Why savings up?' },
    ],
    formatMoneyFn: formatMoney,
  },
};

export const Loading = {
  args: {
    loading: true,
  },
};

export const EmptyState = {
  args: {
    loading: false,
    income: 0,
    expenses: 0,
    txCount: 0,
    savingsRate: 0,
    topCategory: { name: '—', pct: 0 },
    topCategories: [],
    trend: [],
    spotlights: [],
    formatMoneyFn: formatMoney,
  },
};

export const NegativeFlow = {
  args: {
    loading: false,
    income: 2000,
    expenses: 3500,
    savingsRate: -75,
    txCount: 55,
    avgExpense: 63,
    biggestExpense: 'Rent $1200',
    topCategory: { name: 'Housing', pct: 45 },
    topCategories: [
      { name: 'Housing', height: '90%' },
      { name: 'Dining', height: '50%' },
    ],
    trend: [2500, 2000, 1800, 1500, 1200],
    spotlights: [{ text: 'Net flow is negative this month', prompt: 'Show me where I overspent' }],
    formatMoneyFn: formatMoney,
  },
};
