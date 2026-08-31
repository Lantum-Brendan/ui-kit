import { h } from 'vue';
import TModalHeader from './TModalHeader.vue';

describe('TModalHeader', () => {
  it('renders title and close button by default', () => {
    cy.mount(TModalHeader, { props: { title: 'Edit wallet', showClose: true } });
    cy.get('.t-modal-header').should('exist');
    cy.get('.t-modal-header__title').should('contain.text', 'Edit wallet');
    cy.get('.t-modal-header__close-btn').should('exist');
  });

  it('hides close button when showClose false', () => {
    cy.mount(TModalHeader, { props: { title: 'Read only', showClose: false } });
    cy.get('.t-modal-header__close-btn').should('not.exist');
  });

  it('emits close when close button clicked', () => {
    const onClose = cy.stub().as('close');
    cy.mount(TModalHeader, { props: { title: 'Edit wallet' }, attrs: { onClose } });
    cy.get('.t-modal-header__close-btn').click();
    cy.get('@close').should('have.been.calledOnce');
  });

  it('renders custom title and icon slots', () => {
    cy.mount(TModalHeader, {
      props: { title: '' },
      slots: {
        icon: () => h('span', { class: 'custom-icon' }, 'ICON'),
        title: () => h('h3', { class: 'custom-title' }, 'Custom Title'),
        actions: () => h('button', { class: 'custom-action' }, 'Action')
      }
    });
    cy.get('.custom-icon').should('exist');
    cy.get('.custom-title').should('contain.text', 'Custom Title');
    cy.get('.custom-action').should('exist');
  });
});
