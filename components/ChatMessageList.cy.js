import ChatMessageList from './ChatMessageList.vue';

const now = new Date().toISOString();
const messages = [
  { id: 1, user_id: 1, role: 'user', content: 'Hello', status: 'completed', format_hint: null, language: null, result: null, error: null, completed_at: now, created_at: now, updated_at: now },
  { id: 2, user_id: null, role: 'assistant', content: 'Hi there', status: 'completed', format_hint: null, language: null, result: null, error: null, completed_at: now, created_at: now, updated_at: now }
];

describe('ChatMessageList', () => {
  it('renders user and assistant rows', () => {
    cy.mount(ChatMessageList, { props: { messages } });
    cy.get('.chat-row').should('have.length', 2);
    cy.get('.chat-row.user').should('exist');
    cy.get('.chat-row.ai').should('exist');
    cy.get('.message-text').first().should('contain.text', 'Hello');
  });

  it('shows bubble with correct class for user', () => {
    cy.mount(ChatMessageList, { props: { messages } });
    cy.get('.bubble.user').should('contain.text', 'Hello');
    cy.get('.bubble.ai').should('contain.text', 'Hi there');
  });

  it('renders error when failed', () => {
    const failed = [{ ...messages[1], id: 3, status: 'failed', content: null, error: 'Oops failed' }];
    cy.mount(ChatMessageList, { props: { messages: failed } });
    cy.get('.error-text').should('contain.text', 'Oops failed');
  });

  it('shows source badge for smartql', () => {
    const withSource = [{ ...messages[1], id: 4, result: { source: 'smartql', format_type: 'scalar', rows: [{ total: 100 }] } }];
    cy.mount(ChatMessageList, { props: { messages: withSource } });
    cy.get('.source-badge').should('contain.text', 'data');
  });
});
