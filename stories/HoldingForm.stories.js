import HoldingForm from '../components/HoldingForm.vue';

export default {
  title: 'Components/HoldingForm',
  component: HoldingForm,
  tags: ['autodocs'],
};

export const AddMode = {
  args: {
    open: true,
    editing: null,
    submitting: false,
    defaultCurrency: 'USD',
  },
};

export const EditMode = {
  args: {
    open: true,
    editing: {
      name: 'Bitcoin',
      symbol: 'BTC',
      quantity: 0.5,
      currency: 'USD',
      unit_price: 42000,
      price_source: 'manual',
      provider: null,
      external_ref: null,
    },
    submitting: false,
    defaultCurrency: 'USD',
  },
};

export const AutoPriced = {
  args: {
    open: true,
    editing: null,
    submitting: false,
    defaultCurrency: 'EUR',
    searchResults: [
      { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
      { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
    ],
  },
};

export const SubmittingState = {
  args: {
    open: true,
    editing: null,
    submitting: true,
    defaultCurrency: 'USD',
  },
};
