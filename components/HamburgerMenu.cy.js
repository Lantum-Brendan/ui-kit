import HamburgerMenu from './HamburgerMenu.vue';

describe('HamburgerMenu', () => {
  it('renders three hamburger lines', () => {
    cy.mount(HamburgerMenu, { props: { isOpen: false } });
    cy.get('.hamburger-line').should('have.length', 3);
  });

  it('does not have is-active class when closed', () => {
    cy.mount(HamburgerMenu, { props: { isOpen: false } });
    cy.get('.hamburger-menu').should('not.have.class', 'is-active');
  });

  it('applies is-active class when open', () => {
    cy.mount(HamburgerMenu, { props: { isOpen: true } });
    cy.get('.hamburger-menu').should('have.class', 'is-active');
  });

  it('emits toggle when clicked', () => {
    const onToggle = cy.stub().as('toggle');
    cy.mount(HamburgerMenu, { props: { isOpen: false, onToggle } });
    cy.get('.hamburger-menu').click();
    cy.get('@toggle').should('have.been.called');
  });
});
