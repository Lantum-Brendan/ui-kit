import Logo from './Logo.vue';

describe('Logo', () => {
  it('renders the full logo SVG by default', () => {
    cy.mount(Logo, { props: { alt: 'Trakli Logo' } });
    cy.get('.logo svg').should('exist');
    cy.get('.logo svg g[clip-path]').should('exist');
  });

  it('applies the medium size class by default', () => {
    cy.mount(Logo, { props: {} });
    cy.get('.logo').should('have.class', 'logo-medium');
  });

  it('applies the requested size class', () => {
    cy.mount(Logo, { props: { size: 'large' } });
    cy.get('.logo').should('have.class', 'logo-large');
  });

  it('renders icon-only variant when variant=icon', () => {
    cy.mount(Logo, { props: { variant: 'icon' } });
    cy.get('.logo svg').should('exist');
    cy.get('.logo svg g[clip-path]').should('not.exist');
  });

  it('allows slot override', () => {
    cy.mount(Logo, {
      props: {},
      slots: {
        default: '<img src="custom-logo.png" alt="Custom" />'
      }
    });
    cy.get('.logo img').should('have.attr', 'src', 'custom-logo.png');
    cy.get('.logo svg').should('not.exist');
  });
});
