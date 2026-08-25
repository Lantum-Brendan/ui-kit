import TransactionFormSection from './TransactionFormSection.vue';

export default {
  title: 'Layout/TransactionFormSection',
  component: TransactionFormSection,
  tags: ['autodocs'],
  argTypes: {
    pageName: { control: 'text' }
  }
};

export const Default = {
  args: {
    pageName: 'Transaction'
  },
  render: (args) => ({
    components: { TransactionFormSection },
    setup() {
      return { args };
    },
    template: `
      <TransactionFormSection v-bind="args">
        <div style="flex: 1; padding: 20px; border: 1px dashed #ccc;">
          Main Form Section
        </div>
      </TransactionFormSection>
    `
  })
};
