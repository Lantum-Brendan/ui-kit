import AuthCarousel from './AuthCarousel.vue';
import { h } from 'vue';

const MockIcon = { name: 'MockIcon', render: () => h('svg', { class: 'mock-icon' }) };

const slides = [
  { title: 'Track money', text: 'Track every account', icon: MockIcon },
  { title: 'Insights', text: 'Get insights', icon: MockIcon },
  { title: 'Budget', text: 'Stay on budget', image: 'https://example.com/art.png' }
];

describe('AuthCarousel', () => {
  it('renders first slide title and text', () => {
    cy.mount(AuthCarousel, { props: { slides } });
    cy.get('.login-sidebar').should('exist');
    cy.get('.text-content h2').should('contain.text', 'Track money');
    cy.get('.text-content p').should('contain.text', 'Track every account');
  });

  it('renders dots equal to slides count', () => {
    cy.mount(AuthCarousel, { props: { slides } });
    cy.get('.carousel-dots .dot').should('have.length', 3);
    cy.get('.carousel-dots .dot.active').should('exist');
  });

  it('switches slide on dot click', () => {
    cy.mount(AuthCarousel, { props: { slides } });
    cy.get('.text-content h2').should('contain.text', 'Track money');
    cy.get('.carousel-dots .dot').eq(1).click();
    cy.get('.text-content h2').should('contain.text', 'Insights');
  });

  it('renders art image when slide has image', () => {
    cy.mount(AuthCarousel, { props: { slides } });
    cy.get('.carousel-dots .dot').eq(2).click();
    cy.get('.slide-art').should('have.attr', 'src', 'https://example.com/art.png');
  });
});
