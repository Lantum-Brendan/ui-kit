import TransactionFormAttachments from './TransactionFormAttachments.vue';

const labels = {
  attachment: 'Attachment',
  remove: 'Remove',
  browseFiles: 'Browse files',
  fileHint: 'Up to 5 files'
};

describe('TransactionFormAttachments', () => {
  it('renders upload box with labels', () => {
    cy.mount(TransactionFormAttachments, { props: { labels } });
    cy.get('.upload-button').should('contain.text', 'Browse files');
    cy.get('.hint').should('contain.text', 'Up to 5 files');
    cy.get('input[type="file"]').should('exist');
  });

  it('renders existing attachments and emits remove', () => {
    const onRemoveExisting = cy.stub().as('removeExisting');
    const existingAttachments = [
      { id: 1, path: 'photo.jpg' },
      { id: 2, path: 'doc.pdf' }
    ];
    cy.mount(TransactionFormAttachments, {
      props: {
        labels,
        existingAttachments,
        existingPreviews: { 1: 'blob:preview1' },
        removingFileIds: new Set(),
        newAttachments: [],
        inputId: 'file-input'
      },
      attrs: { onRemoveExistingAttachment: onRemoveExisting }
    });
    cy.get('.attachment-grid').should('exist');
    cy.get('.attachment-card').should('have.length', 2);
    // first is image preview
    cy.get('.attachment-card').first().find('img').should('have.attr', 'src', 'blob:preview1');
    // second is doc with extension label PDF
    cy.get('.attachment-card').eq(1).should('contain.text', 'PDF');
    cy.get('.attachment-card').first().find('.remove').click();
    cy.get('@removeExisting').should('have.been.calledOnce');
  });

  it('renders new attachments and emits remove-new', () => {
    const onRemoveNew = cy.stub().as('removeNew');
    const newAttachments = [
      { name: 'receipt.png', isImage: true, previewUrl: 'blob:new1' },
      { name: 'report.csv', isImage: false, previewUrl: null }
    ];
    cy.mount(TransactionFormAttachments, {
      props: { labels, newAttachments, existingAttachments: [], removingFileIds: new Set() },
      attrs: { onRemoveNewAttachment: onRemoveNew }
    });
    cy.get('.attachment-card').should('have.length', 2);
    cy.get('.filename').first().should('contain.text', 'receipt.png');
    cy.get('.attachment-card').first().find('img').should('have.attr', 'src', 'blob:new1');
    cy.get('.attachment-card').eq(1).should('contain.text', 'CSV');
    cy.get('.attachment-card').first().find('.remove').click();
    cy.get('@removeNew').should('have.been.calledWith', 0);
  });

  it('emits files-selected on file input change', () => {
    const onFilesSelected = cy.stub().as('filesSelected');
    cy.mount(TransactionFormAttachments, {
      props: { labels },
      attrs: { onFilesSelected }
    });
    // create a dummy file via DataTransfer not needed, just trigger change
    cy.get('input[type="file"]').selectFile(
      { contents: Cypress.Buffer.from('hello'), fileName: 'test.txt', mimeType: 'text/plain' },
      { force: true }
    );
    cy.get('@filesSelected').should('have.been.called');
  });
});
