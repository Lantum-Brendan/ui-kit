import TipsSection from './TipsSection.vue';

export default {
  title: 'Primitives/TipsSection',
  component: TipsSection,
  argTypes: {
    title: { control: 'text' },
    text: { control: 'text' }
  }
};

const Template = (args) => ({
  components: { TipsSection },
  setup() {
    return { args };
  },
  template: `<TipsSection v-bind="args" />`
});

export const Wallets = Template.bind({});
Wallets.args = {
  title: 'Tips for adding wallets',
  text: 'Always check everything before submitting a new wallet.'
};

export const Categories = Template.bind({});
Categories.args = {
  title: 'Tips for adding categories',
  text: 'Always check everything before submitting a new category.'
};
