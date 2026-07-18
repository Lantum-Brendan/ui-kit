import HamburgerMenu from './HamburgerMenu.vue';

export default {
  title: 'Primitives/HamburgerMenu',
  component: HamburgerMenu,
  argTypes: {
    isOpen: { control: 'boolean' }
  }
};

const Template = (args) => ({
  components: { HamburgerMenu },
  setup() {
    return { args };
  },
  template: `
    <HamburgerMenu
      v-bind="args"
      @toggle="args.onToggle"
    />
  `
});

export const Closed = Template.bind({});
Closed.args = {
  isOpen: false,
  onToggle: () => {}
};

export const Open = Template.bind({});
Open.args = {
  isOpen: true,
  onToggle: () => {}
};
