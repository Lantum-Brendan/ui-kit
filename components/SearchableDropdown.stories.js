import SearchableDropdown from './SearchableDropdown.vue';

export default {
  title: 'Components/SearchableDropdown',
  component: SearchableDropdown,
  tags: ['autodocs'],
};

export const Default = { args: {
  label: 'Total balance',
  placeholder: 'Select an option...',
  options: [{ id: 1, name: 'Option 1' }, { id: 2, name: 'Option 2' }, { id: 3, name: 'Option 3' }],
  modelValue: '',
  multiple: false,
  selected: [],
  error: '',
  optionLabel: 'name',
  optionKey: 'id',
  disabled: () => false
} };
export const WithSelection = { args: {
  label: '',
  placeholder: '',
  options: [],
  multiple: false,
  selected: [],
  error: ''
} };
export const WithError = { args: {
  label: 'Alternative label',
  placeholder: 'Select an option...',
  options: [{ id: 1, name: 'Option 1' }, { id: 2, name: 'Option 2' }, { id: 3, name: 'Option 3' }],
  modelValue: '',
  multiple: false,
  selected: [],
  error: '',
  optionLabel: 'name',
  optionKey: 'id',
  disabled: () => false
} };
