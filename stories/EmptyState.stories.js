import EmptyState from '../components/EmptyState.vue';

export default {
  title: 'Primitives/EmptyState',
  component: EmptyState,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    buttonLabel: { control: 'text' },
    iconAlt: { control: 'text' }
  }
};

const Template = (args) => ({
  components: { EmptyState },
  setup() {
    return { args };
  },
  template: `
    <EmptyState
      v-bind="args"
      @create="args.onCreate"
    />
  `
});

export const Default = Template.bind({});
Default.args = {
  title: "You don't have any items at the moment.",
  subtitle: 'Please add at least one item to be able to view it.',
  buttonLabel: 'Add item',
  iconAlt: 'Empty box',
  onCreate: () => {}
};

export const Wallets = Template.bind({});
Wallets.args = {
  ...Default.args,
  title: "You don't have any wallets at the moment.",
  subtitle: 'Please add at least one wallet to be able to view it.',
  buttonLabel: 'Add wallet'
};

export const Categories = Template.bind({});
Categories.args = {
  ...Default.args,
  title: "You don't have any categories at the moment.",
  subtitle: 'Please add at least one category to be able to view it.',
  buttonLabel: 'Add category'
};
