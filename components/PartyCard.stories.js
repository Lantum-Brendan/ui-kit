import PartyCard from './PartyCard.vue';

export default {
  title: 'Primitives/PartyCard',
  component: PartyCard,
  argTypes: {
    editLabel: { control: 'text' },
    deleteLabel: { control: 'text' },
    receivedLabel: { control: 'text' },
    spentLabel: { control: 'text' },
    lastActivityLabel: { control: 'text' }
  }
};

const business = {
  name: 'Acme Corp',
  type: 'business',
  description: 'A sample business party.',
  icon: 'Building2',
  receivedAmount: 1200,
  spentAmount: 400,
  lastUpdated: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
};

const individual = {
  name: 'Jane Doe',
  type: 'individual',
  description: 'A person.',
  icon: 'User',
  receivedAmount: 0,
  spentAmount: 0
};

const Template = (args) => ({
  components: { PartyCard },
  setup() {
    return { args, party: args.party };
  },
  template: `
    <PartyCard
      v-bind="args"
      :party="party"
      @edit="args.onEdit"
      @delete="args.onDelete"
    />
  `
});

export const Business = Template.bind({});
Business.args = {
  party: business,
  onEdit: () => {},
  onDelete: () => {}
};

export const Individual = Template.bind({});
Individual.args = {
  party: individual,
  onEdit: () => {},
  onDelete: () => {}
};
