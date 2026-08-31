import ChatListBlock from '../components/ChatListBlock.vue';

export default {
  title: 'Components/ChatListBlock',
  component: ChatListBlock,
  tags: ['autodocs'],
};

export const Default = { args: { title: 'Recent transactions', items: [{ title: 'Grocery', amount: 42, currency: 'USD', category: 'Food' }, { title: 'Rent', amount: 1200, currency: 'USD', category: 'Housing' }] } };
export const Empty = { args: { title: 'No items', items: [] } };
export const Lots = { args: { title: 'Top 5', items: Array.from({ length: 5 }, (_, i) => ({ title: `Item ${i + 1}`, amount: (i + 1) * 100, currency: 'USD' })) } };
