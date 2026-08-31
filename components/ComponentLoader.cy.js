import ComponentLoader from './ComponentLoader.vue';

describe('ComponentLoader', () => {
  it('shows loading skeleton when isLoading and no data', () => {
    cy.mount(ComponentLoader, { props: { isLoading: true, hasData: false } });
    cy.get('.component-loader').should('exist');
    // skeleton is rendered via LoadingSkeleton
    cy.get('.component-loader').should('contain.html', 'skeleton');
  });

  it('shows error state when error provided', () => {
    cy.mount(ComponentLoader, { props: { isLoading: false, error: 'Network error', hasData: false } });
    cy.get('.error-state').should('exist');
    cy.get('.error-message').should('contain.text', 'Network error');
  });

  it('shows retry button when onRetry provided', () => {
    const onRetry = cy.stub().as('retry');
    cy.mount(ComponentLoader, {
      props: { isLoading: false, error: { message: 'Failed' }, hasData: false, onRetry, labels: { error: 'Error:', somethingWentWrong: 'Oops', tryAgain: 'Try Again' } }
    });
    cy.get('.retry-btn').should('contain.text', 'Try Again').click();
    cy.get('@retry').should('have.been.calledOnce');
  });

  it('shows empty state when no data and no error', () => {
    cy.mount(ComponentLoader, { props: { isLoading: false, error: null, hasData: false, showEmpty: true, emptyStateName: 'wallets' } });
    cy.get('.empty-state').should('exist');
  });

  it('renders content slot when hasData', () => {
    cy.mount(ComponentLoader, {
      props: { isLoading: false, hasData: true },
      slots: { default: () => 'Loaded content' }
    });
    cy.get('.content-wrapper').should('contain.text', 'Loaded content');
  });
});
