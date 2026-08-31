import { h } from 'vue';
import TCard from './TCard.vue';

describe('TCard', () => {
  it('renders body slot content', () => {
    cy.mount(TCard, { slots: { default: () => 'Body content' } });
    cy.get('.t-card').should('exist');
    cy.get('.t-card-body').should('contain.text', 'Body content');
    cy.get('.t-card-header').should('not.exist');
    cy.get('.t-card-footer').should('not.exist');
  });

  it('renders header and footer slots', () => {
    cy.mount(TCard, {
      slots: {
        header: () => 'Header Title',
        default: () => 'Main body',
        footer: () => 'Footer actions'
      }
    });
    cy.get('.t-card-header').should('contain.text', 'Header Title');
    cy.get('.t-card-footer').should('contain.text', 'Footer actions');
  });

  it('renders with only header', () => {
    cy.mount(TCard, { slots: { header: () => 'Only header', default: () => 'Body' } });
    cy.get('.t-card-header').should('exist');
    cy.get('.t-card-footer').should('not.exist');
  });

  it('applies card styling and hover structure', () => {
    cy.mount(TCard, { slots: { default: () => h('p', 'test') } });
    cy.get('.t-card').should('exist');
    cy.get('.t-card-body p').should('contain.text', 'test');
  });
});
