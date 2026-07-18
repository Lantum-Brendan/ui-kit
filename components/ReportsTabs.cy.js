import { Home, Settings, Bell } from 'lucide-vue-next';
import ReportsTabs from './ReportsTabs.vue';

const tabs = [
  { value: 'overview', label: 'Overview', icon: Home },
  { value: 'activity', label: 'Activity', icon: Bell, count: 3 },
  { value: 'settings', label: 'Settings', icon: Settings }
];

describe('ReportsTabs', () => {
  it('renders a tab button per entry with labels', () => {
    cy.mount(ReportsTabs, { props: { modelValue: 'overview', tabs } });
    cy.get('.tab').should('have.length', 3);
    cy.get('.tab-label').first().should('contain.text', 'Overview');
  });

  it('marks the active tab', () => {
    cy.mount(ReportsTabs, { props: { modelValue: 'activity', tabs } });
    cy.get('.tab').eq(1).should('have.class', 'tab--active');
  });

  it('renders a count badge when provided', () => {
    cy.mount(ReportsTabs, { props: { modelValue: 'overview', tabs } });
    cy.get('.tab-count').should('contain.text', '3');
  });

  it('emits update:modelValue when a tab is clicked', () => {
    const onUpdate = cy.stub().as('update');
    cy.mount(ReportsTabs, {
      props: { modelValue: 'overview', tabs, 'onUpdate:modelValue': onUpdate }
    });
    cy.get('.tab').eq(2).click();
    cy.get('@update').should('have.been.calledWith', 'settings');
  });
});
