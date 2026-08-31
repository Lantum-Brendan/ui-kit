import ContentCardGrid from '../components/ContentCardGrid.vue';

export default {
  title: 'Primitives/ContentCardGrid',
  component: ContentCardGrid,
  argTypes: {
    defaultLabel: { control: 'text' },
    moreActionsLabel: { control: 'text' },
    editLabel: { control: 'text' },
    deleteLabel: { control: 'text' },
    emptyLabel: { control: 'text' }
  }
};

const entities = [
  {
    id: '1',
    name: 'Main Wallet',
    description: 'Primary spending wallet',
    icon: 'Wallet',
    receivedAmount: 1200,
    spentAmount: 400
  },
  {
    id: '2',
    name: 'Savings',
    description: 'Long term savings',
    icon: 'PiggyBank'
  }
];

const cardFields = [
  { key: 'receivedAmount', label: 'Received', class: 'positive' },
  { key: 'spentAmount', label: 'Spent', class: 'negative' }
];

const Template = (args) => ({
  components: { ContentCardGrid },
  setup() {
    return { args, entities, cardFields };
  },
  template: `
    <ContentCardGrid
      v-bind="args"
      :entities="entities"
      :card-fields="cardFields"
      @edit="args.onEdit"
      @delete="args.onDelete"
    />
  `
});

export const WithCards = Template.bind({});
WithCards.args = {
  defaultItemId: '1',
  onEdit: () => {},
  onDelete: () => {}
};

export const Empty = Template.bind({});
Empty.args = {
  entities: [],
  onEdit: () => {},
  onDelete: () => {}
};
