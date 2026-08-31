import TFormTextarea from './TFormTextarea.vue';

describe('TFormTextarea', () => {
  it('renders with value, placeholder and rows', () => {
    cy.mount(TFormTextarea, { props: { modelValue: 'hello world', placeholder: 'Enter description', rows: 5 } });
    cy.get('.t-form-textarea').should('have.value', 'hello world');
    cy.get('.t-form-textarea').should('have.attr', 'placeholder', 'Enter description');
    cy.get('.t-form-textarea').should('have.attr', 'rows', '5');
  });

  it('applies error class and disabled/readonly', () => {
    cy.mount(TFormTextarea, { props: { modelValue: '', error: true } });
    cy.get('.t-form-textarea').should('have.class', 't-form-textarea--error');
    cy.mount(TFormTextarea, { props: { modelValue: '', disabled: true } });
    cy.get('.t-form-textarea').should('be.disabled');
    cy.mount(TFormTextarea, { props: { modelValue: '', readonly: true } });
    cy.get('.t-form-textarea').should('have.attr', 'readonly');
  });

  it('emits update:modelValue on input', () => {
    const onUpdate = cy.stub().as('update');
    cy.mount(TFormTextarea, { props: { modelValue: '', 'onUpdate:modelValue': onUpdate } });
    cy.get('.t-form-textarea').type('test');
    cy.get('@update').should('have.been.called');
    cy.get('@update').its('firstCall.args.0').should('eq', 't');
  });

  it('emits blur and focus', () => {
    const onBlur = cy.stub().as('blur');
    const onFocus = cy.stub().as('focus');
    cy.mount(TFormTextarea, { props: { modelValue: '' }, attrs: { onBlur, onFocus } });
    cy.get('.t-form-textarea').focus();
    cy.get('@focus').should('have.been.called');
    cy.get('.t-form-textarea').blur();
    cy.get('@blur').should('have.been.called');
  });
});
