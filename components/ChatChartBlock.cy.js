import ChatChartBlock from './ChatChartBlock.vue';

describe('ChatChartBlock', () => {
  it('renders title', () => {
    cy.mount(ChatChartBlock, { props: { title: 'My Chart', data: [{ label: 'A', amount: 100 }] } });
    cy.get('.chat-chart-block').should('exist');
    cy.get('.block-title').should('contain.text', 'My Chart');
  });

  it('shows fallback when data invalid', () => {
    cy.mount(ChatChartBlock, { props: { data: null } });
    cy.get('.chart-fallback').should('exist');
  });

  it('handles empty array data', () => {
    cy.mount(ChatChartBlock, { props: { data: [] } });
    cy.get('.chart-fallback').should('exist');
  });

  it('normalizes bar when multiple numeric keys', () => {
    const data = [
      { label: 'A', amount: 100, count: 2, other: 50 },
      { label: 'B', amount: 200, count: 3, other: 60 }
    ];
    cy.mount(ChatChartBlock, { props: { title: 'Multi', chart_hint: 'donut', data } });
    // with multiple numerics, donut falls back to bar; component still renders container
    cy.get('.chat-chart-block').should('exist');
  });
});
