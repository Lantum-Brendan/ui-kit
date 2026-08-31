import TSplit from '../components/TSplit.vue';

const main = `style="background:var(--color-primary-light); color:var(--color-primary); padding:24px; border-radius:8px;"`;
const aside = `style="background:var(--color-bg-gray); color:var(--color-text-secondary); padding:24px; border-radius:8px;"`;

export default {
  title: 'Layout/TSplit',
  component: TSplit,
};

export const MainAndAside = {
  args: { asideWidth: '16rem', gap: 8 },
  render: (args) => ({
    components: { TSplit },
    setup: () => ({ args }),
    template: `
      <TSplit v-bind="args" style="width:640px">
        <div ${main}>Main content column</div>
        <template #aside><div ${aside}>Aside</div></template>
      </TSplit>`,
  }),
};

export const AsideFirst = {
  args: { asideWidth: '16rem', gap: 8, asideFirst: true },
  render: (args) => ({
    components: { TSplit },
    setup: () => ({ args }),
    template: `
      <TSplit v-bind="args" style="width:640px">
        <div ${main}>Main content column</div>
        <template #aside><div ${aside}>Aside</div></template>
      </TSplit>`,
  }),
};
