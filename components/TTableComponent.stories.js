import TTableComponent from './TTableComponent.vue';

export default {
  title: 'Components/TTableComponent',
  component: TTableComponent,
  tags: ['autodocs'],
};

const sampleTx = [
  { id: 1, description: 'Coffee', amount: -4.5, currency: 'USD', date: '2026-01-10', category: 'Food' },
  { id: 2, description: 'Salary', amount: 2500, currency: 'USD', date: '2026-01-01', category: 'Income' },
];
export const Default = {
  args: { transactions: sampleTx, searchQuery: '', currentPage: 1, itemsPerPage: 10, totalPages: 1 },
};
export const Empty = {
  args: { transactions: [], searchQuery: '', currentPage: 1, itemsPerPage: 10, totalPages: 1 },
};
export const Filtered = {
  args: { transactions: sampleTx, searchQuery: 'Coffee', currentPage: 1, itemsPerPage: 10, totalPages: 1 },
};

