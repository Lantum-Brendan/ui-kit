import TPageShell from '../components/TPageShell.vue';

const pad = `style="padding:16px"`;

export default {
  title: 'Layout/TPageShell',
  component: TPageShell,
  parameters: { layout: 'fullscreen' },
};

export const SidebarHeaderMain = {
  args: { sidebarWidth: '14rem' },
  render: (args) => ({
    components: { TPageShell },
    setup: () => ({ args }),
    template: `
      <div style="height:360px">
        <TPageShell v-bind="args">
          <template #sidebar><nav ${pad}>Sidebar</nav></template>
          <template #header><div ${pad}>Header</div></template>
          <main ${pad}>Main content area</main>
        </TPageShell>
      </div>`,
  }),
};
