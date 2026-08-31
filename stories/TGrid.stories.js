import TGrid from '../components/TGrid.vue';

const box = `style="background:var(--color-primary-light); color:var(--color-primary); padding:24px; border-radius:8px; text-align:center;"`;

export default {
  title: 'Layout/TGrid',
  component: TGrid,
};

export const AutoResponsive = {
  args: { minItemWidth: '10rem', gap: 4 },
  render: (args) => ({
    components: { TGrid },
    setup: () => ({ args }),
    template: `<TGrid v-bind="args" style="width:560px"><div ${box}>1</div><div ${box}>2</div><div ${box}>3</div><div ${box}>4</div><div ${box}>5</div></TGrid>`,
  }),
};

export const FixedColumns = {
  args: { cols: 3, gap: 4 },
  render: (args) => ({
    components: { TGrid },
    setup: () => ({ args }),
    template: `<TGrid v-bind="args" style="width:480px"><div ${box}>1</div><div ${box}>2</div><div ${box}>3</div><div ${box}>4</div></TGrid>`,
  }),
};
