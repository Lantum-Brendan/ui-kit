import ChatQuestionBlock from './ChatQuestionBlock.vue';

describe('ChatQuestionBlock', () => {
  it('renders prompt and options', () => {
    cy.mount(ChatQuestionBlock, { props: { prompt: 'Pick one?', options: [{ label: 'Yes', message: 'yes-msg' }, { label: 'No', message: 'no-msg' }] } });
    cy.get('.chat-question-block').should('exist');
    cy.get('.question-prompt').should('contain.text', 'Pick one?');
    cy.get('.question-option').should('have.length', 2);
  });

  it('emits select with message on option click', () => {
    const onSelect = cy.stub().as('select');
    cy.mount(ChatQuestionBlock, { props: { prompt: 'Choose', options: [{ label: 'A', message: 'msgA' }] }, attrs: { onSelect } });
    cy.get('.question-option').click();
    cy.get('@select').should('have.been.calledWith', 'msgA');
  });

  it('falls back to label when message missing', () => {
    const onSelect = cy.stub().as('select');
    cy.mount(ChatQuestionBlock, { props: { prompt: 'Q', options: [{ label: 'OnlyLabel' }] }, attrs: { onSelect } });
    cy.get('.question-option').click();
    cy.get('@select').should('have.been.calledWith', 'OnlyLabel');
  });

  it('renders empty when no options', () => {
    cy.mount(ChatQuestionBlock, { props: { prompt: 'Empty', options: [] } });
    cy.get('.question-option').should('have.length', 0);
  });
});
