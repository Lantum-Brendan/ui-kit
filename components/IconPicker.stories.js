import IconPicker from './IconPicker.vue';

export default {
  title: 'Primitives/IconPicker',
  component: IconPicker,
  argTypes: {
    modelValue: { control: 'text' }
  }
};

const Template = (args) => ({
  components: { IconPicker },
  setup() {
    return { args };
  },
  template: `
    <IconPicker
      v-bind="args"
      @update:modelValue="args.onUpdate"
    />
  `
});

export const Empty = Template.bind({});
Empty.args = {
  modelValue: '',
  onUpdate: () => {}
};

export const WithSelection = Template.bind({});
WithSelection.args = {
  modelValue: 'Home',
  onUpdate: () => {}
};
