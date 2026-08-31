import ChatProgressSteps from './ChatProgressSteps.vue';

describe('ChatProgressSteps', () => {
  it('renders all steps', () => {
    cy.mount(ChatProgressSteps, { props: { steps: ['Thinking', 'Searching', 'Answering'] } });
    cy.get('.chat-progress').should('exist');
    cy.get('.progress-step').should('have.length', 3);
    cy.get('.step-label').first().should('contain.text', 'Thinking');
  });

  it('marks completed steps as done with check icon', () => {
    cy.mount(ChatProgressSteps, { props: { steps: ['One', 'Two', 'Three'] } });
    cy.get('.progress-step.done').should('have.length', 2);
    cy.get('.progress-step').last().should('not.have.class', 'done');
  });

  it('shows spinner for last step', () => {
    cy.mount(ChatProgressSteps, { props: { steps: ['A', 'B'] } });
    cy.get('.step-spinner').should('exist');
  });

  it('renders single step as spinner only', () => {
    cy.mount(ChatProgressSteps, { props: { steps: ['Only'] } });
    cy.get('.progress-step').should('have.length', 1);
    cy.get('.progress-step.done').should('have.length', 0);
    cy.get('.step-spinner').should('exist');
  });
});
