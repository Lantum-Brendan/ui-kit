import FinancialPositionView from '../components/FinancialPositionView.vue';

export default {
  title: 'Components/FinancialPositionView',
  component: FinancialPositionView,
  tags: ['autodocs'],
};

const position = {
  net_worth_delta: 1234,
  total_net_worth: 45200,
  cash_balance: 12000,
  holdings_value: 33200,
  earned_income: 5200,
  investment_returns: 800,
  gifts_received: 300,
  loan_received: 1000,
  debt_owed: 400,
  discretionary_spend: 3200,
  investment_principal: 900,
  loan_repayment: 500,
  debt_settled: 200,
};

export const Default = {
  args: {
    position,
    currency: 'USD',
    partial: false,
    unconvertedCurrencies: [],
    isLoading: false,
    activePreset: 'current_month',
  },
};

export const NoData = {
  args: {
    position: {
      net_worth_delta: 0,
      total_net_worth: 0,
      cash_balance: 0,
      holdings_value: 0,
      earned_income: 0,
      investment_returns: 0,
      gifts_received: 0,
      loan_received: 0,
      debt_owed: 0,
      discretionary_spend: 0,
      investment_principal: 0,
      loan_repayment: 0,
      debt_settled: 0,
    },
    currency: 'USD',
  },
};

export const PartialConversion = {
  args: {
    position,
    currency: 'USD',
    partial: true,
    unconvertedCurrencies: ['JPY', 'BRL'],
    isLoading: false,
  },
};

export const LoadingWithoutData = {
  args: {
    position: null,
    currency: 'USD',
    isLoading: true,
  },
};
