import EmptyState from './EmptyState.vue';

export default {
  title: 'Primitives/EmptyState',
  component: EmptyState,
  argTypes: {
    pageName: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    buttonLabel: { control: 'text' },
  },
};

export const Wallets = { args: { pageName: 'Wallets' } };
export const Custom = {
  args: {
    title: 'No wallets yet',
    subtitle: 'Create your first wallet to track balances.',
    buttonLabel: 'Create wallet',
  },
};
