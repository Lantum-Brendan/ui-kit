import PartyDetailContent from './PartyDetailContent.vue';

const party = {
  id: 1,
  name: 'Acme Corp',
  type: 'business',
  icon: 'Building2',
  description: 'Test desc',
  receivedAmount: 5200,
  spentAmount: 3100,
};

const labels = {
  backToList: 'Back',
  edit: 'Edit',
  delete: 'Delete',
  received: 'Received',
  spent: 'Spent',
  net: 'Net',
  lastSixMonths: 'Last 6 months',
  activity: 'Activity',
  noActivity: 'No activity',
  recentTransactions: 'Recent',
  shown: 'shown',
  viewAll: 'View all',
  noTransactions: 'No transactions',
  transaction: 'Transaction',
  individual: 'Individual',
  business: 'Business',
  organization: 'Organization',
  vendor: 'Vendor',
  client: 'Client',
  party: 'Party',
};

const formatter = (n) => `$${n}`;

describe('PartyDetailContent', () => {
  it('renders hero with name and type', () => {
    cy.mount(PartyDetailContent, { props: { party, labels, formatter, transactions: [] } });
    cy.get('.detail-body').should('exist');
    cy.get('.hero-name').should('contain.text', 'Acme Corp');
    cy.get('.hero-type').should('contain.text', 'Business');
    cy.get('.hero-desc').should('contain.text', 'Test desc');
  });

  it('renders totals with formatted values and net tone', () => {
    cy.mount(PartyDetailContent, { props: { party, labels, formatter, transactions: [] } });
    cy.contains('.total-label', 'Received').should('exist');
    cy.contains('.total-value', '$5200').should('exist');
    cy.contains('.total-value', '$3100').should('exist');
    cy.get('.total--net .total-value').should('contain.text', '$2100');
    cy.get('.total--net .total-value').should('have.class', 'tone-income');
  });

  it('emits edit, delete and back', () => {
    const onEdit = cy.stub().as('edit');
    const onDelete = cy.stub().as('delete');
    const onBack = cy.stub().as('back');
    cy.mount(PartyDetailContent, {
      props: { party, labels, formatter, showBack: true, transactions: [] },
      attrs: { onEdit, onDelete, onBack }
    });
    cy.get('.hero-action').first().click();
    cy.get('@edit').should('have.been.calledWith', party);
    cy.get('.hero-action--danger').click();
    cy.get('@delete').should('have.been.calledWith', party);
    cy.get('.back-btn').click();
    cy.get('@back').should('have.been.calledOnce');
  });

  it('shows recent transactions and emits view-all', () => {
    const txs = [
      { id: 1, partyId: 1, amount: 500, type: 'income', category: 'Sales', date: '2026-04-10' },
      { id: 2, partyId: 1, amount: 120, type: 'expense', category: 'Supplies', date: '2026-04-08' },
    ];
    const onViewAll = cy.stub().as('viewAll');
    cy.mount(PartyDetailContent, { props: { party, labels, formatter, transactions: txs }, attrs: { 'onView-all': onViewAll } });
    cy.get('.recent-list').should('exist');
    cy.get('.recent-row').should('have.length', 2);
    cy.get('.recent-link').click();
    cy.get('@viewAll').should('have.been.calledWith', party.id);
  });
});
