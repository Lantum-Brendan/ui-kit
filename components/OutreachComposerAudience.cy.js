import OutreachComposerAudience from './OutreachComposerAudience.vue';

const audiences = [
  { value: 'all', label: 'All users' },
  { value: 'active', label: 'Active' },
  { value: 'specific', label: 'Specific' }
];

const users = [
  { id: 1, first_name: 'Alice', last_name: 'Smith', email: 'alice@example.com' },
  { id: 2, first_name: 'Bob', last_name: 'Jones', email: 'bob@example.com' }
];

const labels = {
  audience: 'Audience',
  audienceOptions: { all: 'All', active: 'Active', specific: 'Specific' },
  chooseRecipients: 'Choose recipients',
  searchUsers: 'Search users',
  noMatches: 'No matches'
};

describe('OutreachComposerAudience', () => {
  it('renders audience select with options', () => {
    cy.mount(OutreachComposerAudience, {
      props: { audiences, selectedAudience: 'all', users, selectedUserIds: [], labels }
    });
    cy.contains('.field__label', 'Audience').should('exist');
    cy.get('select').first().should('exist');
    cy.get('select').first().find('option').should('have.length', 3);
    cy.get('select').first().should('have.value', 'all');
  });

  it('emits update:selectedAudience on change', () => {
    const onUpdate = cy.stub().as('updateAudience');
    cy.mount(OutreachComposerAudience, {
      props: { audiences, selectedAudience: 'all', users, selectedUserIds: [], labels, 'onUpdate:selectedAudience': onUpdate }
    });
    cy.get('select').first().select('specific');
    cy.get('@updateAudience').should('have.been.calledWith', 'specific');
  });

  it('shows recipients list when specific audience selected', () => {
    cy.mount(OutreachComposerAudience, {
      props: { audiences, selectedAudience: 'specific', users, selectedUserIds: [], labels }
    });
    cy.contains('.field__label', 'Choose recipients').should('exist');
    cy.get('.recipients').should('exist');
    cy.get('.recipient').should('have.length', 2);
    cy.contains('.recipient__text', 'Alice Smith').should('exist');
  });

  it('hides recipients when not specific', () => {
    cy.mount(OutreachComposerAudience, {
      props: { audiences, selectedAudience: 'all', users, selectedUserIds: [], labels }
    });
    cy.get('.recipients').should('not.exist');
  });

  it('emits update:selectedUserIds and update:userIds when toggling', () => {
    const onIds = cy.stub().as('ids');
    const onUserIds = cy.stub().as('userIds');
    cy.mount(OutreachComposerAudience, {
      props: {
        audiences,
        selectedAudience: 'specific',
        users,
        selectedUserIds: [],
        labels,
        'onUpdate:selectedUserIds': onIds,
        'onUpdate:userIds': onUserIds
      }
    });
    cy.get('.recipient input[type="checkbox"]').first().check({ force: true });
    cy.get('@ids').should('have.been.calledWith', [1]);
    cy.get('@userIds').should('have.been.calledWith', [1]);
  });

  it('filters users via search input', () => {
    cy.mount(OutreachComposerAudience, {
      props: { audiences, selectedAudience: 'specific', users, selectedUserIds: [], labels }
    });
    cy.get('input[placeholder="Search users"]').type('bob');
    cy.get('.recipient').should('have.length', 1);
    cy.contains('.recipient__text', 'Bob Jones').should('exist');
    cy.get('input[placeholder="Search users"]').clear().type('zzz');
    cy.contains('.recipients__empty', 'No matches').should('exist');
  });
});
