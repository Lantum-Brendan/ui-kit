import CategoryForm from './CategoryForm.vue';

describe('CategoryForm', () => {
  it('renders create form', () => {
    cy.mount(CategoryForm, { props: { pageName: 'categories' } });
    cy.contains('Create Category').should('exist');
    cy.get('#category-name').should('exist');
    cy.get('#category-type').should('exist');
    cy.get('#category-description').should('exist');
  });

  it('renders edit form with values', () => {
    const editingItem = { id: 1, name: 'Food', type: 'expense', description: 'Food expenses', icon: 'Utensils' };
    cy.mount(CategoryForm, { props: { pageName: 'categories', editingItem } });
    cy.contains('Edit Category').should('exist');
    cy.get('#category-name').should('have.value', 'Food');
  });

  it('validates required fields on submit', () => {
    const onCreated = cy.stub().as('created');
    cy.mount(CategoryForm, { props: { pageName: 'categories' }, attrs: { onCreated } });
    // try submitting empty -> should not emit
    cy.get('button[type="submit"]').click();
    cy.get('@created').should('not.have.been.called');
    // fill required fields
    cy.get('#category-name').type('New Cat');
    cy.get('#category-type').select('expense');
    cy.get('#category-description').type('Some description');
    cy.get('button[type="submit"]').click();
    cy.get('@created').should('have.been.called');
  });

  it('toggles icon picker', () => {
    cy.mount(CategoryForm, { props: { pageName: 'categories' } });
    cy.get('.icon-trigger').click();
    cy.get('.icon-popover').should('exist');
    cy.get('.icon-trigger').click();
    cy.get('.icon-popover').should('not.exist');
  });
});
