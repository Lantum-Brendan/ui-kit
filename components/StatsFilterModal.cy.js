import StatsFilterModal from './StatsFilterModal.vue';

const wallets = [
  { id: 1, name: 'Main Wallet', currency: 'USD' },
  { id: 2, name: 'Savings', currency: 'EUR' },
];

describe('StatsFilterModal', () => {
  it('renders header, date inputs and wallet options', () => {
    cy.mount(StatsFilterModal, { props: { wallets, initialFilters: {}, currentPeriod: '' } });
    cy.get('.filter-modal-overlay').should('exist');
    cy.get('.filter-modal__title').should('contain.text', 'Filter Statistics');
    cy.get('.filter-modal__input[type="date"]').should('have.length', 2);
    cy.get('.filter-modal__wallet-option').should('have.length', 2);
  });

  it('emits close on overlay and close button', () => {
    const onClose = cy.stub().as('close');
    cy.mount(StatsFilterModal, { props: { wallets }, attrs: { onClose } });
    cy.get('.filter-modal__close').click();
    cy.get('@close').should('have.been.calledOnce');
  });

  it('applies preset and emits apply on Apply Filters', () => {
    const onApply = cy.stub().as('apply');
    cy.mount(StatsFilterModal, { props: { wallets, initialFilters: {} }, attrs: { onApply } });
    cy.contains('.filter-modal__preset-btn', 'This Week').click();
    cy.get('.filter-modal__input').first().should('not.have.value', '');
    cy.contains('.filter-modal__btn--primary', 'Apply Filters').click();
    cy.get('@apply').should('have.been.called');
    cy.get('@apply').its('firstCall.args.0').should('have.property', 'startDate');
  });

  it('resets filters on Reset', () => {
    cy.mount(StatsFilterModal, { props: { wallets, initialFilters: { startDate: '2026-01-01', endDate: '2026-01-31', walletIds: [1] } } });
    cy.contains('.filter-modal__btn--secondary', 'Reset').click();
    cy.get('.filter-modal__input').first().should('have.value', '');
    cy.get('.filter-modal__checkbox').first().should('be.checked');
  });
});
