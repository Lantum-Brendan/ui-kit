import { h } from 'vue';
import TNavbar from './TNavbar.vue';

const StubTheme = { name: 'ThemeSelector', template: '<div class="stub-theme"></div>' };
const StubLang = { name: 'LanguageSelector', template: '<div class="stub-lang"></div>' };

describe('TNavbar', () => {
  it('renders navbar with action buttons', () => {
    cy.mount(TNavbar, {
      props: { isMobile: false, isSidebarOpen: false },
      global: { stubs: { ThemeSelector: StubTheme, LanguageSelector: StubLang } }
    });
    cy.get('.navbar').should('exist');
    cy.get('.add-transaction-btn').should('exist');
    cy.get('.info-btn').should('exist');
  });

  it('shows hamburger menu in mobile mode and emits toggle-sidebar', () => {
    const onToggle = cy.stub().as('toggle');
    cy.mount(TNavbar, {
      props: { isMobile: true, isSidebarOpen: false },
      attrs: { 'onToggle-sidebar': onToggle },
      global: { stubs: { ThemeSelector: StubTheme, LanguageSelector: StubLang } }
    });
    cy.get('.navbar-left').should('exist');
    cy.get('.navbar').should('exist');
    cy.get('.navbar-left button').first().click({ force: true });
    cy.get('@toggle').should('have.been.calledOnce');
  });

  it('emits add-transaction and open-learning', () => {
    const onAdd = cy.stub().as('add');
    const onLearn = cy.stub().as('learn');
    cy.mount(TNavbar, {
      attrs: { 'onAdd-transaction': onAdd, 'onOpen-learning': onLearn },
      global: { stubs: { ThemeSelector: StubTheme, LanguageSelector: StubLang } }
    });
    cy.get('.add-transaction-btn').click();
    cy.get('@add').should('have.been.calledOnce');
    cy.get('.info-btn').click();
    cy.get('@learn').should('have.been.calledOnce');
  });

  it('hides hamburger when not mobile', () => {
    cy.mount(TNavbar, {
      props: { isMobile: false },
      global: { stubs: { ThemeSelector: StubTheme, LanguageSelector: StubLang } }
    });
    cy.get('.navbar').should('exist');
    cy.get('.navbar-left').should('exist');
    cy.get('.navbar-right').should('exist');
  });
});
