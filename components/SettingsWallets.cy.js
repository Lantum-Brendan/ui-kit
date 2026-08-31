import SettingsWallets from './SettingsWallets.vue';

const wallets = [
  { id: 1, name: 'Main Wallet', currency: 'USD' },
  { id: 2, name: 'Euro Wallet', currency: 'EUR' },
];
const groups = [
  { id: 10, name: 'Personal' },
  { id: 20, name: 'Business' },
];

describe('SettingsWallets', () => {
  it('renders display mode with wallet and group labels', () => {
    cy.mount(SettingsWallets, { props: { isEditMode: false, wallets, groups, defaultWalletId: 1, defaultGroupId: 10 } });
    cy.get('.text-display').should('contain.text', 'Main Wallet');
    cy.get('.wallet-badge').should('contain.text', 'Currently Selected');
    cy.contains('.text-display', 'Personal').should('exist');
    cy.get('select.form-select').should('not.exist');
  });

  it('renders edit mode with selects and toggle', () => {
    cy.mount(SettingsWallets, { props: { isEditMode: true, wallets, groups, defaultWalletId: 1, defaultGroupId: null, allowNegativeBalance: false } });
    cy.get('select.form-select').should('have.length', 2);
    cy.get('select.form-select').first().should('have.value', '1');
    cy.get('.toggle-switch input').should('exist').and('not.be.checked');
  });

  it('emits save with updated wallet, group and allowNegative', () => {
    const onSave = cy.stub().as('save');
    cy.mount(SettingsWallets, {
      props: { isEditMode: true, wallets, groups, defaultWalletId: 1, defaultGroupId: 10, allowNegativeBalance: false },
      attrs: { onSave }
    });
    cy.get('select.form-select').first().select('2');
    cy.get('.toggle-switch input').check({ force: true });
    cy.get('.submit-btn').click();
    cy.get('@save').should('have.been.called');
    cy.get('@save').its('firstCall.args.0').should('deep.include', { allowNegativeBalance: true });
    cy.get('@save').its('firstCall.args.0.walletId').should('eq', 2);
  });

  it('shows — when no wallet selected and no badge', () => {
    cy.mount(SettingsWallets, { props: { isEditMode: false, wallets, groups, defaultWalletId: null, defaultGroupId: null } });
    cy.get('.text-display').first().should('contain.text', '—');
    cy.get('.wallet-badge').should('not.exist');
  });
});
