import TTableRow from './TTableRow.vue';
import { h } from 'vue';

// helper to mount inside table for valid DOM
const mountRow = (props, attrs = {}) => {
  const Wrapper = {
    components: { TTableRow },
    setup() {
      return () => h('table', [h('tbody', [h(TTableRow, { ...props, ...attrs })])]);
    }
  };
  cy.mount(Wrapper);
};

const baseTxn = {
  type: 'INCOME',
  amount: '$500',
  party: 'Acme',
  category: 'Salary',
  isTransfer: false,
  isRefund: false,
  isRecurring: false
};

const labels = { transfer: 'Transfer', refund: 'Refund', recurring: 'Recurring' };
const formatDate = (txn) => '2026-01-01';
const formatTimeAgo = (txn) => '2 days ago';

describe('TTableRow', () => {
  it('renders transaction data', () => {
    mountRow({ txn: baseTxn, labels, formatDate, formatTimeAgo });
    cy.get('tbody tr').should('exist');
    cy.contains('.type-badge', 'INCOME').should('exist');
    cy.contains('.type-badge', 'INCOME').should('have.class', 'income');
    cy.get('.party').should('contain.text', 'Acme');
    cy.contains('.amount-income', '$500').should('exist');
    cy.contains('td', 'Salary').should('exist');
    cy.get('.date-main').should('contain.text', '2026-01-01');
    cy.get('.date-sub').should('contain.text', '2 days ago');
  });

  it('shows outcome styling for expense', () => {
    const txn = { ...baseTxn, type: 'EXPENSE', party: '' };
    mountRow({ txn, labels, formatDate, formatTimeAgo });
    cy.get('.type-badge').should('have.class', 'outcome');
    cy.get('.party').should('contain.text', '—');
    cy.get('.amount-outcome').should('exist');
  });

  it('shows badges for transfer, refund, recurring', () => {
    const txn = { ...baseTxn, isTransfer: true, isRefund: true, isRecurring: true };
    mountRow({ txn, labels, formatDate, formatTimeAgo });
    cy.contains('.transfer-badge', 'Transfer').should('exist');
    cy.contains('.refund-badge', 'Refund').should('exist');
    cy.contains('.recurring-badge', 'Recurring').should('exist');
  });

  it('emits edit, recurrent, delete on action clicks', () => {
    const onEdit = cy.stub().as('edit');
    const onDelete = cy.stub().as('delete');
    const onRecurrent = cy.stub().as('recurrent');
    const Wrapper = {
      components: { TTableRow },
      setup() {
        return () => h('table', [h('tbody', [h(TTableRow, { txn: baseTxn, labels, formatDate, formatTimeAgo, onEdit, onDelete, onRecurrent })])]);
      }
    };
    cy.mount(Wrapper);
    cy.get('.action-btn').eq(0).click();
    cy.get('@edit').should('have.been.calledWith', baseTxn);
    cy.get('.action-btn').eq(1).click();
    cy.get('@recurrent').should('have.been.calledWith', baseTxn);
    cy.get('.action-btn').eq(2).click();
    cy.get('@delete').should('have.been.calledWith', baseTxn);
  });
});
