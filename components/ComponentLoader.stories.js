import ComponentLoader from './ComponentLoader.vue';

export default {
  title: 'Primitives/ComponentLoader',
  component: ComponentLoader,
  argTypes: {
    isLoading: { control: 'boolean' },
    hasData: { control: 'boolean' },
    showEmpty: { control: 'boolean' },
    emptyStateName: { control: 'text' },
    skeletonVariant: { control: 'select', options: ['default', 'list', 'card', 'table'] },
  },
};

export const Loading = { args: { isLoading: true, hasData: false, skeletonVariant: 'list', skeletonCount: 3 } };
export const ErrorState = { args: { error: { message: 'Failed to load' }, isLoading: false, hasData: false, onRetry: () => alert('retry') } };
export const Empty = { args: { hasData: false, isLoading: false, showEmpty: true, emptyStateName: 'wallets' } };
export const WithData = {
  render: (args) => ({
    components: { ComponentLoader },
    setup() { return { args }; },
    template: `<ComponentLoader v-bind="args"><div style="padding:16px; border:1px solid var(--color-border); border-radius:8px;">Content loaded</div></ComponentLoader>`,
  }),
  args: { hasData: true },
};
