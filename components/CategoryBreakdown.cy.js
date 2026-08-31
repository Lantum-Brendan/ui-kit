import CategoryBreakdown from './CategoryBreakdown.vue';

const emptyStats = { category_breakdown: { expense_categories: [] } };
const stats = {
  category_breakdown: {
    expense_categories: [
      { category: 'Food', amount: 500 },
      { category: 'Transport', amount: 300 },
      { category: 'Entertainment', amount: 200 }
    ]
  }
};

describe('CategoryBreakdown', () => {
  it('shows empty when no data', () => {
    cy.mount(CategoryBreakdown, { props: { statistics: emptyStats } });
    cy.get('.empty-state').should('contain.text', 'No expense data available');
  });

  it('renders donut with data', () => {
    cy.mount(CategoryBreakdown, { props: { statistics: stats, defaultCurrency: 'USD' } });
    cy.get('.donut').should('exist');
    cy.get('.center-value').should('exist');
    cy.get('.chart-legend .legend-item').should('have.length', 3);
  });

  it('switches to bar chart', () => {
    cy.mount(CategoryBreakdown, { props: { statistics: stats } });
    cy.get('.tab-btn').eq(1).click();
    cy.get('.bar-chart').should('exist');
    cy.get('.bar-column').should('have.length', 3);
  });

  it('switches to line chart', () => {
    cy.mount(CategoryBreakdown, { props: { statistics: stats } });
    cy.get('.tab-btn').eq(2).click();
    cy.get('.line-chart').should('exist');
  });
});
