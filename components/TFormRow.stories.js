import TFormRow from './TFormRow.vue';

export default {
  title: 'Components/TFormRow',
  component: TFormRow,
  tags: ['autodocs'],
};

export const TwoCols = {
  args: { cols: 2, gap: 'md' },
  render: (args) => ({
    components: { TFormRow },
    setup() { return { args }; },
    template: `<TFormRow v-bind="args"><div style="background:#f3f4f6;padding:12px;border-radius:6px">Field A</div><div style="background:#f3f4f6;padding:12px;border-radius:6px">Field B</div></TFormRow>`,
  }),
};
export const OneCol = {
  args: { cols: 1, gap: 'md' },
  render: (args) => ({
    components: { TFormRow },
    setup() { return { args }; },
    template: `<TFormRow v-bind="args"><div style="background:#f3f4f6;padding:12px;border-radius:6px">Full width field</div></TFormRow>`,
  }),
};
export const ThreeCols = {
  args: { cols: 3, gap: 'sm' },
  render: (args) => ({
    components: { TFormRow },
    setup() { return { args }; },
    template: `<TFormRow v-bind="args"><div style="background:#f3f4f6;padding:12px;border-radius:6px">A</div><div style="background:#f3f4f6;padding:12px;border-radius:6px">B</div><div style="background:#f3f4f6;padding:12px;border-radius:6px">C</div></TFormRow>`,
  }),
};

