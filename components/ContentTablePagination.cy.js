import ContentTablePagination from './ContentTablePagination.vue';

describe('ContentTablePagination', () => {
  it('renders pagination controls and page info', () => {
    cy.mount(ContentTablePagination, { props: { currentPage: 1, totalPages: 3, perPage: 10 } });
    cy.get('.pagination-row').should('exist');
    cy.get('.pagination-button').should('exist');
    cy.get('.page-info').should('contain.text', 'Show');
    cy.get('.per-page-select').should('have.value', '10');
  });

  it('disables previous on first page and next on last page', () => {
    cy.mount(ContentTablePagination, { props: { currentPage: 1, totalPages: 5, perPage: 10 } });
    cy.get('.pagination-button--nav').first().should('be.disabled');
    cy.mount(ContentTablePagination, { props: { currentPage: 5, totalPages: 5, perPage: 10 } });
    cy.get('.pagination-button--nav').eq(1).should('be.disabled');
  });

  it('emits update:currentPage on page click', () => {
    const onPage = cy.stub().as('page');
    cy.mount(ContentTablePagination, {
      props: { currentPage: 2, totalPages: 3, perPage: 10, 'onUpdate:currentPage': onPage }
    });
    cy.contains('.pagination-button', '3').click();
    cy.get('@page').should('have.been.calledWith', 3);
    cy.contains('.pagination-button', '1').click();
    cy.get('@page').should('have.been.calledWith', 1);
  });

  it('emits next and previous page via nav buttons', () => {
    const onPage = cy.stub().as('page');
    cy.mount(ContentTablePagination, {
      props: { currentPage: 2, totalPages: 3, perPage: 10, 'onUpdate:currentPage': onPage }
    });
    cy.get('.pagination-button--nav').first().click();
    cy.get('@page').should('have.been.calledWith', 1);
    cy.get('.pagination-button--nav').eq(1).click();
    cy.get('@page').should('have.been.calledWith', 3);
  });

  it('emits update:perPage on select change', () => {
    const onPerPage = cy.stub().as('perPage');
    cy.mount(ContentTablePagination, {
      props: { currentPage: 1, totalPages: 10, perPage: 10, 'onUpdate:perPage': onPerPage }
    });
    cy.get('.per-page-select').select('25');
    cy.get('@perPage').should('have.been.calledWith', 25);
  });

  it('shows ellipsis for many pages', () => {
    cy.mount(ContentTablePagination, { props: { currentPage: 1, totalPages: 10, perPage: 10 } });
    cy.get('.pagination-button.ellipsis').should('exist');
    cy.contains('.pagination-button', '...').should('exist');
  });
});
