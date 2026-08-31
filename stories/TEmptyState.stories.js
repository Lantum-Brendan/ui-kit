import TEmptyState from '../components/TEmptyState.vue';

export default {
  title: 'Components/TEmptyState',
  component: TEmptyState,
  tags: ['autodocs'],
};

export const Default = { args: { title: 'No results', description: 'Try adjusting your filters or create a new item.' } };
export const NoDescription = { args: { title: 'Empty list' } };
export const WithAction = {
  render: () => ({
    components: { TEmptyState },
    template: `<TEmptyState title="No wallets yet" description="Create your first wallet to get started."><template #action><button style="padding:8px 16px;background:#4f46e5;color:white;border:none;border-radius:6px">Create wallet</button></template></TEmptyState>`,
  }),
};

