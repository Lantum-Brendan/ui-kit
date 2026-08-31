import TransactionFormParties from '../components/TransactionFormParties.vue';

export default {
  title: 'Components/TransactionFormParties',
  component: TransactionFormParties,
  tags: ['autodocs'],
};

const parties = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Acme Corp' },
];
const wallets = [
  { id: 1, name: 'Main Wallet' },
  { id: 2, name: 'Savings' },
  { id: 3, name: 'Cash' },
];
const labels = {
  partySentTo: 'Sent to',
  partyReceivedFrom: 'Received from',
  walletSentFrom: 'Sent from',
  walletReceivedTo: 'Received to',
  searchParty: 'Search party',
  searchWallet: 'Search wallet',
  walletError: 'Wallet is required',
  defaultWallet: 'Default wallet',
  default: 'Default',
};

export const Default = {
  args: {
    parties,
    wallets,
    filteredWallets: wallets,
    searchQuery: '',
    walletSearchQuery: '',
    selectedPartyId: null,
    selectedWalletId: null,
    labels,
    isOutcomeSelected: false,
    walletError: false,
    isWalletDefault: false,
  },
};

export const WithProps = {
  args: {
    parties,
    wallets,
    filteredWallets: wallets,
    searchQuery: 'Alice',
    walletSearchQuery: 'Main',
    selectedPartyId: 1,
    selectedWalletId: 1,
    labels,
    isOutcomeSelected: true,
    walletError: false,
    isWalletDefault: true,
  },
};

export const Interactive = {
  args: {
    parties,
    wallets,
    filteredWallets: wallets.slice(0, 2),
    searchQuery: 'Bob',
    walletSearchQuery: '',
    selectedPartyId: 2,
    selectedWalletId: 2,
    labels,
    isOutcomeSelected: true,
    walletError: 'Please select a wallet',
    isWalletDefault: false,
  },
};
