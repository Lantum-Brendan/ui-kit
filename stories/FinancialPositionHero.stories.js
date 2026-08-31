import FinancialPositionHero from '../components/FinancialPositionHero.vue';

export default {
  title: 'Components/FinancialPositionHero',
  component: FinancialPositionHero,
  tags: ['autodocs'],
};

const positionPositive = {
  net_worth_delta: 1234.56,
  total_net_worth: 45200,
  cash_balance: 12000,
  holdings_value: 33200,
};
const positionNegative = {
  net_worth_delta: -890.12,
  total_net_worth: 30000,
  cash_balance: 8000,
  holdings_value: 22000,
};
const labels = {
  netWorthChange: 'Net worth change',
  building: 'Building',
  shrinking: 'Shrinking',
  heroSub: 'Your financial position this month',
  moneyIn: 'Money in',
  moneyOut: 'Money out',
  totalNetWorthNow: 'Total net worth now',
  cash: 'Cash',
  holdings: 'Holdings',
};

export const Default = {
  args: {
    position: positionPositive,
    currency: 'USD',
    labels,
    totalIn: 5000,
    totalOut: 3200,
  },
};

export const Shrinking = {
  args: {
    position: positionNegative,
    currency: 'USD',
    labels,
    totalIn: 2000,
    totalOut: 2890,
  },
};

export const EUR = {
  args: {
    position: positionPositive,
    currency: 'EUR',
    labels,
    totalIn: 6000,
    totalOut: 4000,
  },
};
