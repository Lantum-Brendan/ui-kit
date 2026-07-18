import Logo from './Logo.vue';

describe('Logo', () => {
  it('renders an image with the default logo path', () => {
    cy.mount(Logo, { props: { alt: 'Trakli Logo' } });
    cy.get('img.logo').should('have.attr', 'src', '/logo.svg');
    cy.get('img.logo').should('have.attr', 'alt', 'Trakli Logo');
  });

  it('applies the medium size class by default', () => {
    cy.mount(Logo, { props: {} });
    cy.get('img.logo').should('have.class', 'logo-medium');
  });

  it('applies the requested size class', () => {
    cy.mount(Logo, { props: { size: 'large' } });
    cy.get('img.logo').should('have.class', 'logo-large');
  });
});
