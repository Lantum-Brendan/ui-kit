import TCard from '../components/TCard.vue';

export default {
  title: 'Primitives/TCard',
  component: TCard,
};

export const Basic = {
  render: () => ({
    components: { TCard },
    template: `<TCard style="width:320px"><p style="margin:0">Card body content.</p></TCard>`,
  }),
};

export const WithHeaderAndFooter = {
  render: () => ({
    components: { TCard },
    template: `
      <TCard style="width:320px">
        <template #header>Card title</template>
        <p style="margin:0">Body content sits between the header and footer.</p>
        <template #footer><span>Footer</span></template>
      </TCard>`,
  }),
};
