import NotificationBell from './NotificationBell.vue';

describe('NotificationBell', () => {
  it('renders bell button and badge for unreadCount', () => {
    cy.mount(NotificationBell, { props: { unreadCount: 5, notifications: [] } });
    cy.get('.notification-bell').should('exist');
    cy.get('.bell-button').should('exist');
    cy.get('.badge').should('contain.text', '5');
  });

  it('caps badge at 99+', () => {
    cy.mount(NotificationBell, { props: { unreadCount: 150, notifications: [] } });
    cy.get('.badge').should('contain.text', '99+');
  });

  it('does not show badge when 0', () => {
    cy.mount(NotificationBell, { props: { unreadCount: 0, notifications: [] } });
    cy.get('.badge').should('not.exist');
  });

  it('toggles dropdown and shows empty state', () => {
    const onToggle = cy.stub().as('toggle');
    cy.mount(NotificationBell, { props: { notifications: [], unreadCount: 0 }, attrs: { onToggle } });
    cy.get('.bell-button').click();
    cy.get('@toggle').should('have.been.calledWith', true);
    cy.get('.notification-dropdown').should('exist');
    cy.get('.dropdown-empty').should('contain.text', 'No notifications yet');
  });

  it('shows loading and notifications list', () => {
    cy.mount(NotificationBell, { props: { loading: true, notifications: [] } });
    cy.get('.bell-button').click();
    cy.get('.dropdown-loading').should('contain.text', 'Loading');
  });

  it('renders notifications and emits events', () => {
    const notifications = [
      { id: 1, type: 'reminder', title: 'Pay rent', body: 'Rent due tomorrow, please pay on time', read_at: null, created_at: new Date().toISOString() },
      { id: 2, type: 'system', title: 'Update', body: 'System update', read_at: '2026-01-01', created_at: new Date(Date.now() - 3600000 * 5).toISOString() }
    ];
    const onMarkAllRead = cy.stub().as('markAll');
    const onMarkRead = cy.stub().as('markRead');
    const onClickNotification = cy.stub().as('click');
    cy.mount(NotificationBell, {
      props: { notifications, unreadCount: 1 },
      attrs: { onMarkAllRead, onMarkRead, onClickNotification }
    });
    cy.get('.bell-button').click();
    cy.get('.notification-list').should('exist');
    cy.get('.notification-item').should('have.length', 2);
    cy.get('.notification-item').first().should('have.class', 'unread');
    cy.get('.mark-all-btn').click();
    cy.get('@markAll').should('have.been.calledOnce');
    cy.get('.mark-read-btn').first().click();
    cy.get('@markRead').should('have.been.calledWith', 1);
    cy.get('.notification-item').first().click();
    cy.get('@click').should('have.been.calledOnce');
  });
});
