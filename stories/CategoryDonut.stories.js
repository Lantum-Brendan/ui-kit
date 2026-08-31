import CategoryDonut from '../components/CategoryDonut.vue';

export default {
  title: 'Components/CategoryDonut',
  component: CategoryDonut,
  tags: ['autodocs'],
};

const data = [
  { name: 'Food', value: 320, color: '#f59e0b' },
  { name: 'Rent', value: 1200, color: '#ef4444' },
  { name: 'Transport', value: 180, color: '#8b5cf6' },
  { name: 'Utilities', value: 90, color: '#06b6d4' },
];

export const Default = { args: { data, total: 1790, centerLabel: 'Spent', currency: 'USD' } };
export const Single = { args: { data: [data[0]], total: 320, centerLabel: 'Total', currency: 'USD' } };
export const Many = { args: { data: [...data, { name: 'Health', value: 210, color: '#10b981' }, { name: 'Fun', value: 150, color: '#ec4899' }], total: 2150, currency: 'USD' } };
