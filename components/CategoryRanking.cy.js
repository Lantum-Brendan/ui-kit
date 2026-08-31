import CategoryRanking from './CategoryRanking.vue';

const buckets = [
  { name: 'Food', amount: 500, count: 12, percentage: 50, color: '#ef4444', delta: 10, prevAmount: 450, trend: [10,20,30], rank: 1 },
  { name: 'Rent', amount: 300, count: 1, percentage: 30, color: '#3b82f6', delta: -5, prevAmount: 320, trend: [5,5,5], rank: 2 }
];

describe('CategoryRanking', () => {
  it('renders card with title', () => {
    cy.mount(CategoryRanking, { props: { title: 'Top Categories', subtitle: '2 categories', buckets, currency: 'USD', formatter: (n) => `$${n}` } });
    cy.get('.card').should('exist');
    cy.get('.card-title').should('contain.text', 'Top Categories');
    cy.get('.card-sub').should('contain.text', '2 categories');
  });

  it('renders empty when no buckets', () => {
    cy.mount(CategoryRanking, { props: { buckets: [], labels: { empty: 'No spending in this period', tx: '{n} tx' } } });
    cy.get('.empty').should('contain.text', 'No spending in this period');
    cy.get('.rank-list').should('not.exist');
  });

  it('renders rows with name and amount', () => {
    cy.mount(CategoryRanking, { props: { buckets, formatter: (n) => `$${n}` } });
    cy.get('.rank-list .row').should('have.length', 2);
    cy.contains('.row-name', 'Food').should('exist');
    cy.contains('.row-amount', '$500').should('exist');
    cy.get('.row-fill').first().should('have.attr', 'style').and('include', '100%');
  });

  it('emits drill on row click', () => {
    const onDrill = cy.stub().as('drill');
    cy.mount(CategoryRanking, { props: { buckets }, attrs: { onDrill } });
    cy.get('.row').first().click();
    cy.get('@drill').should('have.been.calledOnce');
    cy.get('@drill').should('have.been.calledWith', buckets[0]);
  });
});
