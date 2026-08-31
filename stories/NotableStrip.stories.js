import NotableStrip from '../components/NotableStrip.vue';

export default {
  title: 'Components/NotableStrip',
  component: NotableStrip,
  tags: ['autodocs'],
};

export const Default = { args: {
  notable: { biggestExpense: { amount: 250, description: 'Electronics', date: '2026-08-10' }, biggestSwing: { name: 'Groceries', amount: 180, change: 25 }, firstTimePayees: [{ name: 'New Cafe' }], noSpendStreak: 3 },
  currency: 'USD',
  formatter: (n) => `$${Math.round(n)}`,
  locale: 'en'
} };
export const Empty = { args: {
  notable: null,
  currency: '',
  locale: ''
} };
export const Alternative = { args: {
  notable: { biggestExpense: { amount: 250, description: 'Electronics', date: '2026-08-10' }, biggestSwing: { name: 'Groceries', amount: 180, change: 25 }, firstTimePayees: [{ name: 'New Cafe' }], noSpendStreak: 3 },
  currency: 'EUR',
  formatter: (n) => `$${Math.round(n)}`,
  locale: 'fr'
} };
