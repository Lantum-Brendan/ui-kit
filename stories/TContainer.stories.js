import TContainer from '../components/TContainer.vue';

const fill = `style="background:var(--color-primary-light); color:var(--color-primary); padding:24px; border-radius:8px; text-align:center;"`;

export default {
  title: 'Layout/TContainer',
  component: TContainer,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    gutter: { control: 'boolean' },
  },
};

export const Default = {
  args: { size: 'md', gutter: true },
  render: (args) => ({
    components: { TContainer },
    setup: () => ({ args }),
    template: `<div style="width:900px; background:var(--color-bg-gray)"><TContainer v-bind="args"><div ${fill}>Centred, max-width container</div></TContainer></div>`,
  }),
};
