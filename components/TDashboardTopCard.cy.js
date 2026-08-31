import TDashboardTopCard from './TDashboardTopCard.vue';

describe('TDashboardTopCard', () => {
  it('renders overview title and subtitle', () => {
    cy.mount(TDashboardTopCard, { props: { showFilters: true, periodSubtitle: 'Mar 1 — Mar 31, 2026' } });
    cy.get('.hero').should('exist');
    cy.get('.hero-title').should('contain.text', 'Overview');
    cy.get('.hero-sub').should('contain.text', 'Mar 1 — Mar 31, 2026');
  });

  it('renders period chips and emits period-change', () => {
    const onPeriodChange = cy.stub().as('periodChange');
    cy.mount(TDashboardTopCard, {
      props: { showFilters: true, activePeriod: 'current_month', isCustomActive: false },
      attrs: { 'onPeriod-change': onPeriodChange }
    });
    cy.get('.chip').should('have.length', 4);
    cy.contains('.chip', 'This month').should('have.class', 'chip--active');
    cy.contains('.chip', 'Last month').click();
    cy.get('@periodChange').should('have.been.calledWith', 'last_month');
  });

  it('emits toggle-custom and highlights custom active', () => {
    const onToggle = cy.stub().as('toggle');
    cy.mount(TDashboardTopCard, { props: { showFilters: true, isCustomActive: true, customOpen: true }, attrs: { 'onToggle-custom': onToggle } });
    cy.get('.chip--custom').should('have.class', 'chip--active');
    cy.get('.chip-icon--rotated').should('exist');
    cy.get('.chip--custom').click();
    cy.get('@toggle').should('have.been.calledOnce');
  });

  it('hides filters when showFilters false', () => {
    cy.mount(TDashboardTopCard, { props: { showFilters: false } });
    cy.get('.hero-controls').should('not.exist');
  });
});
