import TTableTotals from './TTableTotals.vue';

const labels = { totals: 'Totals', income: 'Income', expenses: 'Expenses', net: 'Net' };
const formatCurrency = (n) => `$${Number(n).toFixed(2)}`;

describe('TTableTotals', () => {
  it('renders totals grid with labels and formatted values', () => {
    const totals = { income: 1200.5, expenses: 800, net: 400.5 };
    cy.mount(TTableTotals, { props: { totals, labels, formatCurrency } });
    cy.get('.totals-grid').should('exist');
    cy.contains('.total-label', 'Totals').should('exist');
    cy.contains('.total-label', 'Income').should('exist');
    cy.contains('.total-label', 'Expenses').should('exist');
    cy.contains('.total-label', 'Net').should('exist');
    cy.get('.total-section.income .total-value').should('contain.text', '$1200.50');
    cy.get('.total-section.expense .total-value').should('contain.text', '$800.00');
    cy.get('.total-section.net .total-value').should('contain.text', '$400.50');
  });

  it('applies positive class when net >= 0', () => {
    const totals = { income: 100, expenses: 50, net: 50 };
    cy.mount(TTableTotals, { props: { totals, labels, formatCurrency } });
    cy.get('.total-section.net').should('have.class', 'positive');
    cy.get('.total-section.net').should('not.have.class', 'negative');
  });

  it('applies negative class when net < 0', () => {
    const totals = { income: 50, expenses: 100, net: -50 };
    cy.mount(TTableTotals, { props: { totals, labels, formatCurrency } });
    cy.get('.total-section.net').should('have.class', 'negative');
    cy.get('.total-section.net').should('not.have.class', 'positive');
  });

  it('handles zero net as positive', () => {
    const totals = { income: 0, expenses: 0, net: 0 };
    cy.mount(TTableTotals, { props: { totals, labels, formatCurrency } });
    cy.get('.total-section.net').should('have.class', 'positive');
  });
});
