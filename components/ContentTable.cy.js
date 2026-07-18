import ContentTable from './ContentTable.vue';

const entities = [
  { id: '1', name: 'Main Wallet', description: 'Primary', icon: 'Wallet' },
  { id: '2', name: 'Savings', description: 'Long term', icon: 'PiggyBank' }
];

describe('ContentTable', () => {
  it('renders a header title and row per entity', () => {
    cy.mount(ContentTable, {
      props: { entities, pageName: 'Wallet', pageNamePlural: 'Wallets' }
    });
    cy.get('h1').should('contain.text', 'All Wallets');
    cy.get('.entity-row').should('have.length', 2);
    cy.get('.name-text').first().should('contain.text', 'Main Wallet');
  });

  it('renders default badge for the default item', () => {
    cy.mount(ContentTable, {
      props: { entities, pageName: 'Wallet', pageNamePlural: 'Wallets', defaultItemId: '1' }
    });
    cy.get('.entity-row').first().find('.default-badge').should('contain.text', 'Default');
  });

  it('renders the Action column header', () => {
    cy.mount(ContentTable, {
      props: { entities, pageName: 'Wallet', pageNamePlural: 'Wallets' }
    });
    cy.get('th.col-action').should('contain.text', 'Action');
  });

  it('emits edit and delete with the entity', () => {
    const onEdit = cy.stub().as('edit');
    const onDelete = cy.stub().as('delete');
    cy.mount(ContentTable, {
      props: { entities, pageName: 'Wallet', pageNamePlural: 'Wallets', onEdit, onDelete }
    });
    cy.get('.action-button.edit').first().click();
    cy.get('@edit').should('have.been.calledWith', entities[0]);
    cy.get('.action-button.delete').first().click();
    cy.get('@delete').should('have.been.calledWith', entities[0]);
  });

  it('uses custom labels from props', () => {
    cy.mount(ContentTable, {
      props: {
        entities,
        pageName: 'Wallet',
        pageNamePlural: 'Wallets',
        actionLabel: 'Actions',
        defaultLabel: 'Primary',
        allItemsLabel: 'List of {items}'
      }
    });
    cy.get('h1').should('contain.text', 'List of Wallets');
    cy.get('th.col-action').should('contain.text', 'Actions');
    cy.get('.entity-row').first().find('.default-badge').should('contain.text', 'Primary');
  });
});
