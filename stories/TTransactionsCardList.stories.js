import TTransactionsCardList from '../components/TTransactionsCardList.vue';

export default {
  title: 'Components/TTransactionsCardList',
  component: TTransactionsCardList,
  tags: ['autodocs'],
};

const tx = [
  { id: 1, description: 'Grocery', amount: -32.1, currency: 'USD', date: '2026-02-05', category: 'Food' },
  { id: 2, description: 'Freelance', amount: 500, currency: 'USD', date: '2026-02-04', category: 'Income' },
];
export const Default = { args: { transactions: tx, searchQuery: '', currentPage: 1, itemsPerPage: 10, totalPages: 1 } };
export const Empty = { args: { transactions: [], searchQuery: '', currentPage: 1, itemsPerPage: 10, totalPages: 1 } };
export const Paginated = { args: { transactions: tx, searchQuery: '', currentPage: 2, itemsPerPage: 1, totalPages: 2 } };

