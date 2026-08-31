import SettingsAccount from './SettingsAccount.vue';

const user = {
  first_name: 'Alex',
  last_name: 'Johnson',
  username: 'alexj',
  email: 'alex@example.com',
};

describe('SettingsAccount', () => {
  it('renders display mode with text values', () => {
    cy.mount(SettingsAccount, { props: { isEditMode: false, user, avatarUrl: 'https://i.pravatar.cc/150?img=12' } });
    cy.get('.avatar-image').should('have.attr', 'src', 'https://i.pravatar.cc/150?img=12');
    cy.get('.text-display').should('contain.text', 'Alex');
    cy.get('.text-display').should('contain.text', 'Johnson');
    cy.get('.text-display').should('contain.text', 'alexj');
    cy.get('input.form-input').should('not.exist');
  });

  it('renders edit mode with inputs', () => {
    cy.mount(SettingsAccount, { props: { isEditMode: true, user, avatarUrl: '' } });
    cy.get('input.form-input').should('have.length', 4);
    cy.get('input.form-input').first().should('have.value', 'Alex');
    cy.get('.avatar-image').should('not.exist');
  });

  it('emits open-password-modal when change password clicked', () => {
    const onOpen = cy.stub().as('open');
    cy.mount(SettingsAccount, { props: { isEditMode: false, user }, attrs: { 'onOpen-password-modal': onOpen } });
    cy.get('.dashed-button').click();
    cy.get('@open').should('have.been.calledOnce');
  });

  it('emits update-account with form values in edit mode', () => {
    const onUpdate = cy.stub().as('update');
    cy.mount(SettingsAccount, { props: { isEditMode: true, user }, attrs: { 'onUpdate-account': onUpdate } });
    cy.get('input.form-input').first().clear().type('Sam');
    cy.get('.submit-btn').click();
    cy.get('@update').should('have.been.called');
    cy.get('@update').its('firstCall.args.0').should('deep.include', { first_name: 'Sam' });
  });
});
