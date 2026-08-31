import TStack from '../components/TStack.vue';

const box = `style="background:var(--color-primary-light); color:var(--color-primary); padding:12px 16px; border-radius:8px;"`;

export default {
  title: 'Layout/TStack',
  component: TStack,
  argTypes: {
    direction: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    gap: { control: 'number' },
  },
};

export const Vertical = {
  args: { direction: 'vertical', gap: 4 },
  render: (args) => ({
    components: { TStack },
    setup: () => ({ args }),
    template: `<TStack v-bind="args" style="width:240px"><div ${box}>One</div><div ${box}>Two</div><div ${box}>Three</div></TStack>`,
  }),
};

export const Horizontal = {
  args: { direction: 'horizontal', gap: 4, align: 'center' },
  render: (args) => ({
    components: { TStack },
    setup: () => ({ args }),
    template: `<TStack v-bind="args"><div ${box}>One</div><div ${box}>Two</div><div ${box}>Three</div></TStack>`,
  }),
};
