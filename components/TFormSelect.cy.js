import TFormSelect from './TFormSelect.vue';

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b', disabled: true },
  { label: 'Option C', value: 'c' }
];

describe('TFormSelect', () => {
  it('renders select with options', () => {
    cy.mount(TFormSelect, { props: { modelValue: 'a', options } });
    cy.get('.t-form-select').should('exist');
    cy.get('.t-form-select option').should('have.length', 3);
    cy.contains('option', 'Option A').should('exist');
    cy.get('.t-form-select').should('have.value', 'a');
  });

  it('handles disabled option', () => {
    cy.mount(TFormSelect, { props: { modelValue: 'a', options } });
    cy.get('option').eq(1).should('be.disabled');
  });

  it('applies size classes', () => {
    cy.mount(TFormSelect, { props: { modelValue: 'a', options, size: 'sm' } });
    cy.get('.t-form-select').should('have.class', 't-form-select--sm');
    cy.mount(TFormSelect, { props: { modelValue: 'a', options, size: 'lg' } });
    cy.get('.t-form-select').should('have.class', 't-form-select--lg');
  });

  it('applies error class', () => {
    cy.mount(TFormSelect, { props: { modelValue: 'a', options, error: true } });
    cy.get('.t-form-select').should('have.class', 't-form-select--error');
  });

  it('handles disabled state', () => {
    cy.mount(TFormSelect, { props: { modelValue: 'a', options, disabled: true } });
    cy.get('.t-form-select').should('be.disabled');
  });

  it('emits update:modelValue on change', () => {
    const onUpdate = cy.stub().as('update');
    cy.mount(TFormSelect, { props: { modelValue: 'a', options, 'onUpdate:modelValue': onUpdate } });
    cy.get('.t-form-select').select('c');
    cy.get('@update').should('have.been.calledWith', 'c');
  });

  it('renders slot content when provided', () => {
    cy.mount(TFormSelect, {
      props: { modelValue: 'x' },
      slots: { default: '<option value="x">Custom X</option><option value="y">Custom Y</option>' }
    });
    cy.get('.t-form-select option').should('have.length', 2);
    cy.contains('option', 'Custom X').should('exist');
  });
});
