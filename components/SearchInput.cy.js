import SearchInput from './SearchInput.vue';

describe('SearchInput', () => {
  it('renders an input with the default placeholder when none provided', () => {
    cy.mount(SearchInput, { props: { placeholder: '' } });
    cy.get('.search-input').should('have.attr', 'placeholder', 'Search...');
  });

  it('renders a custom placeholder when provided', () => {
    cy.mount(SearchInput, { props: { placeholder: 'Search wallets...' } });
    cy.get('.search-input').should('have.attr', 'placeholder', 'Search wallets...');
  });

  it('emits update:modelValue on input (debounced)', () => {
    const onUpdate = cy.stub().as('update');
    cy.mount(SearchInput, { props: { modelValue: '', debounce: 100, onUpdate } });
    cy.get('.search-input').type('rent');
    cy.wait(150);
    cy.get('@update').should('have.been.calledWith', 'rent');
  });

  it('renders the search icon', () => {
    cy.mount(SearchInput, { props: {} });
    cy.get('.search-icon').should('exist');
  });
});
