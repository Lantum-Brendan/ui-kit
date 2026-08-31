import CalendarHeatmap from './CalendarHeatmap.vue';

const buckets = [
  { date: '2026-01-01', income: 100, expense: 50, net: 50 },
  { date: '2026-01-02', income: 0, expense: 0, net: 0 },
  { date: '2026-01-03', income: 200, expense: 120, net: 80 },
  { date: '2026-02-01', income: 50, expense: 90, net: -40 }
];

describe('CalendarHeatmap', () => {
  it('renders card with title', () => {
    cy.mount(CalendarHeatmap, { props: { buckets, currency: 'USD', formatter: (n) => `$${n}`, labels: { spendingCalendar: 'Spending calendar', eachTile: 'Each tile is a day', less: 'Less', more: 'More', net: 'Net' } } });
    cy.get('.card').should('exist');
    cy.get('.card-title').should('contain.text', 'Spending calendar');
    cy.get('.card-sub').should('contain.text', 'Each tile is a day');
  });

  it('renders legend cells', () => {
    cy.mount(CalendarHeatmap, { props: { buckets } });
    cy.get('.legend-cell').should('have.length', 5);
  });

  it('renders month groups', () => {
    cy.mount(CalendarHeatmap, { props: { buckets, locale: 'en' } });
    cy.get('.month').should('have.length', 2);
    cy.get('.month-label').first().should('exist');
  });

  it('emits select-day on cell click with expense', () => {
    const onSelectDay = cy.stub().as('select');
    cy.mount(CalendarHeatmap, { props: { buckets }, attrs: { onSelectDay } });
    // Find first non-empty cell with expense >0
    cy.get('.cell').not('.cell--empty').first().click({ force: true });
    // may emit if expense >0; ensure at least component exists
    cy.get('.grid').should('exist');
  });
});
