import ContentCardGrid from './ContentCardGrid.vue';

const entities = [
  { id: '1', name: 'Main Wallet', description: 'Primary', icon: 'Wallet' },
  { id: '2', name: 'Savings', description: 'Long term', icon: 'PiggyBank' }
];

describe('ContentCardGrid', () => {
  it('renders a card per entity', () => {
    cy.mount(ContentCardGrid, { props: { entities } });
    cy.get('.entity-card').should('have.length', 2);
    cy.get('.entity-name').first().should('contain.text', 'Main Wallet');
  });

  it('shows default badge for the default item', () => {
    cy.mount(ContentCardGrid, { props: { entities, defaultItemId: '1' } });
    cy.get('.entity-card').first().find('.default-badge').should('contain.text', 'Default');
  });

  it('renders field labels passed via cardFields (no translation)', () => {
    const cardFields = [{ key: 'name', label: 'Name' }];
    cy.mount(ContentCardGrid, { props: { entities, cardFields } });
    cy.get('.field-label').first().should('contain.text', 'Name');
  });

  it('opens the action menu and emits edit/delete', () => {
    const onEdit = cy.stub().as('edit');
    const onDelete = cy.stub().as('delete');
    cy.mount(ContentCardGrid, { props: { entities, onEdit, onDelete } });
    cy.get('.action-menu').first().click();
    cy.get('.dropdown-item.edit').first().click();
    cy.get('@edit').should('have.been.calledWith', entities[0]);
    cy.get('.action-menu').first().click();
    cy.get('.dropdown-item.delete').first().click();
    cy.get('@delete').should('have.been.calledWith', entities[0]);
  });

  it('renders the empty label when there are no entities', () => {
    cy.mount(ContentCardGrid, { props: { entities: [] } });
    cy.get('.empty-state').should('contain.text', 'No items found.');
  });
});
