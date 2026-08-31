import ContentTable from '../components/ContentTable.vue';

export default {
  title: 'Primitives/ContentTable',
  component: ContentTable,
  argTypes: {
    pageName: { control: 'text' },
    pageNamePlural: { control: 'text' },
    headerType: { control: { type: 'select', options: ['default', 'expense'] } },
    hideHeader: { control: 'boolean' },
    defaultItemId: { control: 'text' }
  }
};

const entities = [
  { id: '1', name: 'Main Wallet', description: 'Primary', icon: 'Wallet' },
  { id: '2', name: 'Savings', description: 'Long term', icon: 'PiggyBank' },
  { id: '3', name: 'Cash', description: 'Physical', icon: 'Banknote' }
];

const Template = (args) => ({
  components: { ContentTable },
  setup() {
    return { args, entities };
  },
  template: `
    <ContentTable
      v-bind="args"
      :entities="entities"
      @edit="args.onEdit"
      @delete="args.onDelete"
    />
  `
});

export const Default = Template.bind({});
Default.args = {
  pageName: 'Wallet',
  pageNamePlural: 'Wallets',
  onEdit: () => {},
  onDelete: () => {}
};

export const Expense = Template.bind({});
Expense.args = {
  pageName: 'Category',
  pageNamePlural: 'Categories',
  headerType: 'expense',
  onEdit: () => {},
  onDelete: () => {}
};

export const WithDefault = Template.bind({});
WithDefault.args = {
  pageName: 'Wallet',
  pageNamePlural: 'Wallets',
  defaultItemId: '1',
  onEdit: () => {},
  onDelete: () => {}
};
