import SearchInput from '../components/SearchInput.vue';

export default {
  title: 'Primitives/SearchInput',
  component: SearchInput,
  argTypes: {
    modelValue: { control: 'text' },
    placeholder: { control: 'text' },
    debounce: { control: 'number' }
  }
};

const Template = (args) => ({
  components: { SearchInput },
  setup() {
    return { args };
  },
  template: `
    <SearchInput
      v-bind="args"
      @update:modelValue="args.onUpdate"
    />
  `
});

export const Default = Template.bind({});
Default.args = {
  placeholder: '',
  debounce: 300,
  onUpdate: () => {}
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  placeholder: 'Search wallets...',
  onUpdate: () => {}
};
