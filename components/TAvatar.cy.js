import TAvatar from './TAvatar.vue';

const user = { first_name: 'Alice', last_name: 'Johnson', email: 'alice@example.com', is_admin: false };
const adminUser = { first_name: 'Bob', last_name: 'Admin', email: 'bob@example.com', is_admin: true };

describe('TAvatar', () => {
  it('renders avatar image and username when showName true', () => {
    cy.mount(TAvatar, { props: { imageUrl: 'https://i.pravatar.cc/150?img=32', userName: 'Alice Johnson', showName: true, user } });
    cy.get('.avatar-image').should('have.attr', 'src', 'https://i.pravatar.cc/150?img=32');
    cy.get('.user-name-text').should('contain.text', 'Alice Johnson');
  });

  it('hides name when showName false', () => {
    cy.mount(TAvatar, { props: { imageUrl: 'https://i.pravatar.cc/150?img=32', userName: 'Alice', showName: false, user } });
    cy.get('.user-name-text').should('not.exist');
  });

  it('opens dropdown on click and emits settings/logout', () => {
    const onSettings = cy.stub().as('settings');
    const onLogout = cy.stub().as('logout');
    cy.mount(TAvatar, { props: { imageUrl: 'https://i.pravatar.cc/150?img=32', user }, attrs: { onSettings, onLogout } });
    cy.get('.avatar-dropdown').should('not.exist');
    cy.get('.t-avatar-button').click();
    cy.get('.avatar-dropdown').should('exist');
    cy.contains('.menu-item', 'Settings').click({ force: true });
    cy.get('@settings').should('have.been.calledOnce');
    cy.get('.t-avatar-button').click();
    cy.get('.avatar-dropdown').should('exist');
    cy.contains('.menu-item--danger', 'Logout').click({ force: true });
    cy.get('@logout').should('have.been.calledOnce');
  });

  it('shows admin item for admin user and hides when showDropdown false', () => {
    cy.mount(TAvatar, { props: { imageUrl: 'https://i.pravatar.cc/150?img=32', user: adminUser } });
    cy.get('.t-avatar-button').click();
    cy.contains('.menu-item', 'Admin').should('exist');
    cy.mount(TAvatar, { props: { imageUrl: 'https://i.pravatar.cc/150?img=32', user, showDropdown: false } });
    cy.get('.t-avatar-button').click();
    cy.get('.avatar-dropdown').should('not.exist');
  });
});
