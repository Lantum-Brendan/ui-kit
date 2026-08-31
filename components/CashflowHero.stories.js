import CashflowHero from './CashflowHero.vue';

export default {
  title: 'Components/CashflowHero',
  component: CashflowHero,
  tags: ['autodocs'],
};

const totals = {
  net: 1240,
  prevNet: 980,
  netDelta: 26,
  income: 3200,
  prevIncome: 3000,
  incomeDelta: 7,
  expense: 1960,
  prevExpense: 2020,
  expenseDelta: -3,
  savingsRate: 0.39,
  prevSavingsRate: 0.33,
  savingsRateDelta: 6,
};
const trailing = [
  { income: 2800, expense: 1900, net: 900 },
  { income: 3000, expense: 2020, net: 980 },
  { income: 3200, expense: 1960, net: 1240 },
];

export const Default = { args: { totals, trailing, compareEnabled: true, currency: 'USD' } };
export const NoCompare = { args: { totals, trailing, compareEnabled: false, currency: 'USD' } };
export const Deficit = { args: { totals: { ...totals, net: -400, prevNet: -200 }, trailing: trailing.map((t) => ({ ...t, net: -200 })), compareEnabled: true, currency: 'USD' } };
