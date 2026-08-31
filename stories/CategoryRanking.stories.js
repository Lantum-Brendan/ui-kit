import CategoryRanking from '../components/CategoryRanking.vue';

export default {
  title: 'Components/CategoryRanking',
  component: CategoryRanking,
  tags: ['autodocs'],
};

const buckets = [
  { name: 'Food', amount: 320, count: 12, percentage: 22, delta: 8, prevAmount: 295, color: '#f59e0b', trend: [4, 8, 12, 10] },
  { name: 'Rent', amount: 1200, count: 1, percentage: 45, delta: 0, prevAmount: 1200, color: '#ef4444', trend: [10, 10, 10, 10] },
  { name: 'Transport', amount: 180, count: 8, percentage: 12, delta: -5, prevAmount: 190, color: '#8b5cf6', trend: [6, 4, 7, 5] },
];

export const Default = { args: { title: 'Top categories', subtitle: '3 categories', buckets, currency: 'USD' } };
export const Empty = { args: { title: 'Top categories', subtitle: 'No data', buckets: [], currency: 'USD' } };
export const NoDelta = { args: { title: 'Top categories', buckets, showDelta: false, currency: 'USD' } };
