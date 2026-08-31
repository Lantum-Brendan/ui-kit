import DashboardQuickActionModal from './DashboardQuickActionModal.vue';

describe('DashboardQuickActionModal', () => {
  it('renders log modal with toggles and emits close', () => {
    const onClose = cy.stub().as('close');
    cy.mount(DashboardQuickActionModal, {
      props: { action: 'log', wallets: [], parties: [] },
      attrs: { onClose }
    });
    cy.get('.qa-overlay').should('exist');
    cy.get('.qa-title').should('contain.text', 'Log a transaction');
    cy.get('.qa-toggle').should('have.length', 2);
    cy.get('.qa-close').click();
    cy.get('@close').should('have.been.calledOnce');
  });

  it('toggles expense/income active state', () => {
    cy.mount(DashboardQuickActionModal, { props: { action: 'log' } });
    cy.get('.qa-toggle').first().should('have.class', 'active');
    cy.contains('.qa-toggle', 'Income').click();
    cy.contains('.qa-toggle', 'Income').should('have.class', 'active');
    cy.get('.qa-toggle').first().should('not.have.class', 'active');
  });

  it('enables submit for log when amount >0 and emits submit', () => {
    const onSubmit = cy.stub().as('submit');
    cy.mount(DashboardQuickActionModal, {
      props: { action: 'log' },
      attrs: { onSubmit }
    });
    cy.get('.qa-submit').should('be.disabled');
    cy.get('.qa-input').first().type('25');
    cy.get('.qa-submit').should('not.be.disabled');
    cy.get('.qa-submit').click();
    cy.get('@submit').should('have.been.calledOnce');
    cy.get('@submit').its('firstCall.args.0').should('have.property', 'action', 'log');
  });

  it('renders transfer validation requiring wallets and rate for cross-currency', () => {
    const wallets = [
      { id: 1, name: 'USD wallet', currency: 'USD' },
      { id: 2, name: 'EUR wallet', currency: 'EUR' }
    ];
    cy.mount(DashboardQuickActionModal, { props: { action: 'transfer', wallets } });
    cy.get('.qa-title').should('contain.text', 'Transfer money');
    // initially disabled because from/to missing
    cy.get('.qa-submit').should('be.disabled');
  });

  it('renders report and import variants', () => {
    cy.mount(DashboardQuickActionModal, { props: { action: 'report' } });
    cy.get('.qa-title').should('contain.text', 'Build a report');
    cy.get('.qa-input').should('exist');
    cy.mount(DashboardQuickActionModal, { props: { action: 'import' } });
    cy.get('.qa-title').should('contain.text', 'Import a document');
    cy.get('.qa-file').should('exist');
  });
});
