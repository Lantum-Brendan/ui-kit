import ContentCard from './ContentCard.vue';

export default {
  title: 'Primitives/ContentCard',
  component: ContentCard,
  argTypes: {
    name: { control: 'text' },
    description: { control: 'text' },
    pageName: { control: 'text' },
    icon: { control: 'text' },
    type: { control: 'text' },
    isDefault: { control: 'boolean' }
  }
};

const Template = (args) => ({
  components: { ContentCard },
  setup() {
    return { args };
  },
  template: `
    <ContentCard
      v-bind="args"
      @edit="args.onEdit"
      @delete="args.onDelete"
    />
  `
});

export const Wallet = Template.bind({});
Wallet.args = {
  name: 'Main Wallet',
  description: 'Primary spending wallet',
  pageName: 'Wallet',
  icon: 'Wallet',
  isDefault: true,
  onEdit: () => {},
  onDelete: () => {}
};

export const Category = Template.bind({});
Category.args = {
  name: 'Groceries',
  description: 'Food and household',
  pageName: 'Category',
  icon: 'ShoppingCart',
  type: 'expense',
  onEdit: () => {},
  onDelete: () => {}
};

export const Plain = Template.bind({});
Plain.args = {
  name: 'No Icon Item',
  description: 'An item without an icon',
  pageName: 'Item',
  onEdit: () => {},
  onDelete: () => {}
};
