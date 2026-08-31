import NotificationsContainer from './NotificationsContainer.vue';

describe('NotificationsContainer', () => {
  const notifications = [
    { id: 1, type: 'success', title: 'Saved', message: 'Transaction saved' },
    { id: 2, type: 'error', title: 'Failed', message: 'Network error' },
    { id: 3, type: 'warning', title: 'Warning', message: 'Low balance' },
    { id: 4, type: 'info', title: 'Info' }
  ];

  it('renders notifications with type classes', () => {
    cy.mount(NotificationsContainer, { props: { notifications } });
    cy.get('.notifications-container').should('exist');
    cy.get('.notification').should('have.length', 4);
    cy.get('.notification--success').should('contain.text', 'Saved');
    cy.get('.notification--error').should('contain.text', 'Failed');
    cy.get('.notification--warning').should('contain.text', 'Warning');
    cy.get('.notification--info').should('exist');
  });

  it('emits remove when notification clicked', () => {
    const onRemove = cy.stub().as('remove');
    cy.mount(NotificationsContainer, { props: { notifications }, attrs: { onRemove } });
    cy.get('.notification').first().click();
    cy.get('@remove').should('have.been.calledWith', 1);
  });

  it('emits remove when close button clicked with stop propagation', () => {
    const onRemove = cy.stub().as('remove');
    cy.mount(NotificationsContainer, { props: { notifications }, attrs: { onRemove } });
    cy.get('.notification-close').first().click();
    cy.get('@remove').should('have.been.calledWith', 1);
  });

  it('renders confirm modal when open and forwards confirm-response', () => {
    const onConfirmResponse = cy.stub().as('confirmResponse');
    cy.mount(NotificationsContainer, {
      props: {
        notifications: [],
        confirmModal: { isOpen: true, title: 'Confirm delete', message: 'Are you sure?', confirmText: 'Yes', cancelText: 'No', type: 'danger' }
      },
      attrs: { onConfirmResponse }
    });
    // ConfirmModal renders via TModal; check title appears
    cy.contains('Confirm delete').should('exist');
    cy.contains('button', 'Yes').click();
    cy.get('@confirmResponse').should('have.been.calledWith', true);
  });

  it('handles notification without message gracefully', () => {
    cy.mount(NotificationsContainer, { props: { notifications: [notifications[3]] } });
    cy.get('.notification-title').should('contain.text', 'Info');
    cy.get('.notification-message').should('not.exist');
  });
});
