import { h } from 'vue';
import TEmptyState from './TEmptyState.vue';
import { Inbox } from 'lucide-vue-next';

describe('TEmptyState', () => {
  it('renders title and description', () => {
    cy.mount(TEmptyState, { props: { title: 'No results', description: 'Try adjusting filters' } });
    cy.get('.t-empty-state').should('exist');
    cy.get('.t-empty-state__title').should('contain.text', 'No results');
    cy.get('.t-empty-state__description').should('contain.text', 'Try adjusting filters');
  });

  it('hides title/description when not provided', () => {
    cy.mount(TEmptyState, { props: { title: '', description: '' } });
    cy.get('.t-empty-state__title').should('not.exist');
    cy.get('.t-empty-state__description').should('not.exist');
  });

  it('renders icon when provided', () => {
    cy.mount(TEmptyState, { props: { title: 'Empty', icon: Inbox } });
    cy.get('.t-empty-state__icon-wrap').should('exist');
    cy.get('.t-empty-state__icon').should('exist');
  });

  it('renders action slot', () => {
    cy.mount(TEmptyState, {
      props: { title: 'No wallets yet', description: 'Create one' },
      slots: { action: () => h('button', { class: 'action-btn' }, 'Create wallet') }
    });
    cy.get('.t-empty-state__action').should('exist');
    cy.get('.action-btn').should('contain.text', 'Create wallet');
  });
});
