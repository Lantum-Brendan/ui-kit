import ChatQuickActionsBlock from '../components/ChatQuickActionsBlock.vue';

export default {
  title: 'Components/ChatQuickActionsBlock',
  component: ChatQuickActionsBlock,
  tags: ['autodocs'],
};

export const Default = { args: { actions: [{ label: 'Show last month' }, { label: 'Top category' }, { label: 'Recent transactions' }] } };
export const Single = { args: { actions: [{ label: 'Clear chat' }] } };
export const Many = { args: { actions: Array.from({ length: 6 }, (_, i) => ({ label: `Action ${i + 1}` })) } };
