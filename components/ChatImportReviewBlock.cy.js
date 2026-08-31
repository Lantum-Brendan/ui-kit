import ChatImportReviewBlock from './ChatImportReviewBlock.vue';

describe('ChatImportReviewBlock', () => {
  it('renders file name and analyzing status with spinner', () => {
    cy.mount(ChatImportReviewBlock, {
      props: { block: { file_name: 'statement.pdf' }, status: 'analyzing' }
    });
    cy.get('.import-review').should('exist');
    cy.get('.ir-name').should('contain.text', 'statement.pdf');
    cy.get('.ir-status').should('have.class', 'is-analyzing');
    cy.get('.ir-status .spin').should('exist');
  });

  it('shows ready state and review button when session id present', () => {
    const onReview = cy.stub().as('review');
    cy.mount(ChatImportReviewBlock, {
      props: {
        block: { file_name: 'doc.csv', import_session_id: 42 },
        status: 'ready',
        labels: { document: 'Document', reviewImport: 'Review import', ready: 'Ready to review', analyzing: 'Analyzing', confirmed: 'Imported', failed: 'Failed', expired: 'Expired', unavailable: 'Unavailable' }
      },
      attrs: { onReview }
    });
    cy.get('.ir-status').should('have.class', 'is-ready');
    cy.get('.ir-link-btn').should('contain.text', 'Review import').click();
    cy.get('@review').should('have.been.calledWith', 42);
  });

  it('hides review button when no session id or unavailable', () => {
    cy.mount(ChatImportReviewBlock, {
      props: { block: { file_name: 'doc.pdf' }, status: 'ready' }
    });
    cy.get('.ir-link-btn').should('not.exist');
    cy.mount(ChatImportReviewBlock, {
      props: { block: { file_name: 'doc.pdf', import_session_id: 99 }, status: 'unavailable' }
    });
    cy.get('.ir-link-btn').should('not.exist');
  });

  it('renders failed status with error tone', () => {
    cy.mount(ChatImportReviewBlock, {
      props: { block: { file_name: 'bad.pdf' }, status: 'failed' }
    });
    cy.get('.ir-status').should('have.class', 'is-failed');
    cy.get('.ir-status').should('contain.text', 'Import failed');
  });
});
