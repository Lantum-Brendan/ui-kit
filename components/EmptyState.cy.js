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

  it('renders the inline SVG icon by default', () => {
    cy.mount(EmptyState, {
      props: { title: 't', subtitle: 's', iconAlt: 'Box' }
    });
    cy.get('.empty-icon svg').should('exist');
    cy.get('.empty-icon svg path').should('exist');
  });

  it('allows icon slot override', () => {
    cy.mount(EmptyState, {
      props: { title: 't', subtitle: 's' },
      slots: {
        icon: '<img src="custom-empty.png" alt="Custom" />'
      }
    });
    cy.get('.empty-icon img').should('have.attr', 'src', 'custom-empty.png');
    cy.get('.empty-icon svg').should('not.exist');
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
