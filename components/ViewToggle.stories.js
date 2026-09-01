import ViewToggle from './ViewToggle.vue';

export default {
  title: 'Primitives/ViewToggle',
  component: ViewToggle,
  argTypes: {
    modelValue: { control: 'select', options: ['table', 'cards'] },
    tableTitle: { control: 'text' },
    cardsTitle: { control: 'text' },
  },
};

export const TableActive = { args: { modelValue: 'table' } };
export const CardsActive = { args: { modelValue: 'cards' } };
export const Interactive = {
  render: (args) => ({
    components: { ViewToggle },
    setup() { return { args }; },
    template: `<ViewToggle v-bind="args" @update:modelValue="args.modelValue = $event" />`,
  }),
  args: { modelValue: 'table' },
};
