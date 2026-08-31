import ChatProgressBlock from './ChatProgressBlock.vue';

const items = [
  { label: 'Food', current: 400, target: 500, currency: 'USD' },
  { label: 'Rent', current: 900, target: 1000, currency: 'USD' },
  { label: 'Over', current: 1200, target: 1000, currency: 'USD' }
];

describe('ChatProgressBlock', () => {
  it('renders title and progress rows', () => {
    cy.mount(ChatProgressBlock, { props: { title: 'Budgets', items } });
    cy.get('.chat-progress-block').should('exist');
    cy.get('.block-title').should('contain.text', 'Budgets');
    cy.get('.progress-row').should('have.length', 3);
  });

  it('shows label and figures', () => {
    cy.mount(ChatProgressBlock, { props: { items } });
    cy.get('.progress-label').first().should('contain.text', 'Food');
    cy.get('.progress-figures').first().should('contain.text', '400');
    cy.get('.progress-figures').first().should('contain.text', '500');
  });

  it('sets width style and fill class based on ratio', () => {
    const mixed = [
      { label: 'Ok', current: 250, target: 500 },
      { label: 'Over', current: 1200, target: 1000 }
    ];
    cy.mount(ChatProgressBlock, { props: { items: mixed } });
    cy.get('.progress-fill').eq(0).should('have.attr', 'style').and('contain', 'width');
    cy.get('.progress-fill.is-ok').should('exist');
    cy.get('.progress-fill.is-over').should('exist');
  });

  it('renders near when >=0.8', () => {
    cy.mount(ChatProgressBlock, { props: { items: [{ label: 'Near', current: 85, target: 100 }] } });
    cy.get('.progress-fill.is-near').should('exist');
  });
});
