import CategoryDonut from './CategoryDonut.vue';

const data = [
  { name: 'Food', value: 400, color: '#ef4444' },
  { name: 'Rent', value: 600, color: '#3b82f6' }
];

describe('CategoryDonut', () => {
  it('renders ring and center', () => {
    cy.mount(CategoryDonut, { props: { data, total: 1000, centerLabel: 'Total', currency: 'USD', formatter: (n) => `$${n}` } });
    cy.get('.ring').should('exist');
    cy.get('.center-label').should('contain.text', 'Total');
    cy.get('.center-value').should('contain.text', '$1000');
  });

  it('renders legend items', () => {
    cy.mount(CategoryDonut, { props: { data, total: 1000 } });
    cy.get('.legend .leg').should('have.length', 2);
    cy.contains('.name', 'Food').should('exist');
    cy.contains('.pct', '40%').should('exist');
    cy.contains('.pct', '60%').should('exist');
  });

  it('computes gradient', () => {
    cy.mount(CategoryDonut, { props: { data, total: 1000 } });
    cy.get('.ring').should('have.attr', 'style').and('include', 'conic-gradient');
  });

  it('handles hover dimming', () => {
    cy.mount(CategoryDonut, { props: { data, total: 1000 } });
    cy.get('.leg').first().should('not.have.class', 'leg--dim');
  });
});
