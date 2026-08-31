import ExtensionSlot from './ExtensionSlot.vue';

const makeContrib = (key, slot = 'settings.integrations', title = `Title ${key}`) => ({
  key,
  slot,
  integration: { key: `int-${key}`, name: `Integration ${key}`, description: null, icon: null, configured: true },
  ui: { slots: [slot], card: { title, cta: 'Open', description: `Desc ${key}` }, onboarding: null, component: null },
  configured: true
});

describe('ExtensionSlot', () => {
  it('renders nothing when contributions empty', () => {
    cy.mount(ExtensionSlot, { props: { contributions: [] } });
    cy.get('.ext-card').should('not.exist');
  });

  it('renders one card per contribution', () => {
    cy.mount(ExtensionSlot, { props: { contributions: [makeContrib('a'), makeContrib('b')] } });
    cy.get('.ext-card').should('have.length', 2);
    cy.contains('.ext-card-title', 'Title a').should('exist');
    cy.contains('.ext-card-title', 'Title b').should('exist');
  });

  it('forwards action event from descriptor', () => {
    const onAction = cy.stub().as('action');
    cy.mount(ExtensionSlot, {
      props: { contributions: [makeContrib('x')] },
      attrs: { onAction }
    });
    // clicking TButton inside descriptor should emit action; we check the descriptor's button exists
    cy.get('.ext-card').should('exist');
    // TButton renders anchor or button with text Open
    cy.contains('Open').click();
    cy.get('@action').should('have.been.calledOnce');
  });

  it('forwards next event for onboarding slot', () => {
    const onNext = cy.stub().as('next');
    const contrib = { ...makeContrib('onb', 'onboarding.steps'), ui: { slots: ['onboarding.steps'], card: { title: 'Onb' }, onboarding: { title: 'Welcome' }, component: null } };
    cy.mount(ExtensionSlot, { props: { contributions: [contrib] }, attrs: { onNext } });
    cy.contains('button', 'Continue').click();
    cy.get('@next').should('have.been.calledOnce');
  });
});
