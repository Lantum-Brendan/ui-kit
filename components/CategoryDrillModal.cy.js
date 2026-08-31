import CategoryDrillModal from './CategoryDrillModal.vue';

const bucket = {
  name: 'Food',
  count: 12,
  amount: 450,
  delta: -10,
  trend: [10, 20, 30, 25, 40, 35],
  color: '#ff0000',
  kind: 'expense'
};

const trailingMonths = [
  { month: '2025-08' },
  { month: '2025-09' },
  { month: '2025-10' },
  { month: '2025-11' },
  { month: '2025-12' },
  { month: '2026-01' }
];

const labels = {
  periodOverview: 'Period overview · {n} transactions',
  close: 'Close',
  total: 'Total',
  avgPerMonth: 'Avg / month',
  peakMonth: 'Peak month',
  vsPriorPeriod: 'vs prior period',
  trendLast6Months: 'Trend (last 6 months)',
  topKind: 'Top {kind}',
  sources: 'sources',
  payees: 'payees',
  noTransactionsMatch: 'No transactions match.',
  transactions: 'Transactions',
  showMore: 'Show {n} more'
};

const formatter = (n) => `$${n}`;

describe('CategoryDrillModal', () => {
  it('does not render when open false', () => {
    cy.mount(CategoryDrillModal, {
      props: { open: false, bucket, trailingMonths, labels, formatter }
    });
    cy.get('.modal-root').should('not.exist');
  });

  it('renders when open true with bucket info', () => {
    cy.mount(CategoryDrillModal, {
      props: { open: true, bucket, trailingMonths, labels, formatter }
    });
    cy.get('.modal-root').should('exist');
    cy.get('.head-title').should('contain.text', 'Food');
    cy.get('.head-sub').should('contain.text', '12');
    cy.get('.head-swatch').should('have.attr', 'style').and('match', /ff0000|rgb\(255,\s*0,\s*0\)/);
  });

  it('renders kpi row with formatted values', () => {
    cy.mount(CategoryDrillModal, {
      props: { open: true, bucket, trailingMonths, labels, formatter }
    });
    cy.contains('.kpi-label', 'Total').should('exist');
    cy.contains('.kpi-value', '$450').should('exist');
    cy.contains('.kpi-label', 'Avg / month').should('exist');
    cy.contains('.kpi-label', 'vs prior period').should('exist');
    cy.contains('.kpi-value', '-10%').should('exist');
  });

  it('renders trend bars', () => {
    cy.mount(CategoryDrillModal, {
      props: { open: true, bucket, trailingMonths, labels, formatter }
    });
    cy.contains('.block-title', 'Trend (last 6 months)').should('exist');
    cy.get('.trend-bar').should('have.length', 6);
  });

  it('emits close on close button and backdrop', () => {
    const onClose = cy.stub().as('close');
    cy.mount(CategoryDrillModal, {
      props: { open: true, bucket, trailingMonths, labels, formatter },
      attrs: { onClose }
    });
    cy.get('.close-btn').click();
    cy.get('@close').should('have.been.called');
  });

  it('shows no transactions empty when no matching tx', () => {
    cy.mount(CategoryDrillModal, {
      props: { open: true, bucket, trailingMonths, labels, formatter, transactions: [], range: { start: new Date('2025-08-01'), end: new Date('2026-01-31') } }
    });
    cy.contains('.empty', 'No transactions match.').should('exist');
  });
});
