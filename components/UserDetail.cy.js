import UserDetail from './UserDetail.vue';

const detail = {
  user: { first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', is_admin: false, created_at: '2024-03-10T12:00:00Z' },
  preferences: { country: 'US', language: 'en', currency: 'USD' },
  last_transaction_at: '2026-08-20T10:00:00Z',
  counts: { transactions: 42, wallets: 3, categories: 12 },
};

describe('UserDetail', () => {
  it('renders user header with name, email and initials', () => {
    cy.mount(UserDetail, { props: { detail, loading: false, error: '' } });
    cy.get('.detail').should('exist');
    cy.get('.detail__name').should('contain.text', 'Jane Doe');
    cy.get('.detail__email').should('contain.text', 'jane@example.com');
    cy.get('.avatar').should('contain.text', 'JD');
  });

  it('shows loading and error states', () => {
    cy.mount(UserDetail, { props: { detail: null, loading: true } });
    cy.get('.state').should('contain.text', 'Loading');
    cy.mount(UserDetail, { props: { detail: null, loading: false, error: 'Failed to load user.' } });
    cy.get('.state').should('contain.text', 'Failed to load user.');
  });

  it('renders profile facts and counts', () => {
    cy.mount(UserDetail, { props: { detail } });
    cy.get('.facts').should('exist');
    cy.contains('.fact dt', 'Country').should('exist');
    cy.get('.count').should('have.length', 3);
    cy.get('.count__value').first().should('contain.text', '42');
  });

  it('emits back and shows admin tag for admin user', () => {
    const onBack = cy.stub().as('back');
    const adminDetail = { ...detail, user: { ...detail.user, is_admin: true } };
    cy.mount(UserDetail, { props: { detail: adminDetail }, attrs: { onBack } });
    cy.get('.admin-tag').should('contain.text', 'Admin');
    cy.get('.link-back').click();
    cy.get('@back').should('have.been.calledOnce');
  });
});
