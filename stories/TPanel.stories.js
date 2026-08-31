import TPanel from '../components/TPanel.vue';

export default {
  title: 'Layout/TPanel',
  component: TPanel,
  argTypes: {
    variant: { control: 'inline-radio', options: ['raised', 'flat'] },
    padding: { control: 'number' },
  },
};

export const Raised = {
  args: { variant: 'raised', padding: 6 },
  render: (args) => ({
    components: { TPanel },
    setup: () => ({ args }),
    template: `<TPanel v-bind="args" style="width:360px"><p style="margin:0">Surface card content.</p></TPanel>`,
  }),
};

export const WithHeaderAndFooter = {
  args: { variant: 'raised', padding: 6 },
  render: (args) => ({
    components: { TPanel },
    setup: () => ({ args }),
    template: `
      <TPanel v-bind="args" style="width:360px">
        <template #header>Panel title</template>
        <p style="margin:0">Body content.</p>
        <template #footer><span>Footer</span></template>
      </TPanel>`,
  }),
};
