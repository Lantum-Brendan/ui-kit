import DashboardWalletSelector from './DashboardWalletSelector.vue';

describe('DashboardWalletSelector', () => {
  const wallets = [
    { id: 1, name: 'Main Wallet' },
    { id: 2, name: 'Savings' }
  ];

  it('shows All Wallets when selectedWalletId is null', () => {
    cy.mount(DashboardWalletSelector, { props: { selectedWalletId: null, wallets } });
    cy.get('.wallet-selector').should('exist');
    cy.get('.wallet-name').should('contain.text', 'All Wallets');
  });

  it('shows selected wallet name', () => {
    cy.mount(DashboardWalletSelector, { props: { selectedWalletId: 2, wallets } });
    cy.get('.wallet-name').should('contain.text', 'Savings');
  });

  it('toggles dropdown and lists options', () => {
    cy.mount(DashboardWalletSelector, { props: { selectedWalletId: null, wallets } });
    cy.get('.wallet-selector').click();
    // Teleported dropdown is appended to body, so query document
    cy.get('.wallet-dropdown').should('exist');
    cy.get('.wallet-option').should('have.length', 3); // All + 2 wallets
    cy.contains('.wallet-option', 'Main Wallet').should('exist');
  });

  it('emits select and update when option clicked', () => {
    const onSelect = cy.stub().as('select');
    const onUpdate = cy.stub().as('update');
    cy.mount(DashboardWalletSelector, {
      props: { selectedWalletId: null, wallets },
      attrs: { onSelect, 'onUpdate:selectedWalletId': onUpdate }
    });
    cy.get('.wallet-selector').click();
    cy.contains('.wallet-option', 'Savings').click();
    cy.get('@select').should('have.been.calledWith', 2);
    cy.get('@update').should('have.been.calledWith', 2);
    cy.get('.wallet-dropdown').should('not.exist');
  });

  it('uses custom allWalletsLabel', () => {
    cy.mount(DashboardWalletSelector, { props: { selectedWalletId: null, wallets, allWalletsLabel: 'Everywhere' } });
    cy.get('.wallet-name').should('contain.text', 'Everywhere');
  });
});
