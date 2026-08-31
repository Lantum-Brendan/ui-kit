import ComponentLoader from './ComponentLoader.vue';

export default {
  title: 'Components/ComponentLoader',
  component: ComponentLoader,
  tags: ['autodocs'],
  argTypes: {
    skeletonVariant: { control: 'select', options: ['default', 'list', 'card', 'table'] },
  },
};

export const Loading = {
  args: {
    isLoading: true,
    hasData: false,
    skeletonVariant: 'list',
    skeletonCount: 3,
  },
};

export const WithError = {
  args: {
    isLoading: false,
    hasData: false,
    error: { message: 'Failed to fetch transactions', status: 500 },
    onRetry: () => alert('Retry clicked'),
  },
};

export const WithContent = {
  render: (args) => ({
    components: { ComponentLoader },
    setup() { return { args }; },
    template: '<ComponentLoader v-bind="args"><div style="padding:12px;border:1px solid #e5e7eb;border-radius:8px;">Content loaded: 12 transactions</div></ComponentLoader>',
  }),
  args: {
    isLoading: false,
    hasData: true,
  },
};

export const EmptyState = {
  args: {
    isLoading: false,
    hasData: false,
    error: null,
    showEmpty: true,
    emptyStateName: 'Wallet',
  },
};
