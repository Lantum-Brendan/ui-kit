import PartiesForm from '../components/PartiesForm.vue';

export default {
  title: 'Components/PartiesForm',
  component: PartiesForm,
  tags: ['autodocs'],
};

export const Default = { args: {
  editingItem: null,
  apiError: '',
  isSubmitting: false
} };
export const Empty = { args: {
  editingItem: null,
  isSubmitting: false
} };
export const Alternative = { args: {
  editingItem: null,
  apiError: '',
  isSubmitting: true
} };
