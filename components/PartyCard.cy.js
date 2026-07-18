import PartyCard from './PartyCard.vue';

const party = {
  name: 'Acme Corp',
  type: 'business',
  description: 'A sample business party.',
  icon: 'Building2',
  receivedAmount: 1200,
  spentAmount: 400,
  lastUpdated: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
};

describe('PartyCard', () => {
  it('renders party name and type badge', () => {
    cy.mount(PartyCard, { props: { party } });
    cy.get('.party-name').should('contain.text', 'Acme Corp');
    cy.get('.party-type-badge').should('contain.text', 'Business');
  });

  it('renders received and spent labels with amounts', () => {
    cy.mount(PartyCard, { props: { party } });
    cy.get('.stat.received .stat-label').should('contain.text', 'Received');
    cy.get('.stat.received .stat-value').should('contain.text', '$1200');
    cy.get('.stat.spent .stat-label').should('contain.text', 'Spent');
    cy.get('.stat.spent .stat-value').should('contain.text', '$400');
  });

  it('opens the action menu on click', () => {
    cy.mount(PartyCard, { props: { party } });
    cy.get('.action-dropdown').should('not.exist');
    cy.get('.action-menu').click();
    cy.get('.action-dropdown').should('exist');
    cy.get('.dropdown-item.edit').should('contain.text', 'Edit');
    cy.get('.dropdown-item.delete').should('contain.text', 'Delete');
  });

  it('emits edit and delete with the party', () => {
    const onEdit = cy.stub().as('edit');
    const onDelete = cy.stub().as('delete');
    cy.mount(PartyCard, { props: { party, onEdit, onDelete } });
    cy.get('.action-menu').click();
    cy.get('.dropdown-item.edit').click();
    cy.get('@edit').should('have.been.calledWith', party);
    cy.get('.action-menu').click();
    cy.get('.dropdown-item.delete').click();
    cy.get('@delete').should('have.been.calledWith', party);
  });

  it('uses custom labels from props', () => {
    cy.mount(PartyCard, {
      props: {
        party,
        editLabel: 'Bearbeiten',
        deleteLabel: 'Löschen',
        receivedLabel: 'Erhalten',
        spentLabel: 'Ausgegeben'
      }
    });
    cy.get('.action-menu').click();
    cy.get('.dropdown-item.edit').should('contain.text', 'Bearbeiten');
    cy.get('.dropdown-item.delete').should('contain.text', 'Löschen');
    cy.get('.stat.received .stat-label').should('contain.text', 'Erhalten');
    cy.get('.stat.spent .stat-label').should('contain.text', 'Ausgegeben');
  });
});
