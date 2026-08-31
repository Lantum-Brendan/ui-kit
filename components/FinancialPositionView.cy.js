import FinancialPositionView from './FinancialPositionView.vue';

const position = {
  net_worth_delta: 1200,
  net_worth_now: 5000,
  earned_income: 4000,
  investment_returns: 500,
  gifts_received: 200,
  loan_received: 0,
  debt_owed: 0,
  discretionary_spend: 2500,
  investment_principal: 0,
  loan_repayment: 0,
  debt_settled: 0,
  cash: 3000,
  holdings: 2000
};

describe('FinancialPositionView', () => {
  it('shows empty when no position', () => {
    cy.mount(FinancialPositionView, { props: { position: null } });
    cy.get('.fp-empty').should('exist');
    cy.get('.fp-empty').should('contain.text', 'No data for this period yet');
  });

  it('shows loading skeleton when isLoading and no position', () => {
    cy.mount(FinancialPositionView, { props: { position: null, isLoading: true } });
    // LoadingSkeleton should be present
    cy.get('.fp').should('exist');
  });

  it('renders ledger with hero and rows when position has data', () => {
    cy.mount(FinancialPositionView, { props: { position, currency: 'USD' } });
    cy.get('.fp-title').should('contain.text', 'Financial position');
    cy.get('.fp-col').should('have.length', 2);
    cy.contains('.fp-row-label', 'Earned income').should('exist');
  });

  it('shows partial note when partial true', () => {
    cy.mount(FinancialPositionView, { props: { position, partial: true, unconvertedCurrencies: ['EUR', 'GBP'] } });
    cy.get('.fp-note').should('contain.text', 'EUR, GBP');
  });

  it('emits preset-change when clicking preset', () => {
    const onPresetChange = cy.stub().as('preset');
    cy.mount(FinancialPositionView, {
      props: { position, activePreset: 'current_month', presetDisabled: false },
      attrs: { onPresetChange }
    });
    cy.contains('.fp-preset', 'Last 3 months').click();
    cy.get('@preset').should('have.been.calledWith', 'last_3_months');
  });

  it('emits open-drill when row clicked', () => {
    const onOpenDrill = cy.stub().as('drill');
    cy.mount(FinancialPositionView, { props: { position }, attrs: { onOpenDrill } });
    cy.get('.fp-row').first().click();
    cy.get('@drill').should('have.been.calledOnce');
  });
});
