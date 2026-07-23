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

  it('renders the inline SVG icon by default', () => {
    cy.mount(TipsSection, {
      props: { title: 't', text: 's' }
    });
    cy.get('.tips-footer .bulb-image').should('exist');
    cy.get('.tips-footer svg path').should('exist');
  });

  it('allows icon slot override', () => {
    cy.mount(TipsSection, {
      props: { title: 't', text: 's' },
      slots: {
        icon: '<img src="custom-bulb.png" alt="Custom" />'
      }
    });
    cy.get('.tips-footer img').should('have.attr', 'src', 'custom-bulb.png');
    cy.get('.tips-footer svg').should('not.exist');
  });
});
