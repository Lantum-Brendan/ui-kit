import BudgetCard from './BudgetCard.vue';

export default {
  title: 'Components/BudgetCard',
  component: BudgetCard,
  tags: ['autodocs'],
};

const baseBudget = {
  id: 1,
  name: 'Groceries',
  amount: 500,
  currency: 'USD',
  period_type: 'monthly',
  start_date: '2026-01-01',
  targets: [],
  progress: { percent_used: 45, net_spent: 225, effective_limit: 500, remaining: 275, refunds: 0, status: 'ok', period_start: '2026-08-01' },
};
export const OnTrack = { args: { budget: baseBudget } };
export const NearLimit = { args: { budget: { ...baseBudget, name: 'Dining out', progress: { ...baseBudget.progress, percent_used: 85, net_spent: 425, remaining: 75, status: 'near_limit' } } } };
export const OverBudget = { args: { budget: { ...baseBudget, name: 'Entertainment', progress: { ...baseBudget.progress, percent_used: 110, net_spent: 550, remaining: -50, status: 'over_budget' } } } };

