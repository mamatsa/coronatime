describe('Email Confirm Page', () => {
  it('User can confirm email', () => {
    cy.visit('/register/confirm/success');
    cy.get('#confirmButton').should('be.visible');
  });
});
