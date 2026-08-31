import ImportUploadDropzone from './ImportUploadDropzone.vue';

describe('ImportUploadDropzone', () => {
  it('renders default labels', () => {
    cy.mount(ImportUploadDropzone);
    cy.get('.upload-dropzone').should('exist');
    cy.get('.upload-dropzone__title').should('contain.text', 'Drop your file here');
    cy.get('.upload-dropzone__subtitle').should('contain.text', 'Supports CSV');
    cy.get('.upload-dropzone__icon').should('exist');
  });

  it('renders custom labels', () => {
    cy.mount(ImportUploadDropzone, {
      props: { labels: { dropzone: 'Drop here', supportedFormats: 'CSV only' } }
    });
    cy.get('.drop-zone__title').should('contain.text', 'Drop here');
    cy.get('.drop-zone__subtitle').should('contain.text', 'CSV only');
  });

  it('applies active class when isDragging true', () => {
    cy.mount(ImportUploadDropzone, { props: { isDragging: true } });
    cy.get('.upload-dropzone').should('have.class', 'upload-dropzone--active');
    cy.get('.upload-dropzone').should('have.class', 'drop-zone--active');
  });

  it('does not have active class when isDragging false', () => {
    cy.mount(ImportUploadDropzone, { props: { isDragging: false } });
    cy.get('.upload-dropzone').should('not.have.class', 'upload-dropzone--active');
  });

  it('emits browse on click', () => {
    const onBrowse = cy.stub().as('browse');
    cy.mount(ImportUploadDropzone, { props: {}, attrs: { onBrowse } });
    cy.get('.upload-dropzone').click();
    cy.get('@browse').should('have.been.calledOnce');
  });

  it('emits drag-over and drag-leave', () => {
    const onDragOver = cy.stub().as('dragOver');
    const onDragLeave = cy.stub().as('dragLeave');
    cy.mount(ImportUploadDropzone, {
      props: {},
      attrs: { onDragOver, onDragLeave }
    });
    // trigger dragover via component events: use trigger
    cy.get('.upload-dropzone').trigger('dragover');
    cy.get('@dragOver').should('have.been.called');
    cy.get('.upload-dropzone').trigger('dragleave');
    cy.get('@dragLeave').should('have.been.called');
  });
});
