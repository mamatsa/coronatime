describe('Email Confirm Page', () => {
  it('User can confirm email', () => {
    cy.visit('/register/confirm/success');
    cy.get('#confirmButton').should('be.visible');
  });

  it('User can see password update success message', () => {
    cy.visit('/password/pending/success');
    cy.get('#confirmationMessage').should('be.visible');
  });
});
