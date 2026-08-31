import DashboardKPIs from './DashboardKPIs.vue';

describe('DashboardKPIs', () => {
  const stats = { total_balance: 10000, total_income: 8000, total_expenses: 3000 };

  it('renders 4 KPI cards with formatted values', () => {
    cy.mount(DashboardKPIs, {
      props: {
        statistics: stats,
        currency: 'USD',
        formatCurrencyFn: (v, c) => `${v} ${c}`
      }
    });
    cy.get('.kpi-section').should('exist');
    cy.get('.kpi-card').should('have.length', 4);
    cy.contains('.kpi-value', '10000 USD').should('exist');
    cy.contains('.kpi-value', '8000 USD').should('exist');
    cy.contains('.kpi-value', '3000 USD').should('exist');
    // net = 5000
    cy.contains('.kpi-value', '5000 USD').should('exist');
  });

  it('shows negative net with expense tone (value still rendered)', () => {
    cy.mount(DashboardKPIs, {
      props: {
        statistics: { total_balance: 0, total_income: 1000, total_expenses: 2000 },
        formatCurrencyFn: (v) => `${v}`
      }
    });
    cy.contains('.kpi-value', '-1000').should('exist');
  });

  it('shows filter chips when isCustomActive', () => {
    const onRemoveFilter = cy.stub().as('remove');
    const onClearFilters = cy.stub().as('clear');
    cy.mount(DashboardKPIs, {
      props: {
        statistics: stats,
        isCustomActive: true,
        activeFilterChips: [{ key: 'wallet', label: 'Wallet: Main' }],
        labels: { balance: 'Balance', income: 'Income', expenses: 'Expenses', net: 'Net', clearAll: 'Clear all' }
      },
      attrs: { onRemoveFilter, onClearFilters }
    });
    cy.get('.filter-chip').should('contain.text', 'Wallet: Main');
    cy.get('.filter-chip__remove').click();
    cy.get('@remove').should('have.been.calledWith', 'wallet');
    cy.contains('.filter-chip--clear', 'Clear all').click();
    cy.get('@clear').should('have.been.calledOnce');
  });

  it('does not show filter chips when not custom active', () => {
    cy.mount(DashboardKPIs, {
      props: { statistics: stats, isCustomActive: false, activeFilterChips: [{ key: 'wallet', label: 'Wallet' }] }
    });
    cy.get('.filter-chip').should('not.exist');
  });
});
