import TransactionFilters from '../components/TransactionFilters.vue';

export default {
  title: 'Components/TransactionFilters',
  component: TransactionFilters,
  tags: ['autodocs'],
};

export const Default = { args: {
  filters: { type: 'expense' }
} };
export const Empty = { args: {} };
export const Alternative = { args: {
  filters: { type: 'expense' }
} };
