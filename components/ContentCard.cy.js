import ContentCard from './ContentCard.vue';

const base = {
  name: 'Main Wallet',
  description: 'Primary spending wallet',
  pageName: 'Wallet',
  icon: 'Wallet',
  onEdit: () => {},
  onDelete: () => {}
};

describe('ContentCard', () => {
  it('renders name and description', () => {
    cy.mount(ContentCard, { props: base });
    cy.get('.name').should('contain.text', 'Main Wallet');
    cy.get('.entity-description').should('contain.text', 'Primary spending wallet');
  });

  it('renders the resolved icon when icon prop is set', () => {
    cy.mount(ContentCard, { props: base });
    cy.get('.entity-icon').should('exist');
  });

  it('shows a default badge and styling when isDefault', () => {
    cy.mount(ContentCard, { props: { ...base, isDefault: true } });
    cy.get('.entity-card').should('have.class', 'is-default');
    cy.get('.default-badge').should('contain.text', 'Default');
  });

  it('renders an income/expense badge for categories', () => {
    cy.mount(ContentCard, {
      props: { ...base, pageName: 'Category', type: 'income' }
    });
    cy.get('.category-type-badge').should('contain.text', 'Income');
  });

  it('emits edit and delete', () => {
    const onEdit = cy.stub().as('edit');
    const onDelete = cy.stub().as('delete');
    cy.mount(ContentCard, { props: { ...base, onEdit, onDelete } });
    cy.get('.action-button.edit').click();
    cy.get('@edit').should('have.been.called');
    cy.get('.action-button.delete').click();
    cy.get('@delete').should('have.been.called');
  });

  it('sets edit/delete tooltip titles from pageName', () => {
    cy.mount(ContentCard, { props: base });
    cy.get('.action-button.edit').should('have.attr', 'title', 'Edit Wallet');
    cy.get('.action-button.delete').should('have.attr', 'title', 'Delete Wallet');
  });
});
