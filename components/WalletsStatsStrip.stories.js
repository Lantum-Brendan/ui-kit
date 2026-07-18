import WalletsStatsStrip from './WalletsStatsStrip.vue';

export default {
  title: 'Primitives/WalletsStatsStrip',
  component: WalletsStatsStrip,
  argTypes: {
    defaultCurrency: { control: 'text' }
  }
};

const wallets = [
  {
    name: 'Main',
    currency: 'USD',
    balance: 1000,
    stats: { total_income: 500, total_expense: 200 }
  },
  {
    name: 'Savings',
    currency: 'USD',
    balance: 2500,
    stats: { total_income: 800, total_expense: 100 }
  },
  {
    name: 'Euro',
    currency: 'EUR',
    balance: 300
  }
];

const Template = (args) => ({
  components: { WalletsStatsStrip },
  setup() {
    return { args, wallets };
  },
  template: `<WalletsStatsStrip v-bind="args" :wallets="wallets" />`
});

export const Default = Template.bind({});
Default.args = {
  defaultCurrency: 'USD'
};

export const Euro = Template.bind({});
Euro.args = {
  defaultCurrency: 'EUR'
};
