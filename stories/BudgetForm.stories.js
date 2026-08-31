import BudgetForm from '../components/BudgetForm.vue';

export default {
  title: 'Components/BudgetForm',
  component: BudgetForm,
  tags: ['autodocs'],
};

export const Default = { args: { wallets: [{ id: 1, name: 'Main', currency: 'USD' }], categories: [{ id: 1, name: 'Food' }], groups: [{ id: 1, name: 'Family' }] } };
export const Editing = { args: { editingItem: { id: 1, name: 'Groceries', amount: 500, currency: 'USD', period_type: 'monthly', start_date: '2026-01-01' }, wallets: [{ id: 1, name: 'Main', currency: 'USD' }], categories: [{ id: 1, name: 'Food' }] } };
export const Submitting = { args: { isSubmitting: true, wallets: [{ id: 1, name: 'Main', currency: 'USD' }] } };
