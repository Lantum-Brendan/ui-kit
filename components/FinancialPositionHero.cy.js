import FinancialPositionHero from './FinancialPositionHero.vue';

const labels = {
  netWorthChange: 'Net worth change',
  building: 'Building',
  shrinking: 'Shrinking',
  heroSub: 'Hero subtitle',
  moneyIn: 'Money in',
  moneyOut: 'Money out',
  totalNetWorthNow: 'Total net worth now',
  cash: 'Cash',
  holdings: 'Holdings'
};

const positionPositive = {
  net_worth_delta: 1200.5,
  total_net_worth: 15000,
  cash_balance: 8000,
  holdings_value: 7000
};

const positionNegative = {
  net_worth_delta: -500,
  total_net_worth: 9000,
  cash_balance: 4000,
  holdings_value: 5000
};

describe('FinancialPositionHero', () => {
  it('renders hero with positive delta and building pill', () => {
    cy.mount(FinancialPositionHero, {
      props: { position: positionPositive, currency: 'USD', labels, totalIn: 5000, totalOut: 3800 }
    });
    cy.get('.fp-hero').should('exist');
    cy.get('.fp-hero').should('have.class', 'surface--income');
    cy.contains('.eyebrow', 'Net worth change').should('exist');
    cy.get('.fp-hero-value').should('contain.text', '+');
    cy.contains('.fp-hero-pill', 'Building').should('exist');
    cy.contains('.fp-scale-label', 'Money in').should('exist');
    cy.contains('.fp-scale-label', 'Money out').should('exist');
  });

  it('renders negative delta with shrinking and expense surface', () => {
    cy.mount(FinancialPositionHero, {
      props: { position: positionNegative, currency: 'EUR', labels, totalIn: 3000, totalOut: 3500 }
    });
    cy.get('.fp-hero').should('have.class', 'surface--expense');
    cy.contains('.fp-hero-pill', 'Shrinking').should('exist');
    cy.get('.fp-hero-value').should('contain.text', '-');
  });

  it('renders worth card with money values and emits open-worth', () => {
    const onOpen = cy.stub().as('openWorth');
    cy.mount(FinancialPositionHero, {
      props: { position: positionPositive, currency: 'USD', labels, totalIn: 1000, totalOut: 500 },
      attrs: { onOpenWorth: onOpen }
    });
    cy.contains('.eyebrow', 'Total net worth now').should('exist');
    cy.get('.fp-worth').should('exist');
    cy.get('.fp-worth').click();
    cy.get('@openWorth').should('have.been.calledOnce');
    cy.contains('.fp-worth-part-label', 'Cash').should('exist');
    cy.contains('.fp-worth-part-label', 'Holdings').should('exist');
  });

  it('displays currency in formatted values', () => {
    cy.mount(FinancialPositionHero, {
      props: { position: positionPositive, currency: 'USD', labels, totalIn: 1234, totalOut: 567 }
    });
    cy.get('.fp-hero-value').should('contain.text', 'USD');
    cy.get('.fp-scale-value').first().should('contain.text', 'USD');
  });
});
