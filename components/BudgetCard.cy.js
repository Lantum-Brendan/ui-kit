import BudgetCard from './BudgetCard.vue';

const baseBudget = {
  id: 1,
  name: 'Groceries',
  currency: 'USD',
  amount: 1000,
  period_type: 'monthly',
  start_date: '2026-01-01',
  targets: [],
  progress: {
    percent_used: 45,
    net_spent: 450,
    effective_limit: 1000,
    remaining: 550,
    refunds: 0,
    status: 'ok',
    period_start: '2026-01-01'
  }
};

const overBudget = {
  ...baseBudget,
  name: 'Over Budget Test',
  progress: { ...baseBudget.progress, percent_used: 120, status: 'over_budget', remaining: -200 }
};

describe('BudgetCard', () => {
  it('renders budget name and period', () => {
    cy.mount(BudgetCard, { props: { budget: baseBudget, labels: { edit: 'Edit', delete: 'Delete', allTransactionsInPeriod: 'All', of: 'of', remaining: 'Remaining', refundsAppliedThisPeriod: 'Refunds' } } });
    cy.get('.budget-card__name').should('contain.text', 'Groceries');
    cy.get('.status-chip').should('contain.text', 'On Track');
    cy.get('.progress-fill').should('exist');
  });

  it('shows Over Budget status', () => {
    cy.mount(BudgetCard, { props: { budget: overBudget } });
    cy.get('.status-chip--over').should('exist');
    cy.get('.status-chip').should('contain.text', 'Over Budget');
    cy.get('.remaining-value.negative').should('exist');
  });

  it('emits edit and delete', () => {
    const onEdit = cy.stub().as('edit');
    const onDelete = cy.stub().as('delete');
    cy.mount(BudgetCard, { props: { budget: baseBudget }, attrs: { onEdit, onDelete } });
    cy.get('[aria-label="Edit"]').click();
    cy.get('@edit').should('have.been.calledOnce');
    cy.get('[aria-label="Delete"]').click();
    cy.get('@delete').should('have.been.calledOnce');
  });

  it('renders progress meta and remaining', () => {
    cy.mount(BudgetCard, { props: { budget: baseBudget } });
    cy.get('.progress-meta').should('contain.text', '45%');
    cy.get('.remaining-label').should('contain.text', 'Remaining');
  });
});
