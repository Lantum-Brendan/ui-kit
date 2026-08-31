import { h } from 'vue';
import TModal from './TModal.vue';

describe('TModal', () => {
  it('does not render overlay when modelValue false', () => {
    cy.mount(TModal, { props: { modelValue: false } });
    cy.get('.t-modal-overlay').should('not.exist');
  });

  it('renders overlay and dialog when open', () => {
    cy.mount(TModal, { props: { modelValue: true }, slots: { default: () => h('div', { class: 'modal-body' }, 'Hello modal') } });
    cy.get('.t-modal-overlay').should('exist');
    cy.get('.t-modal-dialog').should('exist');
    cy.get('.modal-body').should('contain.text', 'Hello modal');
  });

  it('applies size classes', () => {
    cy.mount(TModal, { props: { modelValue: true, size: 'lg' }, slots: { default: () => 'content' } });
    cy.get('.t-modal-dialog').should('have.class', 't-modal-dialog--lg');
    cy.mount(TModal, { props: { modelValue: true, size: 'sm' }, slots: { default: () => 'content' } });
    cy.get('.t-modal-dialog').should('have.class', 't-modal-dialog--sm');
  });

  it('emits update:modelValue and close on backdrop click', () => {
    const onUpdate = cy.stub().as('update');
    const onClose = cy.stub().as('close');
    cy.mount(TModal, { props: { modelValue: true, 'onUpdate:modelValue': onUpdate, onClose }, slots: { default: () => 'body' } });
    // click overlay self (backdrop)
    cy.get('.t-modal-overlay').click('topLeft', { force: true });
    cy.get('@update').should('have.been.calledWith', false);
    cy.get('@close').should('have.been.calledOnce');
  });
});
