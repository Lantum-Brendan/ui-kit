import EmptyState from './EmptyState.vue';
import { Wallet } from 'lucide-vue-next';

export default {
  title: 'Primitives/EmptyState',
  component: EmptyState,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    actionLabel: { control: 'text' },
  },
};

export const Default = {
  args: {
    title: 'No items found',
    description: 'There are currently no items in this view.',
    actionLabel: 'Add item',
  },
};

export const Wallets = {
  args: {
    title: 'No wallets yet',
    description: 'Please add at least one wallet to track your finances.',
    actionLabel: 'Add wallet',
    icon: Wallet,
  },
};

export const CustomSlots = {
  render: () => ({
    components: { EmptyState },
    template: `
      <EmptyState>
        <template #title>Custom Slotted Title</template>
        <template #description>This description is injected via slot.</template>
        <template #actions>
          <button style="padding: 8px 16px; background: #047844; color: white; border: none; border-radius: 8px; cursor: pointer;">
            Custom Action
          </button>
        </template>
      </EmptyState>
    `
  })
};
