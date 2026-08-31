import MonthInReviewHeader from './MonthInReviewHeader.vue';

const labels = { monthInReview: 'Month in Review', close: 'Close' };

describe('MonthInReviewHeader', () => {
  it('renders bars for slides and marks active', () => {
    const slides = [{}, {}, {}];
    cy.mount(MonthInReviewHeader, { props: { slides, currentIndex: 1, labels, monthLabel: 'January 2026' } });
    cy.get('.bars').should('exist');
    cy.get('.bar').should('have.length', 3);
    cy.get('.bar').eq(0).should('have.class', 'bar--filled');
    cy.get('.bar').eq(1).should('have.class', 'bar--active');
    cy.get('.bar').eq(2).should('not.have.class', 'bar--filled');
    cy.get('.bar-fill').should('exist');
  });

  it('does not render bars when no slides', () => {
    cy.mount(MonthInReviewHeader, { props: { slides: [], labels } });
    cy.get('.bars').should('not.exist');
  });

  it('renders month label and default label fallback', () => {
    cy.mount(MonthInReviewHeader, { props: { slides: [{}], currentIndex: 0, labels, monthLabel: 'Feb 2026' } });
    cy.get('.story-month').should('contain.text', 'Feb 2026');
    cy.mount(MonthInReviewHeader, { props: { slides: [{}], currentIndex: 0, labels, monthLabel: '' } });
    cy.get('.story-month').should('contain.text', 'Month in Review');
  });

  it('emits close when close button clicked', () => {
    const onClose = cy.stub().as('close');
    cy.mount(MonthInReviewHeader, { props: { slides: [{}], currentIndex: 0, labels }, attrs: { onClose } });
    cy.get('.story-close').click();
    cy.get('@close').should('have.been.calledOnce');
  });

  it('applies paused class to bar-fill when paused', () => {
    cy.mount(MonthInReviewHeader, { props: { slides: [{}, {}], currentIndex: 0, labels, paused: true } });
    cy.get('.bar-fill').should('have.class', 'bar-fill--paused');
    cy.mount(MonthInReviewHeader, { props: { slides: [{}, {}], currentIndex: 0, labels, paused: false } });
    cy.get('.bar-fill').should('not.have.class', 'bar-fill--paused');
  });
});
