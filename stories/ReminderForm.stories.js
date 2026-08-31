import ReminderForm from '../components/ReminderForm.vue';

export default {
  title: 'Components/ReminderForm',
  component: ReminderForm,
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
