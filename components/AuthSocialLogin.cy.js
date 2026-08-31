import AuthSocialLogin from './AuthSocialLogin.vue';

describe('AuthSocialLogin', () => {
  it('renders sign in label in login mode', () => {
    cy.mount(AuthSocialLogin, { props: { mode: 'login' } });
    cy.get('.btn-google').should('exist');
    cy.contains('Sign in with Google').should('exist');
  });

  it('renders sign up label in signup mode', () => {
    cy.mount(AuthSocialLogin, { props: { mode: 'signup' } });
    cy.contains('Sign up with Google').should('exist');
  });

  it('renders custom labels when provided', () => {
    cy.mount(AuthSocialLogin, {
      props: {
        mode: 'login',
        labels: { signInWithGoogle: 'Continue with Google', signUpWithGoogle: 'Join with Google' }
      }
    });
    cy.contains('Continue with Google').should('exist');
  });

  it('emits google-login when clicked', () => {
    const onGoogleLogin = cy.stub().as('googleLogin');
    cy.mount(AuthSocialLogin, { props: { mode: 'login' }, attrs: { onGoogleLogin } });
    cy.get('.btn-google').click();
    cy.get('@googleLogin').should('have.been.calledOnce');
  });
});
