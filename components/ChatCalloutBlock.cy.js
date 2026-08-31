import ChatCalloutBlock from './ChatCalloutBlock.vue';

describe('ChatCalloutBlock', () => {
  it('renders info variant by default', () => {
    cy.mount(ChatCalloutBlock, { props: { text: 'Hello info' } });
    cy.get('.chat-callout-block').should('have.class', 'is-info');
    cy.get('.callout-text').should('contain.text', 'Hello info');
  });

  it('renders success variant with title', () => {
    cy.mount(ChatCalloutBlock, { props: { text: 'Done', title: 'Success!', variant: 'success' } });
    cy.get('.chat-callout-block').should('have.class', 'is-success');
    cy.get('.callout-title').should('contain.text', 'Success!');
    cy.get('.callout-icon').should('exist');
  });

  it('falls back to info for invalid variant', () => {
    cy.mount(ChatCalloutBlock, { props: { text: 'Fallback', variant: 'unknown' } });
    cy.get('.chat-callout-block').should('have.class', 'is-info');
  });

  it('renders warning and danger', () => {
    cy.mount(ChatCalloutBlock, { props: { text: 'Warn', variant: 'warning' } });
    cy.get('.chat-callout-block').should('have.class', 'is-warning');
    cy.mount(ChatCalloutBlock, { props: { text: 'Danger', variant: 'danger' } });
    cy.get('.chat-callout-block').should('have.class', 'is-danger');
  });
});
