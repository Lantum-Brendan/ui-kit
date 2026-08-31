import TransactionFormRecurring from '../components/TransactionFormRecurring.vue';

export default {
  title: 'Components/TransactionFormRecurring',
  component: TransactionFormRecurring,
  tags: ['autodocs'],
};

const labels = {
  makeRecurring: 'Make recurring',
  recurrencePeriod: 'Recurrence period',
  repeatEvery: 'Repeat every',
  endDate: 'End date',
  optional: 'optional',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
};

export const Default = {
  args: {
    modelValue: false,
    period: 'monthly',
    interval: 1,
    endsAt: '',
    labels,
  },
};

export const WithProps = {
  args: {
    modelValue: true,
    period: 'weekly',
    interval: 2,
    endsAt: '2026-12-31',
    labels,
  },
};

export const Interactive = {
  args: {
    modelValue: true,
    period: 'monthly',
    interval: 1,
    endsAt: '2026-06-15',
    labels,
  },
};
