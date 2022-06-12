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

  it('User can see error message if countries request failed', () => {
    cy.visit('/');
    cy.get('#username').type('cypress');
    cy.get('#password').type('password');
    cy.intercept('POST', Cypress.env('baseApiUrl'), {
      statusCode: 201,
      body: {
        token: Cypress.env('apiToken'),
      },
    });
    cy.intercept('GET', Cypress.env('baseApiUrl'), {
      statusCode: 401,
    });
    cy.get('#loginSubmit').click();
    cy.get('#dashboardError').should('be.visible');
    cy.get('#dashboardLogout').click();
  });
});
