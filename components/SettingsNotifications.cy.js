import SettingsNotifications from './SettingsNotifications.vue';

const prefsAll = {
  channels: { email: true, push: true, inapp: true },
  types: { reminders: true, insights: true, inactivity: true },
};

describe('SettingsNotifications', () => {
  it('shows loading state', () => {
    cy.mount(SettingsNotifications, { props: { loading: true } });
    cy.get('.loading-state').should('contain.text', 'Loading preferences');
    cy.get('.toggle-item').should('not.exist');
  });

  it('renders channels and types toggles', () => {
    cy.mount(SettingsNotifications, { props: { loading: false, preferences: prefsAll, isEditMode: false } });
    cy.contains('.subsection-title', 'Notification Channels').should('exist');
    cy.contains('.subsection-title', 'Notification Types').should('exist');
    cy.get('.toggle-item').should('have.length', 6);
    cy.get('.toggle-switch input').should('be.disabled');
  });

  it('enables toggles in edit mode and emits change', () => {
    const onChange = cy.stub().as('change');
    cy.mount(SettingsNotifications, { props: { loading: false, preferences: prefsAll, isEditMode: true }, attrs: { onChange } });
    cy.get('.toggle-switch input').first().should('not.be.disabled');
    // uncheck first toggle
    cy.get('.toggle-switch input').first().uncheck({ force: true });
    cy.get('@change').should('have.been.called');
  });

  it('emits save with preferences', () => {
    const onSave = cy.stub().as('save');
    cy.mount(SettingsNotifications, { props: { loading: false, preferences: prefsAll, isEditMode: true, message: '' }, attrs: { onSave } });
    cy.get('.submit-btn').click();
    cy.get('@save').should('have.been.called');
    cy.get('@save').its('firstCall.args.0').should('deep.include', { channels: { email: true, push: true, inapp: true } });
  });
});
