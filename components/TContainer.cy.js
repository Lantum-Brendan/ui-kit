import { h } from 'vue';
import TContainer from './TContainer.vue';

describe('TContainer', () => {
  it('renders with default lg size and gutter', () => {
    cy.mount(TContainer, { slots: { default: () => 'Content' } });
    cy.get('.t-container').should('exist');
    cy.get('.t-container').should('have.class', 't-container--lg');
    cy.get('.t-container').should('have.class', 't-container--gutter');
    cy.get('.t-container').should('contain.text', 'Content');
  });

  it('applies size classes', () => {
    cy.mount(TContainer, { props: { size: 'sm' } });
    cy.get('.t-container').should('have.class', 't-container--sm');
    cy.mount(TContainer, { props: { size: 'xl' } });
    cy.get('.t-container').should('have.class', 't-container--xl');
    cy.mount(TContainer, { props: { size: 'full' } });
    cy.get('.t-container').should('have.class', 't-container--full');
  });

  it('toggles gutter', () => {
    cy.mount(TContainer, { props: { gutter: false } });
    cy.get('.t-container').should('not.have.class', 't-container--gutter');
    cy.mount(TContainer, { props: { gutter: true } });
    cy.get('.t-container').should('have.class', 't-container--gutter');
  });

  it('renders slotted children', () => {
    cy.mount(TContainer, { slots: { default: () => h('div', { class: 'inner' }, 'Inner') } });
    cy.get('.inner').should('contain.text', 'Inner');
  });
});
