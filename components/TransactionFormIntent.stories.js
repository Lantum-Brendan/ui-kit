import TransactionFormIntent from './TransactionFormIntent.vue';

export default {
  title: 'Components/TransactionFormIntent',
  component: TransactionFormIntent,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'select', options: ['regular', 'loan_received', 'loan_repayment', 'gift'] },
  },
};

const options = [
  { value: 'regular', label: 'Regular' },
  { value: 'loan_received', label: 'Loan Received' },
  { value: 'loan_repayment', label: 'Loan Repayment' },
  { value: 'gift', label: 'Gift' },
];

const labels = {
  intentLabels: {
    regular: 'Regular',
    loan_received: 'Loan Received',
    loan_repayment: 'Loan Repayment',
    gift: 'Gift',
  },
};

export const Default = {
  args: {
    modelValue: 'regular',
    options,
    label: 'Intent',
    labels,
  },
};

export const WithLoan = {
  args: {
    modelValue: 'loan_received',
    options,
    label: 'Intent - Loan',
    labels,
  },
};

export const Interactive = {
  args: {
    modelValue: 'gift',
    options: [
      ...options,
      { value: 'investment_buy', label: 'Investment Buy' },
      { value: 'investment_return', label: 'Investment Return' },
    ],
    label: 'Select intent',
    labels,
  },
};
