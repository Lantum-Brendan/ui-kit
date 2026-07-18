import LoadingSkeleton from './LoadingSkeleton.vue';

describe('LoadingSkeleton', () => {
  it('renders default variant with count lines', () => {
    cy.mount(LoadingSkeleton, { props: { variant: 'default', count: 3 } });
    cy.get('.skeleton-line').should('have.length', 3);
  });

  it('renders list variant with avatars', () => {
    cy.mount(LoadingSkeleton, { props: { variant: 'list', count: 2 } });
    cy.get('.skeleton-list').should('exist');
    cy.get('.skeleton-item').should('have.length', 2);
    cy.get('.skeleton-avatar').should('have.length', 2);
  });

  it('renders card variant', () => {
    cy.mount(LoadingSkeleton, { props: { variant: 'card' } });
    cy.get('.skeleton-card').should('exist');
    cy.get('.skeleton-header').should('exist');
  });

  it('renders table variant with rows and columns', () => {
    cy.mount(LoadingSkeleton, { props: { variant: 'table', count: 2, columns: 3 } });
    cy.get('.skeleton-th').should('have.length', 3);
    cy.get('.skeleton-table-row').should('have.length', 2);
    cy.get('.skeleton-td').should('have.length', 6);
  });
});
