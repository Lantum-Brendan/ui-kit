<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TransactionFormParties</h2>
    <TForm title="Transaction parties" submit-label="Save" cancel-label="Cancel">
      <TransactionFormParties
        :parties="parties"
        :wallets="wallets"
        :filtered-wallets="wallets"
        :labels="labels"
        :is-outcome-selected="true"
      />
    </TForm>
    <div style="margin-top:1rem"><TButton text="Action" variant="outline" :full-width="false" /></div>
  </div>
</template>

<script setup>
const parties = [
  { id: 1, name: 'Acme Ltd', label: 'Acme Ltd', value: 1 },
  { id: 2, name: 'Globex Corp', label: 'Globex Corp', value: 2 }
];
const wallets = [
  { id: 10, name: 'Main Wallet', label: 'Main Wallet', value: 10 },
  { id: 11, name: 'Savings', label: 'Savings', value: 11 }
];
const labels = {
  partySentTo: 'Sent to',
  partyReceivedFrom: 'Received from',
  searchParty: 'Search parties…',
  searchWallet: 'Search wallets…',
  walletSentFrom: 'Wallet sent from',
  walletReceivedTo: 'Wallet received to',
  walletError: 'Select a wallet',
  default: 'Default',
  defaultWallet: 'Default wallet'
};
</script>
