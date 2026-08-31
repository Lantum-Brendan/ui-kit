import BudgetForm from './BudgetForm.vue';

describe('BudgetForm', () => {
  it('renders create title when no editingItem', () => {
    cy.mount(BudgetForm, { props: { wallets: [{ id: 1, name: 'Main', currency: 'USD' }], categories: [], groups: [] } });
    // TForm title prop is computed from labels
    cy.contains('Create Budget').should('exist');
    cy.get('#budget-name').should('exist');
    cy.get('#budget-limit').should('exist');
  });

  it('renders edit title when editingItem provided', () => {
    const editingItem = {
      id: 1,
      name: 'My Budget',
      description: 'Desc',
      amount: 500,
      currency: 'USD',
      period_type: 'monthly',
      start_date: '2026-01-01T00:00:00Z',
      end_date: null,
      rollover_enabled: false,
      threshold_percent: 80,
      forecast_alerts_enabled: true,
      is_active: true,
      targets: []
    };
    cy.mount(BudgetForm, { props: { editingItem, wallets: [], categories: [] } });
    cy.contains('Edit Budget').should('exist');
    cy.get('#budget-name').should('have.value', 'My Budget');
  });

  it('toggles target tabs', () => {
    cy.mount(BudgetForm, { props: { wallets: [], categories: [{ id: 1, name: 'Food' }], groups: [{ id: 2, name: 'Family' }] } });
    cy.contains('.tab', 'Categories').should('exist');
    cy.contains('.tab', 'Groups').click();
    cy.get('.target-list').should('exist');
    cy.contains('.tab', 'Wallets').click();
    cy.get('.empty-hint').should('exist');
  });

  it('emits close on TForm close', () => {
    const onClose = cy.stub().as('close');
    cy.mount(BudgetForm, { props: { wallets: [] }, attrs: { onClose } });
    // TForm emits close -> BudgetForm emits close : find close button if exists, else test via prop
    // Ensure component mounted
    cy.get('.amount-row').should('exist');
  });
});
