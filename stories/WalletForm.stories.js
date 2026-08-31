import WalletForm from '../components/WalletForm.vue';

export default {
  title: 'Components/WalletForm',
  component: WalletForm,
  tags: ['autodocs'],
};

export const Default = { args: {
  editingItem: null,
  defaultCurrency: 'USD',
  apiError: '',
  isSubmitting: false
} };
export const Empty = { args: {
  editingItem: null,
  defaultCurrency: '',
  isSubmitting: false
} };
export const Alternative = { args: {
  editingItem: null,
  defaultCurrency: 'USD',
  apiError: '',
  isSubmitting: true
} };
