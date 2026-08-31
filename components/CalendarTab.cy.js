import CalendarTab from './CalendarTab.vue';

const buckets = [
  { date: '2026-01-01', income: 100, expense: 50, net: 50 },
  { date: '2026-01-02', income: 0, expense: 0, net: 0 },
  { date: '2026-01-03', income: 0, expense: 120, net: -120 },
  { date: '2026-01-04', income: 200, expense: 10, net: 190 }
];

describe('CalendarTab', () => {
  it('renders section header and heatmap', () => {
    cy.mount(CalendarTab, { props: { buckets, currency: 'USD', formatter: (n) => `$${n}` } });
    cy.get('.calendar-tab').should('exist');
    cy.get('.card').should('exist'); // from CalendarHeatmap inside
  });

  it('renders tabs', () => {
    cy.mount(CalendarTab, { props: { buckets } });
    // TTabList renders tabs
    cy.contains('Top spend days').should('exist');
    cy.contains('At a glance').should('exist');
    cy.contains('By weekday').should('exist');
  });

  it('shows top spend days list', () => {
    cy.mount(CalendarTab, { props: { buckets } });
    cy.get('.rank-item').should('exist');
    // topDays sorted by expense
  });

  it('switches to At a glance tab', () => {
    cy.mount(CalendarTab, { props: { buckets } });
    cy.contains('At a glance').click();
    cy.contains('Days with spend').should('exist');
  });
});
