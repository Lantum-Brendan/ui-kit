import CategoryForm from '../components/CategoryForm.vue';

export default {
  title: 'Components/CategoryForm',
  component: CategoryForm,
  tags: ['autodocs'],
};

export const Default = { args: { pageName: 'Category' } };
export const Editing = { args: { pageName: 'Category', editingItem: { id: 1, name: 'Food', type: 'expense', description: 'Daily food spending', icon: 'Utensils' } } };
export const WithError = { args: { pageName: 'Category', apiError: 'Name already taken' } };
