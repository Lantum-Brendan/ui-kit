import SearchInput from './SearchInput.vue';

export default {
  title: 'Primitives/SearchInput',
  component: SearchInput,
  argTypes: {
    placeholder: { control: 'text' },
    debounce: { control: 'number' },
  },
};

export const Default = { args: { placeholder: 'Search...', debounce: 300 } };
export const CustomPlaceholder = { args: { placeholder: 'Find wallets...' } };
export const Interactive = {
  render: (args) => ({
    components: { SearchInput },
    setup() { return { args }; },
    template: `<SearchInput v-bind="args" v-model="args.modelValue" />`,
  }),
  args: { modelValue: '', placeholder: 'Search...' },
};
