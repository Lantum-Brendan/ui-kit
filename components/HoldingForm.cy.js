import HoldingForm from './HoldingForm.vue';

describe('HoldingForm', () => {
  it('does not render when open false', () => {
    cy.mount(HoldingForm, { props: { open: false } });
    cy.get('.modal-root').should('not.exist');
  });

  it('renders add title when open and no editing', () => {
    cy.mount(HoldingForm, { props: { open: true, editing: null } });
    cy.get('.modal-root').should('exist');
    cy.get('.t-form__title').should('contain.text', 'Add holding');
  });

  it('renders edit title when editing provided', () => {
    cy.mount(HoldingForm, {
      props: {
        open: true,
        editing: { name: 'Bitcoin', symbol: 'BTC', quantity: 0.5, currency: 'USD', unit_price: 50000, price_source: 'manual', provider: null, external_ref: null }
      }
    });
    cy.get('.t-form__title').should('contain.text', 'Edit holding');
  });

  it('validates required fields and emits submit when valid', () => {
    const onSubmit = cy.stub().as('submit');
    cy.mount(HoldingForm, { props: { open: true }, attrs: { onSubmit } });
    // submit with empty name should not emit
    cy.get('.t-form').submit();
    cy.get('@submit').should('not.have.been.called');
    // fill valid data
    cy.get('#holding-name').type('Apple stock');
    cy.get('#holding-quantity').clear().type('10');
    cy.get('.t-form').submit();
    cy.get('@submit').should('have.been.calledOnce');
    cy.get('@submit').its('firstCall.args.0').should('have.property', 'name', 'Apple stock');
  });

  it('shows coin search and emits search', () => {
    const onSearch = cy.stub().as('search');
    cy.mount(HoldingForm, { props: { open: true, searchResults: [] }, attrs: { onSearch } });
    // switch to auto
    cy.contains('.seg-btn', 'Live').click();
    cy.get('#holding-coin').should('exist');
    cy.get('#holding-coin').type('bit');
    cy.get('@search').should('have.been.called');
  });

  it('shows coin results and picks a coin', () => {
    const results = [{ id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' }];
    cy.mount(HoldingForm, { props: { open: true, searchResults: results } });
    cy.contains('.seg-btn', 'Live').click();
    cy.get('.coin-option').should('contain.text', 'BTC');
    cy.get('.coin-option').click();
    cy.get('.coin-picked').should('contain.text', 'bitcoin');
  });
});
