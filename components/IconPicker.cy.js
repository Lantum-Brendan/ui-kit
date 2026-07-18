import IconPicker from './IconPicker.vue';

describe('IconPicker', () => {
  it('renders the search input with placeholder when empty', () => {
    cy.mount(IconPicker, { props: { modelValue: '' } });
    cy.get('.icon-search').should('have.attr', 'placeholder', 'Search an icon here');
  });

  it('hides the placeholder and shows a clear button when a value is set', () => {
    cy.mount(IconPicker, { props: { modelValue: 'Home' } });
    cy.get('.icon-search').should('have.attr', 'placeholder', '');
    cy.get('.clear-icon-btn').should('exist');
  });

  it('opens the icon grid when the dropdown toggle is clicked', () => {
    cy.mount(IconPicker, { props: { modelValue: '' } });
    cy.get('.icon-grid').should('not.exist');
    cy.get('.dropdown-toggle-btn').click();
    cy.get('.icon-grid').should('exist');
    cy.get('.icon-btn').should('have.length.greaterThan', 0);
  });

  it('emits update:modelValue when an icon is selected', () => {
    const onUpdate = cy.stub().as('update');
    cy.mount(IconPicker, { props: { modelValue: '', onUpdate } });
    cy.get('.dropdown-toggle-btn').click();
    cy.get('.icon-btn').first().click();
    cy.get('@update').should('have.been.called');
  });

  it('emits empty string when selection is cleared', () => {
    const onUpdate = cy.stub().as('update');
    cy.mount(IconPicker, { props: { modelValue: 'Home', onUpdate } });
    cy.get('.clear-icon-btn').click();
    cy.get('@update').should('have.been.calledWith', '');
  });
});
