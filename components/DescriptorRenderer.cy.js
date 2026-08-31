import DescriptorRenderer from './DescriptorRenderer.vue';
import { h } from 'vue';

const baseContribution = {
  key: 'ext-1',
  slot: 'settings.integrations',
  integration: { key: 'integration-1', name: 'Mock Integration', description: 'Desc', icon: null, configured: false },
  ui: { slots: ['settings.integrations'], card: { title: 'Card Title', cta: 'Open', description: 'Card desc', href: '/open' }, onboarding: null, component: null },
  configured: false
};

describe('DescriptorRenderer', () => {
  it('renders default card fallback', () => {
    cy.mount(DescriptorRenderer, { props: { contribution: baseContribution } });
    cy.get('.ext-card').should('exist');
    cy.get('.ext-card-title').should('contain.text', 'Card Title');
    cy.get('.ext-card-desc').should('contain.text', 'Card desc');
  });

  it('shows needs setup badge when not configured', () => {
    cy.mount(DescriptorRenderer, { props: { contribution: baseContribution, needsSetupLabel: 'Needs setup' } });
    cy.get('.ext-card-badge').should('contain.text', 'Needs setup');
  });

  it('does not show badge when configured', () => {
    const configured = { ...baseContribution, configured: true, integration: { ...baseContribution.integration, configured: true } };
    cy.mount(DescriptorRenderer, { props: { contribution: configured } });
    cy.get('.ext-card-badge').should('not.exist');
  });

  it('renders sidebar.nav variant', () => {
    const nav = { ...baseContribution, slot: 'sidebar.nav', ui: { ...baseContribution.ui, card: { ...baseContribution.ui.card, href: '/nav' } } };
    cy.mount(DescriptorRenderer, { props: { contribution: nav } });
    cy.get('.ext-nav-item').should('exist');
    cy.get('.ext-nav-label').should('contain.text', 'Card Title');
  });

  it('renders onboarding.steps variant with continue button', () => {
    const onboarding = {
      ...baseContribution,
      slot: 'onboarding.steps',
      ui: { ...baseContribution.ui, onboarding: { title: 'Welcome', description: 'Do setup', href: '/setup' } }
    };
    const onNext = cy.stub().as('next');
    cy.mount(DescriptorRenderer, { props: { contribution: onboarding }, attrs: { onNext } });
    cy.get('.ext-onboarding').should('exist');
    cy.get('.ext-onboarding-title').should('contain.text', 'Welcome');
    cy.contains('button', 'Continue').click();
    cy.get('@next').should('have.been.calledOnce');
  });

  it('renders resolved component when provided', () => {
    const MyComp = {
      props: ['contribution'],
      render() {
        return h('div', { class: 'my-resolved' }, `Resolved ${this.contribution.key}`);
      }
    };
    const withResolve = { ...baseContribution, ui: { ...baseContribution.ui, component: 'my-comp' } };
    cy.mount(DescriptorRenderer, {
      props: { contribution: withResolve, resolveComponent: (key) => key === 'my-comp' ? MyComp : null }
    });
    cy.get('.my-resolved').should('contain.text', 'ext-1');
    cy.get('.ext-card').should('not.exist');
  });
});
