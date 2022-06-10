describe('Reset Password', () => {
  it('Wrong email does not proceed', () => {
    cy.visit('/password');
    cy.get('#email').type('cypress@gmail.com');
    cy.get('#requestResetPasswordButton').click();
    cy.get('#emailInputError').should('not.be.empty');
  });

  it('Can continue if email is valid', () => {
    cy.visit('/password');
    cy.get('#email').type('cypress@gmail.com');
    cy.intercept('POST', Cypress.env('apiRecoveryLink'), {
      statusCode: 201,
    });
    cy.get('#requestResetPasswordButton').click();
    cy.url().should('include', '/password/pending');
  });

  it('User can reset password', () => {
    cy.visit('/password/reset');
    cy.get('#password').type('password');
    cy.get('#password2').type('password');
    cy.intercept('POST', Cypress.env('apiRecovery'), {
      statusCode: 201,
    });
    cy.get('#resetPasswordButton').click();
  });
});
