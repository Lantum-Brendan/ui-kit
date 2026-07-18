import TipsSection from './TipsSection.vue';

describe('TipsSection', () => {
  it('renders the title and text from props', () => {
    cy.mount(TipsSection, {
      props: {
        title: 'Tips for adding wallets',
        text: 'Always check everything before submitting a new wallet.'
      }
    });
    cy.get('.tips-title').should('contain.text', 'Tips for adding wallets');
    cy.get('.tips-text').should('contain.text', 'Always check everything');
  });

  it('renders the bulb icon from public assets', () => {
    cy.mount(TipsSection, {
      props: { title: 't', text: 's' }
    });
    cy.get('.bulb-image').should('have.attr', 'src', '/bulbIcon.svg');
  });
});
