import TDivider from '../components/TDivider.vue';

export default {
  title: 'Layout/TDivider',
  component: TDivider,
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
};

export const Horizontal = {
  args: { orientation: 'horizontal' },
  render: (args) => ({
    components: { TDivider },
    setup: () => ({ args }),
    template: `<div style="width:320px"><p style="margin:0 0 8px">Above</p><TDivider v-bind="args" /><p style="margin:8px 0 0">Below</p></div>`,
  }),
};

export const Vertical = {
  args: { orientation: 'vertical' },
  render: (args) => ({
    components: { TDivider },
    setup: () => ({ args }),
    template: `<div style="display:flex; align-items:center; gap:12px; height:40px"><span>Left</span><TDivider v-bind="args" /><span>Right</span></div>`,
  }),
};
