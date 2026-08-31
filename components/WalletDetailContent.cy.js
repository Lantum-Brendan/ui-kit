import WalletDetailContent from './WalletDetailContent.vue';

const wallet = {
  id: 'w1',
  name: 'Main Wallet',
  currency: 'USD',
  type: 'bank',
  icon: 'Wallet',
  balance: 2500,
  stats: { total_income: 5000, total_expense: 3000 }
};

const labels = {
  backToList: 'Back',
  default: 'Default',
  edit: 'Edit',
  delete: 'Delete',
  balance: 'Balance',
  income: 'Income',
  expense: 'Expense',
  net: 'Net',
  last6Months: 'Last 6 months',
  activity: 'Activity',
  noActivity: 'No activity',
  recentTransactions: 'Recent',
  shown: 'shown',
  viewAll: 'View all',
  transaction: 'Transaction',
  noTransactions: 'No transactions',
  walletType: { bank: 'Bank' }
};

const formatter = (n, cur) => `${n} ${cur}`;

describe('WalletDetailContent', () => {
  it('renders wallet hero with name and currency', () => {
    cy.mount(WalletDetailContent, {
      props: { wallet, labels, formatter, transactions: [], isDefault: false }
    });
    cy.get('.detail-body').should('exist');
    cy.get('.hero-name').should('contain.text', 'Main Wallet');
    cy.get('.hero-currency').should('contain.text', 'USD');
    cy.get('.hero-type').should('contain.text', 'Bank');
  });

  it('shows default badge when isDefault true', () => {
    cy.mount(WalletDetailContent, { props: { wallet, labels, formatter, isDefault: true } });
    cy.contains('.hero-default-badge', 'Default').should('exist');
    cy.mount(WalletDetailContent, { props: { wallet, labels, formatter, isDefault: false } });
    cy.get('.hero-default-badge').should('not.exist');
  });

  it('renders totals with formatted values', () => {
    cy.mount(WalletDetailContent, { props: { wallet, labels, formatter } });
    cy.contains('.total-label', 'Balance').should('exist');
    cy.contains('.total-value', '2500 USD').should('exist');
    cy.contains('.total-value', '5000 USD').should('exist');
    cy.contains('.total-value', '3000 USD').should('exist');
    // net = 2000
    cy.get('.total--net .total-value').should('contain.text', '2000');
  });

  it('emits edit, delete, back', () => {
    const onEdit = cy.stub().as('edit');
    const onDelete = cy.stub().as('delete');
    const onBack = cy.stub().as('back');
    cy.mount(WalletDetailContent, {
      props: { wallet, labels, formatter, showBack: true },
      attrs: { onEdit, onDelete, onBack }
    });
    cy.get('.hero-action').first().click();
    cy.get('@edit').should('have.been.calledWith', wallet);
    cy.get('.hero-action--danger').click();
    cy.get('@delete').should('have.been.calledWith', wallet);
    cy.get('.back-btn').click();
    cy.get('@back').should('have.been.calledOnce');
  });

  it('shows recent transactions when provided', () => {
    const txs = [
      { id: 't1', walletId: 'w1', type: 'INCOME', amount: '100', party: 'Employer', date: '2026-01-15', description: '' },
      { id: 't2', walletId: 'w1', type: 'EXPENSE', amount: '50', party: 'Store', date: '2026-01-16' }
    ];
    cy.mount(WalletDetailContent, { props: { wallet, labels, formatter, transactions: txs } });
    cy.get('.recent-list').should('exist');
    cy.get('.recent-row').should('have.length', 2);
    cy.contains('.recent-name', 'Employer').should('exist');
  });

  it('shows no transactions empty state', () => {
    cy.mount(WalletDetailContent, { props: { wallet, labels, formatter, transactions: [] } });
    cy.contains('.recent-empty', 'No transactions').should('exist');
  });
});
