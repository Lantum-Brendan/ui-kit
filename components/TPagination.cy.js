import TPagination from './TPagination.vue';

describe('TPagination', () => {
  it('renders controls and info text', () => {
    cy.mount(TPagination, { props: { currentPage: 1, totalPages: 5, entryText: 'Showing 1-10 of 50' } });
    cy.get('.t-pagination').should('exist');
    cy.get('.t-pagination__controls').should('exist');
    cy.get('.t-pagination__info').should('contain.text', 'Showing 1-10 of 50');
  });

  it('disables prev on first page and next on last', () => {
    cy.mount(TPagination, { props: { currentPage: 1, totalPages: 3 } });
    cy.get('.t-pagination__btn').first().should('be.disabled');
    cy.mount(TPagination, { props: { currentPage: 3, totalPages: 3 } });
    cy.get('.t-pagination__btn').last().should('be.disabled');
  });

  it('marks active page button', () => {
    cy.mount(TPagination, { props: { currentPage: 2, totalPages: 5 } });
    cy.get('.t-pagination__btn--active').should('contain.text', '2');
  });

  it('emits page-change on page number click', () => {
    const onPageChange = cy.stub().as('pageChange');
    cy.mount(TPagination, { props: { currentPage: 2, totalPages: 5 }, attrs: { onPageChange } });
    cy.contains('.t-pagination__btn', '3').click();
    cy.get('@pageChange').should('have.been.calledWith', 3);
  });

  it('emits prev and next via nav buttons', () => {
    const onPageChange = cy.stub().as('change');
    cy.mount(TPagination, { props: { currentPage: 2, totalPages: 3 }, attrs: { onPageChange } });
    cy.get('.t-pagination__btn').first().click();
    cy.get('@change').should('have.been.calledWith', 1);
    cy.get('.t-pagination__btn').last().click();
    cy.get('@change').should('have.been.calledWith', 3);
  });

  it('shows ellipsis when many pages', () => {
    cy.mount(TPagination, { props: { currentPage: 1, totalPages: 10, maxVisible: 5 } });
    cy.get('.t-pagination__btn--ellipsis').should('exist');
    cy.contains('.t-pagination__btn', '...').should('exist');
  });

  it('shows labels when showLabels true', () => {
    cy.mount(TPagination, { props: { currentPage: 1, totalPages: 3, showLabels: true, prevLabel: 'Prev', nextLabel: 'Next' } });
    cy.contains('.t-pagination__btn', 'Prev').should('exist');
    cy.contains('.t-pagination__btn', 'Next').should('exist');
    cy.mount(TPagination, { props: { currentPage: 1, totalPages: 3, showLabels: false } });
    cy.get('.t-pagination__btn').first().should('not.contain.text', 'Prev');
  });
});
