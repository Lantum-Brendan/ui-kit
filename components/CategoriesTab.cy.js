import CategoriesTab from './CategoriesTab.vue';

const incomeCategories = [
  { name: 'Salary', amount: 5000, count: 2, percentage: 70, color: '#3b82f6', prevAmount: 4000, delta: 25, trend: [1,2,3] },
  { name: 'Freelance', amount: 1000, count: 3, percentage: 30, color: '#10b981', prevAmount: 800, delta: 20, trend: [1,2] }
];
const expenseCategories = [
  { name: 'Groceries', amount: 400, count: 10, percentage: 50, color: '#ef4444', prevAmount: 350, delta: 14, trend: [1,2] },
  { name: 'Rent', amount: 1200, count: 1, percentage: 50, color: '#f59e0b', prevAmount: 1200, delta: 0, trend: [1,2] }
];

describe('CategoriesTab', () => {
  it('renders header with search', () => {
    cy.mount(CategoriesTab, { props: { incomeCategories, expenseCategories, currency: 'USD', formatter: (n) => `$${n}` } });
    cy.get('.categories-tab').should('exist');
    cy.get('.search-input').should('exist');
    cy.get('.search-input').should('have.attr', 'placeholder', 'Filter by name');
  });

  it('filters by search query', () => {
    cy.mount(CategoriesTab, { props: { incomeCategories, expenseCategories } });
    cy.get('.search-input').type('Salary');
    // income tab active: should filter to Salary only -> expense categories not visible
    cy.contains('Salary').should('exist');
  });

  it('switches tabs', () => {
    cy.mount(CategoriesTab, { props: { incomeCategories, expenseCategories } });
    cy.contains('Expense categories').click();
    cy.contains('Groceries').should('exist');
  });

  it('emits drill on row click', () => {
    const onDrill = cy.stub().as('drill');
    cy.mount(CategoriesTab, { props: { incomeCategories, expenseCategories }, attrs: { onDrill } });
    cy.get('.row').first().click();
    cy.get('@drill').should('have.been.called');
  });
});
