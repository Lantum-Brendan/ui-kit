import TSidebarRail from './TSidebarRail.vue';
import { h } from 'vue';

const DummyIcon = {
  name: 'DummyIcon',
  template: '<span class="dummy-icon">I</span>'
};

const items = [
  { to: '/dashboard', label: 'Dashboard', labelKey: 'dashboard', hint: 'Overview', hintKey: 'overview', icon: DummyIcon },
  { to: '/wallets', label: 'Wallets', labelKey: 'wallets', hint: 'Manage wallets', hintKey: 'walletsHint', icon: DummyIcon },
  { to: '/settings', label: 'Settings', labelKey: 'settings', icon: DummyIcon }
];

const labels = {
  dashboard: 'Dashboard label',
  wallets: 'Wallets label',
  settings: 'Settings label',
  overview: 'Overview hint',
  walletsHint: 'Manage your wallets'
};

describe('TSidebarRail', () => {
  it('renders all nav buttons', () => {
    cy.mount(TSidebarRail, { props: { items, activeId: '', labels } });
    cy.get('.sidebar-rail').should('exist');
    cy.get('.nav-button').should('have.length', 3);
    cy.contains('.nav-button', 'Dashboard label').should('exist');
    cy.contains('.nav-button', 'Wallets label').should('exist');
  });

  it('marks active item as selected', () => {
    cy.mount(TSidebarRail, { props: { items, activeId: '/dashboard', labels } });
    cy.get('.nav-button').first().should('have.class', 'selected');
    cy.get('.nav-button').eq(1).should('not.have.class', 'selected');
  });

  it('marks nested active path as selected', () => {
    cy.mount(TSidebarRail, { props: { items, activeId: '/dashboard/stats', labels } });
    cy.get('.nav-button').first().should('have.class', 'selected');
  });

  it('emits select when clicking item', () => {
    const onSelect = cy.stub().as('select');
    cy.mount(TSidebarRail, { props: { items, activeId: '', labels }, attrs: { onSelect } });
    cy.get('.nav-button').eq(1).click();
    cy.get('@select').should('have.been.calledWith', '/wallets');
  });

  it('applies compact class when collapsed', () => {
    cy.mount(TSidebarRail, { props: { items, collapsed: true, labels } });
    cy.get('.sidebar-rail').should('have.class', 'sidebar-rail--compact');
    cy.get('.compact-label').should('exist');
    cy.mount(TSidebarRail, { props: { items, collapsed: false, labels } });
    cy.get('.sidebar-rail').should('not.have.class', 'sidebar-rail--compact');
  });

  it('shows hint subtext when not collapsed and hint exists', () => {
    cy.mount(TSidebarRail, { props: { items, collapsed: false, labels } });
    cy.get('.nav-copy').should('exist');
    cy.contains('.subtext', 'Overview hint').should('exist');
  });
});
