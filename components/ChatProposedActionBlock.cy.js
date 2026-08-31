import ChatProposedActionBlock from './ChatProposedActionBlock.vue';

const baseBlock = {
  summary: 'Add transaction: Coffee $5',
  risk: 'low',
  status: 'pending',
  fields: [
    { key: 'amount', label: 'Amount', type: 'number', value: 5 },
    { key: 'description', label: 'Description', type: 'text', value: 'Coffee' }
  ]
};

describe('ChatProposedActionBlock', () => {
  it('renders summary and pending form with inputs', () => {
    cy.mount(ChatProposedActionBlock, { props: { block: baseBlock } });
    cy.get('.proposed-action').should('exist');
    cy.get('.pa-summary').should('contain.text', 'Coffee');
    cy.get('.pa-form').should('exist');
    cy.get('.pa-input').should('have.length', 2);
    cy.get('.pa-confirm').should('contain.text', 'Confirm');
    cy.get('.pa-reject').should('contain.text', 'Dismiss');
  });

  it('applies risk-high class for high risk', () => {
    cy.mount(ChatProposedActionBlock, { props: { block: { ...baseBlock, risk: 'high' } } });
    cy.get('.proposed-action').should('have.class', 'risk-high');
  });

  it('emits confirm with overrides and reject', () => {
    const onConfirm = cy.stub().as('confirm');
    const onReject = cy.stub().as('reject');
    cy.mount(ChatProposedActionBlock, {
      props: { block: baseBlock },
      attrs: { onConfirm, onReject }
    });
    cy.get('.pa-confirm').click();
    cy.get('@confirm').should('have.been.calledOnce');
    cy.get('@confirm').its('firstCall.args.0').should('have.property', 'overrides');
    cy.get('.pa-reject').click();
    cy.get('@reject').should('have.been.calledOnce');
  });

  it('shows executed status when not pending', () => {
    cy.mount(ChatProposedActionBlock, {
      props: { block: { ...baseBlock, status: 'executed', fields: [{ label: 'Amount', value: '$5', display: '$5' }] } }
    });
    cy.get('.pa-status').should('have.class', 'is-executed');
    cy.get('.pa-status').should('contain.text', 'Done');
    cy.get('.pa-fields').should('exist');
  });

  it('disables buttons when busy', () => {
    cy.mount(ChatProposedActionBlock, { props: { block: baseBlock, busy: true } });
    cy.get('.pa-confirm').should('be.disabled');
    cy.get('.pa-reject').should('be.disabled');
  });
});
