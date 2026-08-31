import ChatExperience from './ChatExperience.vue';

describe('ChatExperience', () => {
  const baseLabels = {
    heroTitle: 'What can I help with?',
    heroSubtitle: 'Ask about your money',
    toggleHistory: 'Toggle history',
    newChat: 'New chat',
    assistant: 'Assistant',
    fullscreen: 'Full screen',
    exitFullscreen: 'Exit full screen',
    canvas: {}
  };

  it('renders hero when no messages', () => {
    cy.mount(ChatExperience, { props: { mode: 'landing', messages: [], labels: baseLabels } });
    cy.get('.chat-experience').should('exist');
    cy.get('.hero').should('exist');
    cy.get('.hero-title').should('contain.text', 'What can I help with?');
    cy.get('.hero-subtitle').should('contain.text', 'Ask about your money');
  });

  it('renders suggestions and emits suggestion event', () => {
    const onSuggestion = cy.stub().as('suggestion');
    const onUpdateModelValue = cy.stub().as('update');
    cy.mount(ChatExperience, {
      props: {
        mode: 'landing',
        messages: [],
        suggestions: [{ text: 'Show spending', icon: 'Wallet' }, { text: 'Income report', icon: null }],
        labels: baseLabels,
        'onUpdate:modelValue': onUpdateModelValue
      },
      attrs: { onSuggestion }
    });
    cy.get('.suggestion').should('have.length', 2);
    cy.contains('.suggestion', 'Show spending').click();
    cy.get('@suggestion').should('have.been.calledWith', 'Show spending');
    cy.get('@update').should('have.been.calledWith', 'Show spending');
  });

  it('shows conversation work area when messages exist', () => {
    cy.mount(ChatExperience, {
      props: {
        mode: 'landing',
        messages: [{ id: 1, text: 'hello' }],
        labels: baseLabels
      }
    });
    cy.get('.work').should('exist');
    cy.get('.conversation').should('exist');
    cy.get('.chat-header').should('exist');
  });

  it('emits new-chat from header', () => {
    const onNewChat = cy.stub().as('newChat');
    cy.mount(ChatExperience, {
      props: { mode: 'landing', messages: [{ id: 1 }], labels: baseLabels },
      attrs: { onNewChat }
    });
    cy.get('.header-actions button').first().click();
    cy.get('@newChat').should('have.been.calledOnce');
  });
});
