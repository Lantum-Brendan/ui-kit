import DashboardAgentHero from './DashboardAgentHero.vue';

describe('DashboardAgentHero', () => {
  it('renders greeting with name and subtitle', () => {
    cy.mount(DashboardAgentHero, { props: { name: 'Alex' } });
    cy.get('.agent-hero').should('exist');
    cy.get('.hero-title').should('contain.text', 'Alex');
    cy.get('.hero-sub').should('exist');
  });

  it('uses defaultName when name empty', () => {
    cy.mount(DashboardAgentHero, { props: { name: '' } });
    cy.get('.hero-title').should('contain.text', 'there');
  });

  it('disables send when input empty and emits ask on submit', () => {
    const onAsk = cy.stub().as('ask');
    cy.mount(DashboardAgentHero, { props: { name: 'Sam' }, attrs: { onAsk } });
    cy.get('.hero-send').should('be.disabled');
    cy.get('.hero-input').type('log 12 for lunch');
    cy.get('.hero-send').should('not.be.disabled');
    cy.get('.hero-ask').submit();
    cy.get('@ask').should('have.been.calledWith', 'log 12 for lunch');
    cy.get('.hero-input').should('have.value', '');
  });

  it('emits action when chip clicked', () => {
    const onAction = cy.stub().as('action');
    cy.mount(DashboardAgentHero, { props: { name: 'Sam' }, attrs: { onAction } });
    cy.get('.agent-chip').should('have.length', 4);
    cy.get('.agent-chip').first().click();
    cy.get('@action').should('have.been.calledOnce');
  });

  it('dismisses hero on close button', () => {
    cy.mount(DashboardAgentHero, { props: { name: 'Sam' } });
    cy.get('.agent-hero').should('exist');
    cy.get('.hero-dismiss').click();
    cy.get('.agent-hero').should('not.exist');
  });
});
