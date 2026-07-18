import ViewToggle from './ViewToggle.vue';

describe('ViewToggle', () => {
  it('marks the table button active when modelValue is table', () => {
    cy.mount(ViewToggle, { props: { modelValue: 'table' } });
    cy.get('.toggle-btn').first().should('have.class', 'active');
    cy.get('.toggle-btn').last().should('not.have.class', 'active');
  });

  it('marks the cards button active when modelValue is cards', () => {
    cy.mount(ViewToggle, { props: { modelValue: 'cards' } });
    cy.get('.toggle-btn').last().should('have.class', 'active');
  });

  it('emits update:modelValue with table when table button clicked', () => {
    const onUpdateModelValue = cy.stub().as('update');
    cy.mount(ViewToggle, { props: { modelValue: 'cards', 'onUpdate:modelValue': onUpdateModelValue } });
    cy.get('.toggle-btn').first().click();
    cy.get('@update').should('have.been.calledWith', 'table');
  });

  it('emits update:modelValue with cards when cards button clicked', () => {
    const onUpdateModelValue = cy.stub().as('update');
    cy.mount(ViewToggle, { props: { modelValue: 'table', 'onUpdate:modelValue': onUpdateModelValue } });
    cy.get('.toggle-btn').last().click();
    cy.get('@update').should('have.been.calledWith', 'cards');
  });

  it('renders tooltip titles from props', () => {
    cy.mount(ViewToggle, {
      props: { tableTitle: 'Table view', cardsTitle: 'Card view' }
    });
    cy.get('.toggle-btn').first().should('have.attr', 'title', 'Table view');
    cy.get('.toggle-btn').last().should('have.attr', 'title', 'Card view');
  });
});
