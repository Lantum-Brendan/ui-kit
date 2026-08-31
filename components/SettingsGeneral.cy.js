import SettingsGeneral from './SettingsGeneral.vue';

describe('SettingsGeneral', () => {
  it('renders display mode with language and currency labels', () => {
    cy.mount(SettingsGeneral, { props: { isEditMode: false, initialLanguage: 'en', initialCurrency: 'USD' } });
    cy.get('.text-display').should('have.length', 2);
    cy.contains('.text-display', 'English').should('exist');
    cy.contains('.text-display', 'US Dollar').should('exist');
    cy.get('select.form-select').should('not.exist');
  });

  it('renders edit mode with selects', () => {
    cy.mount(SettingsGeneral, { props: { isEditMode: true, initialLanguage: 'en', initialCurrency: 'USD' } });
    cy.get('select.form-select').should('have.length', 2);
    cy.get('select.form-select').first().should('have.value', 'en');
  });

  it('shows french/euro display correctly', () => {
    cy.mount(SettingsGeneral, { props: { isEditMode: false, initialLanguage: 'fr', initialCurrency: 'EUR' } });
    cy.contains('.text-display', 'Français').should('exist');
    cy.contains('.text-display', 'Euro').should('exist');
  });

  it('emits save with updated values', () => {
    const onSave = cy.stub().as('save');
    cy.mount(SettingsGeneral, { props: { isEditMode: true, initialLanguage: 'en', initialCurrency: 'USD' }, attrs: { onSave } });
    cy.get('select.form-select').first().select('es');
    cy.get('select.form-select').last().select('EUR');
    cy.get('.submit-btn').click();
    cy.get('@save').should('have.been.called');
    cy.get('@save').its('firstCall.args.0').should('deep.equal', { language: 'es', currency: 'EUR' });
  });
});
