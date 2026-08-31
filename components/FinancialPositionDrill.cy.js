import FinancialPositionDrill from './FinancialPositionDrill.vue';

const group = { label: 'Earned income', eyebrow: 'Money in', metric: '$5,000', tone: 'brand', intents: ['regular'] };

describe('FinancialPositionDrill', () => {
  it('does not render when open false', () => {
    cy.mount(FinancialPositionDrill, { props: { open: false, group, rows: [] } });
    cy.get('.drawer-root').should('not.exist');
  });

  it('renders header when open true', () => {
    cy.mount(FinancialPositionDrill, { props: { open: true, group, rows: [] } });
    cy.get('.drawer-root').should('exist');
    cy.get('.head-title').should('contain.text', 'Earned income');
    cy.get('.detail-metric').should('contain.text', '$5,000');
  });

  it('shows loading skeleton when isLoading', () => {
    cy.mount(FinancialPositionDrill, { props: { open: true, group, rows: [], isLoading: true } });
    cy.get('.drawer-body').should('exist');
  });

  it('shows empty when no rows', () => {
    cy.mount(FinancialPositionDrill, { props: { open: true, group, rows: [], isLoading: false } });
    cy.get('.drawer-empty').should('exist');
    cy.get('.drawer-empty').should('contain.text', 'No transactions');
  });

  it('renders rows grouped into buckets', () => {
    const rows = [
      { id: '1', intent: 'regular', type: 'income', title: 'Salary', meta: 'Jan 2026', amount: '$3,000', amountNum: 3000, currency: 'USD' }
    ];
    cy.mount(FinancialPositionDrill, { props: { open: true, group, rows } });
    cy.get('.row-list').should('exist');
    cy.get('.row').should('have.length', 1);
    cy.get('.row-title').should('contain.text', 'Salary');
    cy.get('.row-amount').should('contain.text', '+');
  });

  it('emits close on close buttons and overlay', () => {
    const onClose = cy.stub().as('close');
    cy.mount(FinancialPositionDrill, { props: { open: true, group, rows: [] }, attrs: { onClose } });
    cy.get('.icon-btn').first().click();
    cy.get('@close').should('have.been.called');
  });
});
