import TDivider from './TDivider.vue';

describe('TDivider', () => {
  it('renders horizontal by default', () => {
    cy.mount(TDivider);
    cy.get('.t-divider').should('exist');
    cy.get('.t-divider').should('have.class', 't-divider--horizontal');
    cy.get('.t-divider').should('have.attr', 'role', 'separator');
    cy.get('.t-divider').should('have.attr', 'aria-orientation', 'horizontal');
  });

  it('renders vertical orientation', () => {
    cy.mount(TDivider, { props: { orientation: 'vertical' } });
    cy.get('.t-divider').should('have.class', 't-divider--vertical');
    cy.get('.t-divider').should('have.attr', 'aria-orientation', 'vertical');
  });

  it('switches orientation classes correctly', () => {
    cy.mount(TDivider, { props: { orientation: 'horizontal' } });
    cy.get('.t-divider').should('have.class', 't-divider--horizontal').and('not.have.class', 't-divider--vertical');
    cy.mount(TDivider, { props: { orientation: 'vertical' } });
    cy.get('.t-divider').should('have.class', 't-divider--vertical').and('not.have.class', 't-divider--horizontal');
  });
});
