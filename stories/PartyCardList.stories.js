import PartyCardList from '../components/PartyCardList.vue';

export default {
  title: 'Components/PartyCardList',
  component: PartyCardList,
  tags: ['autodocs'],
};

export const Default = { args: {
  parties: [{ id: 1, name: 'Acme Corp', type: 'business', description: 'Client', receivedAmount: 1200, spentAmount: 400 }, { id: 2, name: 'John Doe', type: 'individual', description: 'Friend', receivedAmount: 300, spentAmount: 800 }]
} };
export const Empty = { args: {
  parties: []
} };
export const Alternative = { args: {
  parties: [{ id: 3, name: 'Alt Party', type: 'individual', description: 'Alt', receivedAmount: 500, spentAmount: 100 }]
} };
