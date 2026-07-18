import EmptyState from './EmptyState.vue';

describe('EmptyState', () => {
  it('renders title, subtitle and button label', () => {
    cy.mount(EmptyState, {
      props: {
        title: 'No items yet',
        subtitle: 'Add one to get started',
        buttonLabel: 'Add item',
        iconAlt: 'Empty box'
      }
    });
    cy.get('.empty-title').should('contain.text', 'No items yet');
    cy.get('.empty-subtitle').should('contain.text', 'Add one to get started');
    cy.get('.add-entity-btn').should('contain.text', 'Add item');
  });

  it('renders the empty icon from public assets', () => {
    cy.mount(EmptyState, {
      props: { title: 't', subtitle: 's', iconAlt: 'Box' }
    });
    cy.get('.empty-icon').should('have.attr', 'src', '/box.svg');
    cy.get('.empty-icon').should('have.attr', 'alt', 'Box');
  });

  it('emits create when the button is clicked', () => {
    const onCreate = cy.stub().as('create');
    cy.mount(EmptyState, {
      props: { title: 't', subtitle: 's', buttonLabel: 'Add', onCreate }
    });
    cy.get('.add-entity-btn').click();
    cy.get('@create').should('have.been.called');
  });
});
