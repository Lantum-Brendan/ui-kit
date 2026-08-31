import ChatComposer from './ChatComposer.vue';

describe('ChatComposer', () => {
  it('renders textarea with placeholder', () => {
    cy.mount(ChatComposer, { props: { modelValue: '' } });
    cy.get('.chat-input').should('exist');
    cy.get('.chat-input').should('have.attr', 'placeholder', 'Ask me anything about your finances...');
    cy.get('.attach-btn').should('exist');
    cy.get('.send-btn').should('exist');
  });

  it('renders custom placeholder', () => {
    cy.mount(ChatComposer, { props: { modelValue: '', labels: { placeholder: 'Custom placeholder', attachFile: 'Attach', send: 'Send', remove: 'Remove' } } });
    cy.get('.chat-input').should('have.attr', 'placeholder', 'Custom placeholder');
  });

  it('emits update:modelValue on input', () => {
    const onUpdate = cy.stub().as('update');
    cy.mount(ChatComposer, { props: { modelValue: '', 'onUpdate:modelValue': onUpdate } });
    cy.get('.chat-input').type('hello');
    cy.get('@update').should('have.been.called');
  });

  it('disables send when empty and no files', () => {
    cy.mount(ChatComposer, { props: { modelValue: '', disabled: false } });
    cy.get('.send-btn').should('be.disabled');
    cy.mount(ChatComposer, { props: { modelValue: 'hi', disabled: false } });
    cy.get('.send-btn').should('not.be.disabled');
  });

  it('disables all when disabled prop true', () => {
    cy.mount(ChatComposer, { props: { modelValue: 'hi', disabled: true } });
    cy.get('.chat-input').should('be.disabled');
    cy.get('.attach-btn').should('be.disabled');
    cy.get('.send-btn').should('be.disabled');
  });

  it('emits submit on enter without shift and on send button', () => {
    const onSubmit = cy.stub().as('submit');
    cy.mount(ChatComposer, { props: { modelValue: 'hello', 'onUpdate:modelValue': () => {} }, attrs: { onSubmit } });
    // click send
    cy.get('.send-btn').click();
    cy.get('@submit').should('have.been.calledOnce');
    // press enter
    cy.get('.chat-input').type('{enter}');
    cy.get('@submit').should('have.been.calledTwice');
  });

  it('toggles attach popover on plus button click', () => {
    cy.mount(ChatComposer, { props: { modelValue: '' } });
    cy.get('.attach-btn').click();
    // popover teleported to body
    cy.get('body').find('.attach-pop').should('exist');
    cy.get('body').find('.attach-backdrop').should('exist');
    cy.get('body').find('.attach-backdrop').click({ force: true });
    cy.get('body').find('.attach-pop').should('not.exist');
  });
});
