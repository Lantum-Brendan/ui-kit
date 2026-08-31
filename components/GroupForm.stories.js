import GroupForm from './GroupForm.vue';

export default {
  title: 'Components/GroupForm',
  component: GroupForm,
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
