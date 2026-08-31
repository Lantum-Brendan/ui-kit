import ImportUploadFileList from './ImportUploadFileList.vue';

describe('ImportUploadFileList', () => {
  it('renders nothing when no files', () => {
    cy.mount(ImportUploadFileList, { props: { files: [] } });
    cy.get('.file-list').should('not.exist');
  });

  it('renders nothing when files is null', () => {
    cy.mount(ImportUploadFileList, { props: { files: null } });
    cy.get('.file-list').should('not.exist');
  });

  it('renders file chips for array of files', () => {
    const fileA = new File(['hello'], 'report.csv', { type: 'text/csv' });
    Object.defineProperty(fileA, 'size', { value: 1024 });
    const fileB = new File(['world'], 'photo.jpg', { type: 'image/jpeg' });
    Object.defineProperty(fileB, 'size', { value: 2048 });
    cy.mount(ImportUploadFileList, { props: { files: [fileA, fileB] } });
    cy.get('.file-list').should('exist');
    cy.get('.file-item').should('have.length', 2);
    cy.get('.file-item__name').first().should('contain.text', 'report.csv');
    cy.get('.file-item__name').eq(1).should('contain.text', 'photo.jpg');
    cy.get('.file-item__size').first().should('contain.text', 'KB');
  });

  it('renders single file object (non-array)', () => {
    const file = new File(['data'], 'single.pdf', { type: 'application/pdf' });
    Object.defineProperty(file, 'size', { value: 5000 });
    cy.mount(ImportUploadFileList, { props: { files: file } });
    cy.get('.file-item').should('have.length', 1);
    cy.get('.file-item__name').should('contain.text', 'single.pdf');
  });

  it('emits remove with index when remove button clicked', () => {
    const onRemove = cy.stub().as('remove');
    const f1 = new File(['a'], 'a.txt', { type: 'text/plain' });
    const f2 = new File(['b'], 'b.txt', { type: 'text/plain' });
    cy.mount(ImportUploadFileList, { props: { files: [f1, f2] }, attrs: { onRemove } });
    cy.get('.file-item__remove').first().click();
    cy.get('@remove').should('have.been.calledWith', 0);
    cy.get('.file-item__remove').eq(1).click();
    cy.get('@remove').should('have.been.calledWith', 1);
  });

  it('formats file size correctly for 0 B', () => {
    const file = new File([], 'empty.txt', { type: 'text/plain' });
    Object.defineProperty(file, 'size', { value: 0 });
    cy.mount(ImportUploadFileList, { props: { files: [file] } });
    cy.get('.file-item__size').should('contain.text', '0 B');
  });
});
