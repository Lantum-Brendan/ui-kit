import TCardActionMenu from './TCardActionMenu.vue';

describe('TCardActionMenu', () => {
  it('renders trigger button', () => {
    cy.mount(TCardActionMenu);
    cy.get('.t-card-action-menu__trigger').should('exist');
    cy.get('.t-card-action-menu__trigger').should('have.attr', 'aria-label', 'More actions');
  });

  it('opens popover on trigger click and shows default edit/delete', () => {
    cy.mount(TCardActionMenu);
    cy.get('.t-card-action-menu__popover').should('not.exist');
    cy.get('.t-card-action-menu__trigger').click();
    cy.get('.t-card-action-menu__popover').should('exist');
    cy.get('.t-card-action-menu__item').should('have.length', 2);
    cy.contains('.t-card-action-menu__item', 'Edit').should('exist');
    cy.contains('.t-card-action-menu__item', 'Delete').should('exist');
  });

  it('renders custom items', () => {
    const items = [
      { action: 'edit', label: 'Rename' },
      { action: 'duplicate', label: 'Duplicate' },
      { action: 'delete', label: 'Remove', variant: 'danger' },
    ];
    cy.mount(TCardActionMenu, { props: { items } });
    cy.get('.t-card-action-menu__trigger').click();
    cy.get('.t-card-action-menu__item').should('have.length', 3);
    cy.contains('.t-card-action-menu__item', 'Rename').should('exist');
    cy.get('.t-card-action-menu__item--danger').should('contain.text', 'Remove');
  });

  it('emits action, edit and delete events', () => {
    const onAction = cy.stub().as('action');
    const onEdit = cy.stub().as('edit');
    const onDelete = cy.stub().as('delete');
    cy.mount(TCardActionMenu, { attrs: { onAction, onEdit, onDelete } });
    cy.get('.t-card-action-menu__trigger').click();
    cy.contains('.t-card-action-menu__item', 'Edit').click({ force: true });
    cy.get('@action').should('have.been.calledWith', 'edit');
    cy.get('@edit').should('have.been.calledOnce');
    cy.get('.t-card-action-menu__trigger').click();
    cy.get('.t-card-action-menu__popover').should('exist');
    cy.contains('.t-card-action-menu__item', 'Delete').click({ force: true });
    cy.get('@delete').should('have.been.calledOnce');
  });
});
