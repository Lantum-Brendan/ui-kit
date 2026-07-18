import SparkLine from './SparkLine.vue';

describe('SparkLine', () => {
  it('renders an svg with a line path for trend data', () => {
    cy.mount(SparkLine, {
      props: { values: [3, 5, 4, 7, 6, 9, 11], color: '#10b981' }
    });
    cy.get('svg.sparkline').should('exist');
    cy.get('path').should('have.length.greaterThan', 0);
  });

  it('includes a gradient fill area', () => {
    cy.mount(SparkLine, {
      props: { values: [3, 5, 4, 7], color: '#10b981' }
    });
    cy.get('linearGradient').should('exist');
    cy.get('path').first().should('have.attr', 'fill').and('include', 'url(#');
  });

  it('renders a last-point circle marker', () => {
    cy.mount(SparkLine, {
      props: { values: [3, 5, 4, 7], color: '#10b981' }
    });
    cy.get('circle').should('exist');
  });

  it('renders nothing meaningful for a single value', () => {
    cy.mount(SparkLine, {
      props: { values: [5], color: '#10b981' }
    });
    cy.get('svg.sparkline').should('exist');
    cy.get('circle').should('not.exist');
  });
});
