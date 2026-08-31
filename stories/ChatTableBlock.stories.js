import ChatTableBlock from '../components/ChatTableBlock.vue';

export default {
  title: 'Components/ChatTableBlock',
  component: ChatTableBlock,
  tags: ['autodocs'],
};

export const Default = { args: { title: 'Transactions', columns: ['name', 'amount', 'category'], rows: [{ name: 'Grocery', amount: 42, category: 'Food' }, { name: 'Rent', amount: 1200, category: 'Housing' }] } };
export const AutoColumns = { args: { rows: [{ product: 'A', sales: 120 }, { product: 'B', sales: 80 }] } };
export const Empty = { args: { title: 'Empty table', columns: ['a', 'b'], rows: [] } };
