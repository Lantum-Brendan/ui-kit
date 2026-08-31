import TTabPanel from '../components/TTabPanel.vue';

export default {
  title: 'Components/TTabPanel',
  component: TTabPanel,
  tags: ['autodocs'],
};

export const Visible = {
  args: { value: 'all', activeValue: 'all' },
  render: (args) => ({
    components: { TTabPanel },
    setup() { return { args }; },
    template: `<TTabPanel v-bind="args"><div style="padding:16px;background:#f9fafb;border-radius:8px">All transactions shown</div></TTabPanel>`,
  }),
};
export const Hidden = {
  args: { value: 'income', activeValue: 'all' },
  render: (args) => ({
    components: { TTabPanel },
    setup() { return { args }; },
    template: `<TTabPanel v-bind="args"><div>Income only</div></TTabPanel>`,
  }),
};
export const Lazy = {
  args: { value: 'expense', activeValue: 'expense', lazy: true },
  render: (args) => ({
    components: { TTabPanel },
    setup() { return { args }; },
    template: `<TTabPanel v-bind="args"><div style="padding:16px">Lazy loaded panel</div></TTabPanel>`,
  }),
};

