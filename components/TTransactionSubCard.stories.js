import TTransactionSubCard from './TTransactionSubCard.vue';

export default {
  title: 'Components/TTransactionSubCard',
  component: TTransactionSubCard,
  tags: ['autodocs'],
};

export const Default = { args: { title: '48', text: 'Transactions this month' } };
export const LargeNumber = { args: { title: '1,234', text: 'Total records' } };
export const WithCustom = { args: { title: '89%', text: 'Categorized' } };

