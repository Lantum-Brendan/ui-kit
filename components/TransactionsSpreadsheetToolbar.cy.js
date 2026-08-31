import TransactionsSpreadsheetToolbar from './TransactionsSpreadsheetToolbar.vue';

const labels = {
  title: 'Spreadsheet',
  rowCount: '{count} rows',
  loadingMore: 'Loading...',
  searchPlaceholder: 'Search transactions',
  exportCsv: 'Export CSV',
  close: 'Close',
  addRow: 'Add row',
  deleteSelected: 'Delete selected'
};

describe('TransactionsSpreadsheetToolbar', () => {
  it('renders title and row count', () => {
    cy.mount(TransactionsSpreadsheetToolbar, { props: { labels, rowCount: 42 } });
    cy.get('.spreadsheet-title h2').should('contain.text', 'Spreadsheet');
    cy.get('.count').should('contain.text', '42 rows');
  });

  it('shows loadingMore when isStreaming', () => {
    cy.mount(TransactionsSpreadsheetToolbar, { props: { labels, rowCount: 10, isStreaming: true } });
    cy.get('.loading-more').should('contain.text', 'Loading...');
  });

  it('renders search input with placeholder and emits update:searchValue', () => {
    const onUpdate = cy.stub().as('search');
    cy.mount(TransactionsSpreadsheetToolbar, {
      props: { labels, searchValue: '', 'onUpdate:searchValue': onUpdate }
    });
    cy.get('.search').should('have.attr', 'placeholder', 'Search transactions');
    cy.get('.search').type('rent');
    cy.get('@search').should('have.been.called');
  });

  it('handles export button disabled and enabled', () => {
    cy.mount(TransactionsSpreadsheetToolbar, { props: { labels, exportDisabled: true } });
    cy.get('.action-btn').should('be.disabled');
    cy.mount(TransactionsSpreadsheetToolbar, { props: { labels, exportDisabled: false } });
    cy.get('.action-btn').should('not.be.disabled');
  });

  it('emits export and close events', () => {
    const onExport = cy.stub().as('export');
    const onClose = cy.stub().as('close');
    cy.mount(TransactionsSpreadsheetToolbar, {
      props: { labels, exportDisabled: false },
      attrs: { onExport, onClose }
    });
    cy.get('.action-btn').click();
    cy.get('@export').should('have.been.calledOnce');
    cy.get('.close-btn').click();
    cy.get('@close').should('have.been.calledOnce');
  });

  it('shows add-row and delete-selected buttons', () => {
    const onAddRow = cy.stub().as('addRow');
    const onDelete = cy.stub().as('delete');
    cy.mount(TransactionsSpreadsheetToolbar, {
      props: { labels, hasSelection: true },
      attrs: { onAddRow, onDeleteSelected: onDelete }
    });
    cy.contains('button', 'Add row').should('exist').click();
    cy.get('@addRow').should('have.been.calledOnce');
    cy.contains('button', 'Delete selected').should('exist').click();
    cy.get('@delete').should('have.been.calledOnce');
  });

  it('hides delete-selected when no selection', () => {
    cy.mount(TransactionsSpreadsheetToolbar, { props: { labels, hasSelection: false } });
    cy.contains('button', 'Delete selected').should('not.exist');
  });
});
