import CanvasPanel from './CanvasPanel.vue';

describe('CanvasPanel', () => {
  it('does not render when canvas is null', () => {
    cy.mount(CanvasPanel, { props: { canvas: null } });
    cy.get('.canvas').should('not.exist');
  });

  it('renders title, eyebrow and default fallback', () => {
    cy.mount(CanvasPanel, { props: { canvas: { title: 'My Doc', blocks: [] } } });
    cy.get('.canvas').should('exist');
    cy.get('.canvas-eyebrow').should('contain.text', 'Canvas');
    cy.get('.canvas-title').should('contain.text', 'My Doc');
  });

  it('uses defaultTitle when canvas.title missing', () => {
    cy.mount(CanvasPanel, { props: { canvas: { blocks: [] }, labels: { eyebrow: 'Canvas', defaultTitle: 'Untitled', close: 'Close', downloadMarkdown: 'Download', printPdf: 'Print' } } });
    cy.get('.canvas-title').should('contain.text', 'Untitled');
  });

  it('emits close, print and download', () => {
    const onClose = cy.stub().as('close');
    const onPrint = cy.stub().as('print');
    const onDownload = cy.stub().as('download');
    cy.mount(CanvasPanel, {
      props: { canvas: { title: 'Doc', blocks: [] }, messageId: 123 },
      attrs: { onClose, onPrint, onDownload }
    });
    cy.get('.canvas-close').click();
    cy.get('@close').should('have.been.calledOnce');
    cy.get('.canvas-tool').eq(1).click(); // print
    cy.get('@print').should('have.been.calledOnce');
    cy.get('.canvas-tool').eq(0).click(); // download (shown when messageId present)
    cy.get('@download').should('have.been.calledOnce');
  });
});
