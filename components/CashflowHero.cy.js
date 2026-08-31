import CashflowHero from './CashflowHero.vue';

const totals = {
  net: 500,
  prevNet: 400,
  netDelta: 25,
  income: 2000,
  prevIncome: 1800,
  incomeDelta: 11,
  expense: 1500,
  prevExpense: 1400,
  expenseDelta: 7,
  savingsRate: 0.25,
  prevSavingsRate: 0.2,
  savingsRateDelta: 5
};

const trailing = [
  { income: 1800, expense: 1400, net: 400 },
  { income: 2000, expense: 1500, net: 500 }
];

describe('CashflowHero', () => {
  it('renders net for period with surplus', () => {
    cy.mount(CashflowHero, { props: { totals, trailing, currency: 'USD', formatter: (n) => `$${n}` } });
    cy.get('.hero').should('exist');
    cy.get('.hero-net').should('have.class', 'is-positive');
    cy.get('.net-pill').should('contain.text', 'Surplus');
    cy.get('.net-value').should('contain.text', '$500');
  });

  it('renders deficit when net negative', () => {
    const negTotals = { ...totals, net: -100 };
    cy.mount(CashflowHero, { props: { totals: negTotals, trailing } });
    cy.get('.hero-net').should('have.class', 'is-negative');
    cy.get('.net-pill').should('contain.text', 'Deficit');
  });

  it('renders income, expense, savingsRate stats', () => {
    cy.mount(CashflowHero, { props: { totals, trailing } });
    cy.contains('.sat-label', 'Income').should('exist');
    cy.contains('.sat-label', 'Expense').should('exist');
    cy.contains('.sat-label', 'Savings rate').should('exist');
    cy.get('.sat-value--in').should('exist');
    cy.get('.sat-value--out').should('exist');
  });

  it('hides vs compare when disabled', () => {
    cy.mount(CashflowHero, { props: { totals, trailing, compareEnabled: false } });
    cy.get('.whisper-line').should('not.exist');
    cy.get('.delta--lg').should('not.exist');
  });
});
