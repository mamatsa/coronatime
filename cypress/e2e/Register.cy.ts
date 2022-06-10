describe('Sign up page', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('User can get on registration page', () => {
    cy.get('#registerWelcome').should('be.visible');
  });

  it('User can return to login page', () => {
    cy.get('#registerToLoginLink').click();
    cy.url().should('include', '/login');
  });

  it('Username and password Inputs should be more than 3 char long', () => {
    cy.get('#username').type('cy');
    cy.get('#password').type('cy');
    cy.get('#password2').type('cy');
    cy.get('#usernameInputError').should('have.text', 'Enter min 3 symbols');
    cy.get('#passwordInputError').should('have.text', 'Enter min 3 symbols');
    cy.get('#password2InputError').should('have.text', 'Enter min 3 symbols');
  });

  it('Email format validation works', () => {
    cy.get('#email').type('cypress');
    cy.get('#emailInputError').should('not.be.empty');
  });

  it('Password and repeat password values should match', () => {
    cy.get('#password').type('cypress123');
    cy.get('#password2').type('cypress12');
    cy.get('#password2InputError').should('not.be.empty');
  });

  it('Shows error if username is already taken', () => {
    cy.get('#username').type('oto');
    cy.get('#email').type('cypress@gmail.com');
    cy.get('#password').type('cypress123');
    cy.get('#password2').type('cypress123');
    cy.get('#registerSubmit').click();
    cy.get('#usernameInputError').should(
      'have.text',
      'This username is already taken'
    );
  });

  it('Shows error if email is already taken', () => {
    cy.get('#username').type('cypress');
    cy.get('#email').type('otar@redberry.ge');
    cy.get('#password').type('cypress123');
    cy.get('#password2').type('cypress123');
    cy.get('#registerSubmit').click();
    cy.get('#emailInputError').should(
      'have.text',
      'This email is already taken'
    );
  });

  it('Fields are green if inputs are valid', () => {
    cy.get('#username').type('cypress');
    cy.get('#email').type('otar@redberry.ge');
    cy.get('#password').type('cypress123');
    cy.get('#password2').type('cypress123');
    cy.get('#username').should('have.class', 'border-main-green');
    cy.get('#email').should('have.class', 'border-main-green');
    cy.get('#password').should('have.class', 'border-main-green');
    cy.get('#password2').should('have.class', 'border-main-green');
  });

  it('User can register', () => {
    cy.get('#username').type('e2e test');
    cy.get('#email').type('cypress@gmail.com');
    cy.get('#password').type('cypress123');
    cy.get('#password2').type('cypress123');
    cy.intercept('POST', Cypress.env('baseApiUrl'), {
      statusCode: 201,
    }).as('req');
    cy.get('#registerSubmit').click();
    cy.url().should('include', '/register/confirm');
    cy.visit('/register/confirm/success?hash=1322323');
    cy.get('#confirmButton').click();
    cy.intercept('POST', Cypress.env('baseApiUrl'), {
      statusCode: 201,
    });
  });
});
