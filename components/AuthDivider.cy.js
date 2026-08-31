import AuthDivider from './AuthDivider.vue';

describe('AuthDivider', () => {
  it('renders separator with OR text', () => {
    cy.mount(AuthDivider);
    cy.get('.separator').should('exist');
    cy.get('.text').should('contain.text', 'OR');
  });

  it('renders two lines', () => {
    cy.mount(AuthDivider);
    cy.get('.line').should('have.length', 2);
  });

  it('remains visible with layout', () => {
    cy.mount(AuthDivider);
    cy.get('.separator').should('be.visible');
  });
});
