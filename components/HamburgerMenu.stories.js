import HamburgerMenu from './HamburgerMenu.vue';

export default {
  title: 'Primitives/HamburgerMenu',
  component: HamburgerMenu,
  argTypes: {
    isOpen: { control: 'boolean' },
  },
};

export const Closed = { args: { isOpen: false } };
export const Open = { args: { isOpen: true } };

export const Interactive = {
  render: (args) => ({
    components: { HamburgerMenu },
    setup() {
      return { args };
    },
    template: `<HamburgerMenu v-bind="args" @toggle="args.isOpen = !args.isOpen" />`,
  }),
  args: { isOpen: false },
};
