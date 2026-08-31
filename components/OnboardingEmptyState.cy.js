import OnboardingEmptyState from './OnboardingEmptyState.vue';

describe('OnboardingEmptyState', () => {
  it('renders wallets onboarding with title and steps', () => {
    cy.mount(OnboardingEmptyState, { props: { pageType: 'wallets' } });
    cy.get('.onboarding-empty-state').should('exist');
    cy.get('.onboarding-title').should('contain.text', "Let's Set Up Your First Wallet");
    cy.get('.onboarding-subtitle').should('exist');
    cy.get('.steps-list .step-item').should('have.length', 3);
    cy.contains('.step-text', 'Create your first wallet').should('exist');
    cy.get('.oe-eyebrow').should('contain.text', 'Getting started');
  });

  it('renders custom gettingStarted label', () => {
    cy.mount(OnboardingEmptyState, { props: { pageType: 'wallets', labels: { gettingStarted: 'Start here' } } });
    cy.get('.oe-eyebrow').should('contain.text', 'Start here');
  });

  it('renders transactions page type', () => {
    cy.mount(OnboardingEmptyState, { props: { pageType: 'transactions' } });
    cy.get('.onboarding-title').should('contain.text', 'Ready to Track Your First Transaction');
    cy.get('.steps-list .step-item').should('have.length', 4);
  });

  it('renders categories page type with tip', () => {
    cy.mount(OnboardingEmptyState, { props: { pageType: 'categories' } });
    cy.get('.onboarding-title').should('contain.text', 'Organize Your Money with Categories');
    cy.contains('.tip-text', "Don't worry").should('exist');
  });

  it('emits create when primary button clicked', () => {
    const onCreate = cy.stub().as('create');
    cy.mount(OnboardingEmptyState, { props: { pageType: 'wallets' }, attrs: { onCreate } });
    cy.get('.primary-action-btn').should('contain.text', 'Add First Wallet');
    cy.get('.primary-action-btn').click();
    cy.get('@create').should('have.been.calledOnce');
  });

  it('renders illustration icon', () => {
    cy.mount(OnboardingEmptyState, { props: { pageType: 'budgets' } });
    cy.get('.illustration-wrap').should('exist');
    cy.get('.main-icon').should('exist');
  });
});
