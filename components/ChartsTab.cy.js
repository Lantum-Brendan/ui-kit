import ChartsTab from './ChartsTab.vue';

const monthlyBuckets = [
  { month: '2026-01', income: 2000, expense: 1500, net: 500 },
  { month: '2026-02', income: 1800, expense: 1200, net: 600 }
];
const dailyBuckets = [
  { date: '2026-01-01', expense: 100 },
  { date: '2026-01-02', expense: 0 },
  { date: '2026-01-03', expense: 50 }
];
const expenseCategories = [
  { name: 'Food', amount: 500, color: '#ef4444' },
  { name: 'Rent', amount: 300, color: '#3b82f6' }
];
const incomeCategories = [
  { name: 'Salary', amount: 2000, color: '#10b981' }
];

describe('ChartsTab', () => {
  it('renders chart canvas and tabs', () => {
    cy.mount(ChartsTab, { props: { monthlyBuckets, dailyBuckets, expenseCategories, incomeCategories, currency: 'USD', formatter: (n) => `$${n}` } });
    cy.get('.charts-tab').should('exist');
    cy.get('.chart-canvas').should('exist');
    cy.get('.canvas-title').should('exist');
  });

  it('navigates with next/prev', () => {
    cy.mount(ChartsTab, { props: { monthlyBuckets, dailyBuckets, expenseCategories, incomeCategories } });
    const firstTitle = 'Cashflow';
    cy.get('.canvas-title').should('contain.text', firstTitle);
    cy.get('[aria-label="Next chart"]').click();
    cy.get('.canvas-title').should('not.contain.text', firstTitle);
    cy.get('[aria-label="Previous chart"]').click();
    cy.get('.canvas-title').should('contain.text', firstTitle);
  });

  it('selects via tab list', () => {
    cy.mount(ChartsTab, { props: { monthlyBuckets, dailyBuckets, expenseCategories, incomeCategories } });
    cy.contains('Cumulative net').click();
    cy.get('.canvas-title').should('contain.text', 'Cumulative net');
  });

  it('shows summary strip', () => {
    cy.mount(ChartsTab, { props: { monthlyBuckets, dailyBuckets, expenseCategories, incomeCategories } });
    cy.get('.summary-strip').should('exist');
    cy.get('.summary').should('have.length.at.least', 2);
  });
});
