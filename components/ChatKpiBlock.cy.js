import ChatKpiBlock from './ChatKpiBlock.vue';

const items = [
  { label: 'Revenue', value: 12345, currency: 'USD', delta_percent: 5.5 },
  { label: 'Expenses', value: 8000, currency: 'USD', delta_percent: -2.3 },
  { label: 'Flat', value: '42', delta_percent: 0 }
];

describe('ChatKpiBlock', () => {
  it('renders title and kpi cards', () => {
    cy.mount(ChatKpiBlock, { props: { title: 'KPIs', items } });
    cy.get('.chat-kpi-block').should('exist');
    cy.get('.block-title').should('contain.text', 'KPIs');
    cy.get('.kpi-card').should('have.length', 3);
  });

  it('formats value with currency', () => {
    cy.mount(ChatKpiBlock, { props: { items } });
    cy.get('.kpi-value').first().should('contain.text', 'USD');
  });

  it('shows delta with correct trend classes', () => {
    cy.mount(ChatKpiBlock, { props: { items } });
    cy.get('.kpi-delta').should('have.length', 3);
    cy.get('.kpi-delta.is-up').should('exist');
    cy.get('.kpi-delta.is-down').should('exist');
    cy.get('.kpi-delta.is-flat').should('exist');
  });

  it('renders empty when no items', () => {
    cy.mount(ChatKpiBlock, { props: { items: [] } });
    cy.get('.kpi-card').should('have.length', 0);
  });
});
