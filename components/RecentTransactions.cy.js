import RecentTransactions from './RecentTransactions.vue';

const txs = [
  { id: 1, type: 'EXPENSE', party: 'Starbucks', category: 'Dining', amount: '$5.40', date: new Date().toISOString().split('T')[0] },
  { id: 2, type: 'INCOME', party: 'Acme Corp', category: 'Salary', amount: '$3,000', date: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
  { id: 3, type: 'EXPENSE', party: 'Uber', category: 'Transport', amount: '$18.20', date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0] },
];

describe('RecentTransactions', () => {
  it('renders header and respects limit', () => {
    cy.mount(RecentTransactions, { props: { transactions: txs, limit: 2 } });
    cy.get('.recent-transactions').should('exist');
    cy.get('.title').should('contain.text', 'Recent Transactions');
    cy.get('.transaction-row').should('have.length', 2);
  });

  it('shows empty state when no transactions', () => {
    cy.mount(RecentTransactions, { props: { transactions: [] } });
    cy.get('.empty-state').should('contain.text', 'No transactions yet');
    cy.get('.transaction-row').should('not.exist');
  });

  it('emits view-all when view all clicked', () => {
    const onViewAll = cy.stub().as('viewAll');
    cy.mount(RecentTransactions, { props: { transactions: txs }, attrs: { 'onView-all': onViewAll } });
    cy.get('.view-all-btn').click();
    cy.get('@viewAll').should('have.been.calledOnce');
  });

  it('emits click-txn when row clicked and renders income/expense tones', () => {
    const onClickTxn = cy.stub().as('clickTxn');
    cy.mount(RecentTransactions, { props: { transactions: txs }, attrs: { 'onClick-txn': onClickTxn } });
    cy.get('.transaction-row').first().click();
    cy.get('@clickTxn').should('have.been.called');
    cy.get('.txn-amount.expense').should('exist');
    cy.get('.txn-amount.income').should('exist');
  });
});
