import FormSection from '../components/FormSection.vue';

export default {
  title: 'Components/FormSection',
  component: FormSection,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    isSubmitting: false,
    editingItem: null,
  },
};

export const EditingIncome = {
  args: {
    isSubmitting: false,
    editingItem: { type: 'INCOME', amount: 120, description: 'Freelance' },
  },
};

export const EditingExpense = {
  args: {
    isSubmitting: false,
    editingItem: { type: 'EXPENSE', amount: 45, description: 'Groceries' },
  },
};

export const Submitting = {
  args: {
    isSubmitting: true,
    editingItem: null,
  },
};
