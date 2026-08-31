import ChatMarkdownBlock from './ChatMarkdownBlock.vue';

describe('ChatMarkdownBlock', () => {
  it('renders markdown headings and bold', () => {
    cy.mount(ChatMarkdownBlock, { props: { text: '# Hello\n\nThis is **bold** text' } });
    cy.get('.chat-markdown').should('exist');
    cy.get('.chat-markdown h1').should('contain.text', 'Hello');
    cy.get('.chat-markdown strong').should('contain.text', 'bold');
  });

  it('renders empty when text missing', () => {
    cy.mount(ChatMarkdownBlock, { props: { text: '' } });
    cy.get('.chat-markdown').should('exist');
    cy.get('.chat-markdown').invoke('html').should('not.contain', '<h1>');
  });

  it('renders list and link via markdown-it', () => {
    cy.mount(ChatMarkdownBlock, { props: { text: '- item one\n- item two\n\n[link](https://example.com)' } });
    cy.get('.chat-markdown li').should('have.length', 2);
    cy.get('.chat-markdown a').should('have.attr', 'href', 'https://example.com');
  });

  it('escapes raw HTML when html:false', () => {
    cy.mount(ChatMarkdownBlock, { props: { text: '<script>alert(1)</script> safe' } });
    cy.get('.chat-markdown').should('not.contain.html', '<script>');
    cy.get('.chat-markdown').should('contain.text', 'safe');
  });
});
