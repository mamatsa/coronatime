describe('Dashboard', () => {
  it('User can use full dashboard functionality', () => {
    cy.visit('/');
    cy.get('#username').type('cypress');
    cy.get('#password').type('password');
    cy.get('#loginSubmit').click();
    cy.intercept('POST', Cypress.env('baseApiUrl'), {
      statusCode: 201,
      body: {
        token: Cypress.env('apiToken'),
      },
    }).as('req');
    cy.wait('@req');
    cy.get('#dashboardCountriesNavLink').click();
    cy.get('#sortByLocation').click();
    cy.get('#sortByCases').click();
    cy.get('#sortByCases').click();
    cy.get('#sortByDeaths').click();
    cy.get('#sortByDeaths').click();
    cy.get('#sortByRecovered').click();
    cy.get('#sortByRecovered').click();
    cy.get('#sortByRecovered').click();
    cy.get('#dashboardSearch').type('g');
    cy.get('#languageChanger').select('ქართული');
    cy.get('#dashboardSearch').type('e');
    cy.get('#dashboardWorldwideNavLink').click();
    cy.viewport('iphone-6');
    cy.get('#mobileNavBurger').click();
    cy.get('#mobileNavBackdrop').click();
    cy.get('#mobileNavBurger').click();
    cy.get('#mobileNavLogout').click();
  });
});
