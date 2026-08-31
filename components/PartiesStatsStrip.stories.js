import PartiesStatsStrip from './PartiesStatsStrip.vue';

export default {
  title: 'Components/PartiesStatsStrip',
  component: PartiesStatsStrip,
  tags: ['autodocs'],
};

export const Default = { args: {
  parties: [{ id: 1, name: 'Acme Corp', type: 'business', description: 'Client', receivedAmount: 1200, spentAmount: 400 }, { id: 2, name: 'John Doe', type: 'individual', description: 'Friend', receivedAmount: 300, spentAmount: 800 }],
  currency: 'USD',
  formatter: (n) => `$${Math.round(n)}`
} };
export const Empty = { args: {
  parties: [],
  currency: ''
} };
export const Alternative = { args: {
  parties: [{ id: 3, name: 'Alt Party', type: 'individual', description: 'Alt', receivedAmount: 500, spentAmount: 100 }],
  currency: 'EUR',
  formatter: (n) => `$${Math.round(n)}`
} };
