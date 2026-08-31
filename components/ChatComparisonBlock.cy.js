import ChatComparisonBlock from './ChatComparisonBlock.vue';

const series = [
  { heading: 'Period A', income: 2000, expense: 1500, net: 500 },
  { heading: 'Period B', income: 1800, expense: 1200, net: 600 }
];

describe('ChatComparisonBlock', () => {
  it('renders title and columns', () => {
    cy.mount(ChatComparisonBlock, { props: { title: 'Comparison', series } });
    cy.get('.chat-comparison-block').should('exist');
    cy.get('.block-title').should('contain.text', 'Comparison');
    cy.get('.comparison-col').should('have.length', 2);
    cy.contains('.comparison-col-title', 'Period A').should('exist');
    cy.contains('.comparison-col-title', 'Period B').should('exist');
  });

  it('renders rows per side', () => {
    cy.mount(ChatComparisonBlock, { props: { series } });
    cy.get('.comparison-row').should('exist');
    cy.contains('dt', 'Income').should('exist');
    cy.contains('dd', '2,000').should('exist');
  });

  it('handles missing heading fallback', () => {
    const withoutHeading = [{ income: 100 }, { expense: 200 }];
    cy.mount(ChatComparisonBlock, { props: { series: withoutHeading } });
    cy.contains('.comparison-col-title', 'Series 1').should('exist');
    cy.contains('.comparison-col-title', 'Series 2').should('exist');
  });

  it('formats numbers and nulls', () => {
    const withNull = [{ heading: 'A', value: null, count: 5 }];
    cy.mount(ChatComparisonBlock, { props: { series: withNull } });
    cy.contains('dd', '-').should('exist');
    cy.contains('dd', '5').should('exist');
  });
});
