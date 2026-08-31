import ChatListBlock from './ChatListBlock.vue';

describe('ChatListBlock', () => {
  it('renders title and list items', () => {
    cy.mount(ChatListBlock, { props: { title: 'Recent', items: [{ title: 'Coffee', amount: 5, currency: 'USD', category: 'Food' }, { title: 'Salary', amount: 2000, currency: 'USD' }] } });
    cy.get('.chat-list-block').should('exist');
    cy.get('.block-title').should('contain.text', 'Recent');
    cy.get('.list-item').should('have.length', 2);
  });

  it('shows primary, secondary and trailing values', () => {
    cy.mount(ChatListBlock, { props: { items: [{ title: 'Rent', date: '2024-01-01', amount: 1200, currency: 'USD' }] } });
    cy.get('.list-title').should('contain.text', 'Rent');
    cy.get('.list-secondary').should('contain.text', '2024-01-01');
    cy.get('.list-trailing').should('contain.text', '1,200');
    cy.get('.list-trailing').should('contain.text', 'USD');
  });

  it('handles fallback when items empty', () => {
    cy.mount(ChatListBlock, { props: { items: [] } });
    cy.get('.list-item').should('have.length', 0);
  });

  it('renders dash for empty primary', () => {
    cy.mount(ChatListBlock, { props: { items: [{}] } });
    cy.get('.list-title').should('contain.text', '-');
  });
});
