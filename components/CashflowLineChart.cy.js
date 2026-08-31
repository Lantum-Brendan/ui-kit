import CashflowLineChart from './CashflowLineChart.vue';

const data = [
  { label: 'Jan', income: 2000, expense: 1500, net: 500 },
  { label: 'Feb', income: 1800, expense: 1200, net: 600 },
  { label: 'Mar', income: 2200, expense: 1600, net: 600 }
];

describe('CashflowLineChart', () => {
  it('renders chart svg', () => {
    cy.mount(CashflowLineChart, { props: { data, currency: 'USD', formatter: (n) => `$${n}` } });
    cy.get('.chart').should('exist');
    cy.get('svg.svg').should('exist');
    cy.get('.line--income').should('exist');
    cy.get('.line--expense').should('exist');
    cy.get('.line--net').should('exist');
  });

  it('renders legend', () => {
    cy.mount(CashflowLineChart, { props: { data } });
    cy.get('.legend').should('exist');
    cy.get('.legend').should('contain.text', 'Income');
    cy.get('.legend').should('contain.text', 'Expense');
    cy.get('.legend').should('contain.text', 'Net');
  });

  it('renders y grid and x labels', () => {
    cy.mount(CashflowLineChart, { props: { data } });
    cy.get('.grid').should('exist');
    cy.get('.axis').should('exist');
  });

  it('renders axes with data labels', () => {
    cy.mount(CashflowLineChart, { props: { data } });
    cy.contains('.axis', 'Jan').should('exist');
  });
});
