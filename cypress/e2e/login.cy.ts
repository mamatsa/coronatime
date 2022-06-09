describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('User should login to view dashboard', () => {
    cy.get('#loginWelcome').should('be.visible');
  });

  it('User can change language', () => {
    cy.get('#languageChanger').select('ქართული');
    cy.get('#loginWelcome').should('have.text', 'კეთილი იყოს თქვენი დაბრუნება');
  });

  it('User can go to registration page', () => {
    cy.get('#loginGoToRegister').click();
    cy.url().should('include', '/register');
  });

  it('User can go to password reset page', () => {
    cy.get('#loginForgotPassword').click();
    cy.url().should('include', '/password');
  });

  it('User can not log in if username is wrong', () => {
    cy.get('#username').type('cypress');
    cy.get('#password').type('password');
    cy.intercept('POST', 'https://coronatime-api.devtest.ge/api/*', {
      statusCode: 422,
    }).as('req');
    cy.get('#loginSubmit').click();
    cy.get('#usernameInputError').should('not.be.empty');
  });

  it('User can not log in if password is wrong', () => {
    cy.get('#username').type('cypress');
    cy.get('#password').type('password');
    cy.intercept('POST', 'https://coronatime-api.devtest.ge/api/*', {
      statusCode: 401,
    }).as('req');
    cy.get('#loginSubmit').click();
    cy.get('#passwordInputError').should('not.be.empty');
  });
});