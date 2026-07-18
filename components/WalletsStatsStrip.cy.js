import WalletsStatsStrip from './WalletsStatsStrip.vue';

const wallets = [
  {
    name: 'Main',
    currency: 'USD',
    balance: 1000,
    stats: { total_income: 500, total_expense: 200 }
  },
  {
    name: 'Savings',
    currency: 'USD',
    balance: 2500,
    stats: { total_income: 800, total_expense: 100 }
  }
];

describe('WalletsStatsStrip', () => {
  it('renders four stat cards', () => {
    cy.mount(WalletsStatsStrip, { props: { wallets, defaultCurrency: 'USD' } });
    cy.get('.stat').should('have.length', 4);
  });

  it('renders localized labels from the labels prop', () => {
    cy.mount(WalletsStatsStrip, { props: { wallets, defaultCurrency: 'USD' } });
    cy.get('.stat-label').eq(0).should('contain.text', 'Wallets');
    cy.get('.stat-label').eq(1).should('contain.text', 'Total balance');
    cy.get('.stat-label').eq(2).should('contain.text', 'Top earner');
    cy.get('.stat-label').eq(3).should('contain.text', 'Top spend');
  });

  it('supports custom labels via prop', () => {
    cy.mount(WalletsStatsStrip, {
      props: {
        wallets,
        defaultCurrency: 'USD',
        labels: {
          wallets: 'Carteras',
          inCur: '{n} en {cur}',
          totalBalance: 'Saldo total',
          acrossN: 'Entre {n} cartera(s) {cur}',
          noCurYet: 'Sin carteras {cur}',
          topEarner: 'Mayor ingreso',
          noIncomeYet: 'Sin ingresos',
          topSpend: 'Mayor gasto',
          noSpendYet: 'Sin gastos'
        }
      }
    });
    cy.get('.stat-label').eq(0).should('contain.text', 'Carteras');
    cy.get('.stat-label').eq(1).should('contain.text', 'Saldo total');
  });

  it('computes balance and top earner/spender values', () => {
    cy.mount(WalletsStatsStrip, { props: { wallets, defaultCurrency: 'USD' } });
    cy.get('.stat-value').eq(1).should('contain.text', '3500');
    cy.get('.stat-value').eq(2).should('contain.text', 'Savings');
    cy.get('.stat-value').eq(3).should('contain.text', 'Main');
  });
});
