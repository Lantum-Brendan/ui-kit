import FormSection from './FormSection.vue';

describe('FormSection', () => {
  it('renders three tab buttons with correct default active', () => {
    cy.mount(FormSection);
    cy.get('.transaction-tabs').should('exist');
    cy.get('.tab-button').should('have.length', 3);
    cy.contains('.tab-button', 'Expense').should('have.class', 'active');
    cy.contains('.tab-button', 'Income').should('not.have.class', 'active');
  });

  it('emits tab-change income when clicking income', () => {
    const onTabChange = cy.stub().as('tabChange');
    cy.mount(FormSection, { attrs: { onTabChange } });
    cy.contains('.tab-button', 'Income').click();
    cy.get('@tabChange').should('have.been.calledWith', 'income');
    cy.contains('.tab-button', 'Income').should('have.class', 'active');
  });

  it('emits tab-change transfer and toggles active', () => {
    const onTabChange = cy.stub().as('tabChange');
    cy.mount(FormSection, { attrs: { onTabChange } });
    cy.contains('.tab-button', 'Transfer').click();
    cy.get('@tabChange').should('have.been.calledWith', 'transfer');
    cy.contains('.tab-button', 'Transfer').should('have.class', 'active');
  });

  it('disables tabs when isSubmitting', () => {
    cy.mount(FormSection, { props: { isSubmitting: true } });
    cy.get('.tab-button').each(($el) => {
      cy.wrap($el).should('be.disabled');
    });
  });

  it('watches editingItem and switches to income', () => {
    cy.mount(FormSection, { props: { editingItem: { type: 'INCOME' } } });
    cy.contains('.tab-button', 'Income').should('have.class', 'active');
  });
});
