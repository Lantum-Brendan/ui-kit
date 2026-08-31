import ChatLandingInsights from './ChatLandingInsights.vue';

describe('ChatLandingInsights', () => {
  it('shows skeleton when loading', () => {
    cy.mount(ChatLandingInsights, { props: { loading: true } });
    cy.get('.landing-insights .skeleton').should('exist');
    cy.get('.spotlight-skeleton').should('exist');
  });

  it('shows empty hint when no data', () => {
    cy.mount(ChatLandingInsights, { props: { loading: false, income: 0, expenses: 0, txCount: 0 } });
    cy.get('.empty-hint').should('exist');
    cy.get('.empty-hint').should('contain.text', "Add a few transactions");
  });

  it('renders stat cards when hasData', () => {
    cy.mount(ChatLandingInsights, {
      props: {
        loading: false,
        income: 5000,
        expenses: 3000,
        savingsRate: 40,
        txCount: 12,
        avgExpense: 250,
        biggestExpense: 'Store',
        topCategory: { name: 'Food', pct: 30 },
        topCategories: [{ name: 'Food', height: '60%' }],
        trend: [10, 20, 15],
        formatMoneyFn: (v) => `$${v}`
      }
    });
    cy.get('.landing-insights').should('exist');
    cy.get('.stat').should('have.length.at.least', 3);
    cy.get('.dots .dot').should('have.length', 2);
  });

  it('emits pick when spotlight clicked', () => {
    const onPick = cy.stub().as('pick');
    cy.mount(ChatLandingInsights, {
      props: {
        loading: false,
        income: 1000,
        expenses: 500,
        txCount: 5,
        spotlights: [{ text: 'You spent a lot on dining', prompt: ' Tell me about dining' }],
        formatMoneyFn: (v) => `${v}`
      },
      attrs: { onPick }
    });
    cy.get('.spotlight').should('exist').click();
    cy.get('@pick').should('have.been.calledOnce');
  });
});
