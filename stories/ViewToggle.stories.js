import ViewToggle from '../components/ViewToggle.vue';

export default {
  title: 'Primitives/ViewToggle',
  component: ViewToggle,
  argTypes: {
    modelValue: { control: { type: 'select', options: ['table', 'cards'] } },
    tableTitle: { control: 'text' },
    cardsTitle: { control: 'text' }
  }
};

const Template = (args) => ({
  components: { ViewToggle },
  setup() {
    return { args };
  },
  template: `
    <ViewToggle
      v-bind="args"
      @update:modelValue="args.onUpdate"
    />
  `
});

export const TableActive = Template.bind({});
TableActive.args = {
  modelValue: 'table',
  tableTitle: 'Table view',
  cardsTitle: 'Card view',
  onUpdate: () => {}
};

export const CardsActive = Template.bind({});
CardsActive.args = {
  modelValue: 'cards',
  tableTitle: 'Table view',
  cardsTitle: 'Card view',
  onUpdate: () => {}
};
