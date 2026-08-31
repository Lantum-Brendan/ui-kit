import CategoriesTab from './CategoriesTab.vue';

export default {
  title: 'Components/CategoriesTab',
  component: CategoriesTab,
  tags: ['autodocs'],
};

const incomeCategories = [
  { name: 'Salary', amount: 4000, count: 2, percentage: 60, delta: 5, color: '#10b981', trend: [10, 20, 15, 30], prevAmount: 3800 },
  { name: 'Freelance', amount: 1800, count: 5, percentage: 27, delta: -2, color: '#3b82f6', trend: [5, 12, 18, 10], prevAmount: 1900 },
];
const expenseCategories = [
  { name: 'Food', amount: 320, count: 12, percentage: 22, delta: 8, color: '#f59e0b', trend: [4, 8, 12, 10], prevAmount: 295 },
  { name: 'Rent', amount: 1200, count: 1, percentage: 45, delta: 0, color: '#ef4444', trend: [10, 10, 10, 10], prevAmount: 1200 },
  { name: 'Transport', amount: 180, count: 8, percentage: 12, delta: -5, color: '#8b5cf6', trend: [6, 4, 7, 5], prevAmount: 190 },
];

export const Default = { args: { incomeCategories, expenseCategories, currency: 'USD' } };
export const EmptyIncome = { args: { incomeCategories: [], expenseCategories, currency: 'USD' } };
export const NoCompare = { args: { incomeCategories, expenseCategories, compareEnabled: false, currency: 'USD' } };
