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
    cy.intercept(
      'POST',
      'https://coronatime-api.devtest.ge/api/password/send-recovery-link',
      {
        statusCode: 201,
      }
    );
    cy.get('#requestResetPasswordButton').click();
    cy.url().should('include', '/password/pending');
  });

  it('Handles error', () => {
    cy.visit('/password/reset');
    cy.get('#password').type('password');
    cy.get('#password2').type('password');
    cy.get('#resetPasswordButton').click();
    cy.intercept(
      'POST',
      'https://coronatime-api.devtest.ge/api/password/recover',
      {
        statusCode: 401,
      }
    );
  });

  it('User can reset password', () => {
    cy.visit('/password/reset');
    cy.get('#password').type('password');
    cy.get('#password2').type('password');
    cy.intercept(
      'POST',
      'https://coronatime-api.devtest.ge/api/password/recover',
      {
        statusCode: 201,
      }
    );
    cy.get('#resetPasswordButton').click();
  });
});
