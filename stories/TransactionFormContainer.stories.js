import TransactionFormContainer from '../components/TransactionFormContainer.vue';

export default {
  title: 'Layout/TransactionFormContainer',
  component: TransactionFormContainer,
  tags: ['autodocs']
};

export const Default = {
  render: () => ({
    components: { TransactionFormContainer },
    template: `
      <TransactionFormContainer>
        <div style="padding: 20px; text-align: center; width: 100%;">
          Form Content Placeholder
        </div>
      </TransactionFormContainer>
    `
  })
};
