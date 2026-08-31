import AuthFooterLink from './AuthFooterLink.vue';

describe('AuthFooterLink', () => {
  it('renders text and link', () => {
    cy.mount(AuthFooterLink, { props: { text: 'Already have an account?', linkText: 'Sign in', to: '/login' } });
    cy.get('.auth-footer-link').should('contain.text', 'Already have an account?');
    cy.get('.auth-footer-link a').should('contain.text', 'Sign in');
    cy.get('.auth-footer-link a').should('have.attr', 'href', '/login');
  });

  it('renders different props', () => {
    cy.mount(AuthFooterLink, { props: { text: "Don't have an account?", linkText: 'Sign up', to: '/register' } });
    cy.get('.auth-footer-link').should('contain.text', "Don't have an account?");
    cy.get('a').should('have.attr', 'href', '/register');
  });

  it('link is accessible', () => {
    cy.mount(AuthFooterLink, { props: { text: 'Need help?', linkText: 'Contact', to: '/contact' } });
    cy.get('a').should('exist');
  });
});
