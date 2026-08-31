import TransactionFormRecurring from './TransactionFormRecurring.vue';

const labels = {
  makeRecurring: 'Make recurring',
  recurrencePeriod: 'Period',
  repeatEvery: 'Repeat every',
  endDate: 'End date',
  optional: 'optional',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly'
};

describe('TransactionFormRecurring', () => {
  it('renders toggle unchecked and hides recurring fields', () => {
    cy.mount(TransactionFormRecurring, {
      props: { modelValue: false, period: 'monthly', interval: 1, endsAt: '', labels }
    });
    cy.get('.recurring-toggle').should('contain.text', 'Make recurring');
    cy.get('.recurring-toggle input').should('not.be.checked');
    cy.get('.recurring-fields').should('not.exist');
  });

  it('shows recurring fields when modelValue true', () => {
    cy.mount(TransactionFormRecurring, {
      props: { modelValue: true, period: 'weekly', interval: 2, endsAt: '2026-12-31', labels }
    });
    cy.get('.recurring-toggle input').should('be.checked');
    cy.get('.recurring-fields').should('exist');
    cy.get('.recurring-select').should('have.value', 'weekly');
    cy.get('input[type="number"]').should('have.value', '2');
    cy.get('input[type="date"]').should('have.value', '2026-12-31');
    cy.contains('Daily').should('exist');
    cy.contains('Weekly').should('exist');
  });

  it('emits update:modelValue on toggle change', () => {
    const onUpdateModelValue = cy.stub().as('updateModel');
    cy.mount(TransactionFormRecurring, {
      props: { modelValue: false, period: 'monthly', interval: 1, endsAt: '', labels, 'onUpdate:modelValue': onUpdateModelValue }
    });
    cy.get('.recurring-toggle input').check({ force: true });
    cy.get('@updateModel').should('have.been.calledWith', true);
  });

  it('emits update:period, update:interval, update:endsAt', () => {
    const onPeriod = cy.stub().as('period');
    const onInterval = cy.stub().as('interval');
    const onEndsAt = cy.stub().as('endsAt');
    cy.mount(TransactionFormRecurring, {
      props: {
        modelValue: true,
        period: 'monthly',
        interval: 1,
        endsAt: '',
        labels,
        'onUpdate:period': onPeriod,
        'onUpdate:interval': onInterval,
        'onUpdate:endsAt': onEndsAt
      }
    });
    cy.get('.recurring-select').select('daily');
    cy.get('@period').should('have.been.calledWith', 'daily');
    cy.get('input[type="number"]').clear().type('3');
    cy.get('@interval').should('have.been.called');
    cy.get('input[type="date"]').type('2026-01-01');
    cy.get('@endsAt').should('have.been.calledWith', '2026-01-01');
  });
});
