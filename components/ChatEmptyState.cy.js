import ChatEmptyState from './ChatEmptyState.vue';

describe('ChatEmptyState', () => {
  it('renders heading and subtitle', () => {
    cy.mount(ChatEmptyState);
    cy.get('.empty-chat').should('exist');
    cy.get('.empty-chat h3').should('contain.text', 'Ask about your finances');
    cy.get('.empty-chat p').should('contain.text', 'Or try one of these');
  });

  it('renders suggestion buttons', () => {
    cy.mount(ChatEmptyState);
    cy.get('.suggestions .suggestion').should('have.length', 4);
    cy.get('.suggestions .suggestion').first().should('contain.text', 'How much');
  });

  it('emits pick when suggestion clicked', () => {
    const onPick = cy.stub().as('pick');
    cy.mount(ChatEmptyState, { attrs: { onPick } });
    cy.get('.suggestion').first().click();
    cy.get('@pick').should('have.been.calledOnce');
  });

  it('uses custom labels when provided', () => {
    cy.mount(ChatEmptyState, { props: { labels: { askAboutFinances: 'Custom title', tryOneOfThese: 'Custom subtitle', suggestions: {} } } });
    cy.get('h3').should('contain.text', 'Custom title');
    cy.get('p').should('contain.text', 'Custom subtitle');
  });
});
