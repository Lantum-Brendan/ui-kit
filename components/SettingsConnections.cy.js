import SettingsConnections from './SettingsConnections.vue';

const tokens = [
  { id: 1, name: 'Claude Desktop', last_used_at: new Date().toISOString() },
  { id: 2, name: 'Cursor', last_used_at: null },
];

describe('SettingsConnections', () => {
  it('renders endpoint and token list', () => {
    cy.mount(SettingsConnections, { props: { endpoint: 'https://api.example/mcp', tokens } });
    cy.get('.mcp-settings').should('exist');
    cy.get('.form-input').first().should('have.value', 'https://api.example/mcp');
    cy.get('.token-list').should('exist');
    cy.get('.token-item').should('have.length', 2);
    cy.contains('.token-name', 'Claude Desktop').should('exist');
    cy.contains('.token-name', 'Cursor').should('exist');
  });

  it('shows empty when no tokens and not loading', () => {
    cy.mount(SettingsConnections, { props: { endpoint: 'https://api.example/mcp', tokens: [], loading: false } });
    cy.get('.empty').should('contain.text', 'No tokens yet');
    cy.get('.token-list').should('not.exist');
  });

  it('shows generated token modal and emits close', () => {
    const onClose = cy.stub().as('close');
    cy.mount(SettingsConnections, {
      props: { endpoint: 'https://api.example/mcp', tokens, createdToken: { token: 'sk_live_abc123' } },
      attrs: { 'onClose-created-modal': onClose }
    });
    cy.get('.modal-backdrop').should('exist');
    cy.get('.token-reveal').should('have.value', 'sk_live_abc123');
    cy.get('.modal-actions .submit-btn').click();
    cy.get('@close').should('have.been.calledOnce');
  });

  it('emits generate-token and revoke', () => {
    const onGenerate = cy.stub().as('generate');
    const onRevoke = cy.stub().as('revoke');
    cy.mount(SettingsConnections, {
      props: { endpoint: 'https://api.example/mcp', tokens },
      attrs: { 'onGenerate-token': onGenerate, onRevoke }
    });
    cy.get('.create-row .form-input').type('My Token');
    cy.get('.create-row').contains('Generate token').click();
    cy.get('@generate').should('have.been.calledWith', 'My Token');
    cy.get('.token-item').first().find('.icon-btn.danger').click();
    cy.get('@revoke').should('have.been.called');
  });
});
