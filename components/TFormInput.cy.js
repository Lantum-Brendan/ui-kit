import TFormInput from './TFormInput.vue';

describe('TFormInput', () => {
  it('renders input with value and placeholder', () => {
    cy.mount(TFormInput, { props: { modelValue: 'hello', placeholder: 'Enter name' } });
    cy.get('.t-form-input').should('have.value', 'hello');
    cy.get('.t-form-input').should('have.attr', 'placeholder', 'Enter name');
    cy.get('.t-form-input').should('have.attr', 'type', 'text');
  });

  it('applies size classes', () => {
    cy.mount(TFormInput, { props: { modelValue: '', size: 'sm' } });
    cy.get('.t-form-input').should('have.class', 't-form-input--sm');
    cy.mount(TFormInput, { props: { modelValue: '', size: 'lg' } });
    cy.get('.t-form-input').should('have.class', 't-form-input--lg');
    cy.mount(TFormInput, { props: { modelValue: '', size: 'md' } });
    cy.get('.t-form-input').should('have.class', 't-form-input--md');
  });

  it('applies error class when error true', () => {
    cy.mount(TFormInput, { props: { modelValue: '', error: true } });
    cy.get('.t-form-input').should('have.class', 't-form-input--error');
    cy.mount(TFormInput, { props: { modelValue: '', error: false } });
    cy.get('.t-form-input').should('not.have.class', 't-form-input--error');
  });

  it('handles disabled and readonly', () => {
    cy.mount(TFormInput, { props: { modelValue: '', disabled: true } });
    cy.get('.t-form-input').should('be.disabled');
    cy.mount(TFormInput, { props: { modelValue: '', readonly: true } });
    cy.get('.t-form-input').should('have.attr', 'readonly');
  });

  it('emits update:modelValue on input', () => {
    const onUpdate = cy.stub().as('update');
    cy.mount(TFormInput, { props: { modelValue: '', 'onUpdate:modelValue': onUpdate } });
    cy.get('.t-form-input').type('test');
    cy.get('@update').should('have.been.called');
    // check first call arg is 't'
    cy.get('@update').its('firstCall.args.0').should('eq', 't');
  });

  it('emits blur and focus', () => {
    const onBlur = cy.stub().as('blur');
    const onFocus = cy.stub().as('focus');
    cy.mount(TFormInput, { props: { modelValue: '' }, attrs: { onBlur, onFocus } });
    cy.get('.t-form-input').focus();
    cy.get('@focus').should('have.been.called');
    cy.get('.t-form-input').blur();
    cy.get('@blur').should('have.been.called');
  });

  it('renders with type password', () => {
    cy.mount(TFormInput, { props: { modelValue: '', type: 'password' } });
    cy.get('.t-form-input').should('have.attr', 'type', 'password');
  });
});
