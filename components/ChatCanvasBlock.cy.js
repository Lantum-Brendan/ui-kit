import ChatCanvasBlock from './ChatCanvasBlock.vue';

const block = {
  title: 'My Report',
  blocks: [
    { type: 'markdown', text: 'Hello markdown' },
    { type: 'callout', text: 'Callout text', title: 'Note', variant: 'info' },
    { type: 'kpi', title: 'KPIs', items: [] }
  ]
};

describe('ChatCanvasBlock', () => {
  it('renders canvas card with title and section count', () => {
    cy.mount(ChatCanvasBlock, { props: { block, labels: { document: 'Document', sectionCount: '{count} sections', openInCanvas: 'Open in canvas' } } });
    cy.get('.canvas-card').should('exist');
    cy.get('.canvas-title').should('contain.text', 'My Report');
    cy.get('.canvas-meta').should('contain.text', '3 sections');
    cy.get('.canvas-cta').should('contain.text', 'Open in canvas');
  });

  it('renders preview for first blocks', () => {
    cy.mount(ChatCanvasBlock, { props: { block } });
    cy.get('.canvas-preview').should('exist');
    cy.get('.canvas-markdown').should('contain.text', 'Hello markdown');
  });

  it('emits open on click and enter', () => {
    const onOpen = cy.stub().as('open');
    cy.mount(ChatCanvasBlock, { props: { block }, attrs: { onOpen } });
    cy.get('.canvas-card').click();
    cy.get('@open').should('have.been.calledOnce');
    cy.get('.canvas-card').should('have.attr', 'tabindex', '0');
    cy.get('.canvas-card').trigger('keydown', { key: 'Enter' });
    cy.get('@open').should('have.been.calledTwice');
  });

  it('falls back to Document when no title', () => {
    cy.mount(ChatCanvasBlock, { props: { block: { blocks: [] } } });
    cy.get('.canvas-title').should('contain.text', 'Document');
  });
});
