import TransactionFormIntent from './TransactionFormIntent.vue';

const options = [
  { value: 'regular', label: 'Regular' },
  { value: 'gift', label: 'Gift' },
  { value: 'investment_buy', label: 'Buy Investment' }
];

const labels = {
  intentLabels: {
    regular: 'Regular label',
    gift: 'Gift label',
    investment_buy: 'Buy label'
  }
};

describe('TransactionFormIntent', () => {
  it('renders all intent pills with labels', () => {
    cy.mount(TransactionFormIntent, {
      props: { modelValue: 'regular', options, labels, label: 'Intent' }
    });
    cy.get('.intent-pills').should('exist');
    cy.get('.intent-pill').should('have.length', 3);
    cy.contains('.intent-pill', 'Regular label').should('exist');
    cy.contains('.intent-pill', 'Gift label').should('exist');
  });

  it('marks the active pill', () => {
    cy.mount(TransactionFormIntent, {
      props: { modelValue: 'gift', options, labels }
    });
    cy.get('.intent-pill').eq(1).should('have.class', 'intent-pill--active');
    cy.get('.intent-pill').eq(1).should('have.attr', 'aria-checked', 'true');
    cy.get('.intent-pill').eq(0).should('not.have.class', 'intent-pill--active');
  });

  it('emits update:modelValue when clicking a pill', () => {
    const onUpdate = cy.stub().as('update');
    cy.mount(TransactionFormIntent, {
      props: { modelValue: 'regular', options, labels, 'onUpdate:modelValue': onUpdate }
    });
    cy.contains('.intent-pill', 'Gift label').click();
    cy.get('@update').should('have.been.calledWith', 'gift');
    cy.contains('.intent-pill', 'Buy label').click();
    cy.get('@update').should('have.been.calledWith', 'investment_buy');
  });

  it('uses fallback opt.label when no intentLabels entry', () => {
    cy.mount(TransactionFormIntent, {
      props: { modelValue: 'regular', options: [{ value: 'custom', label: 'Custom Intent' }], labels: { intentLabels: {} } }
    });
    cy.get('.intent-pill').should('contain.text', 'Custom Intent');
  });
});
