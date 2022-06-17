const countries = [
  {
    name: {
      en: 'Afghanistan',
      ka: 'ავღანეთი',
    },
    statistics: {
      confirmed: 3401,
      recovered: 2523,
      critical: 1598,
      deaths: 1474,
    },
    _id: '628360785af42d12eef05c44',
    code: 'AF',
  },
  {
    name: {
      en: 'Albania',
      ka: 'ალბანეთი',
    },
    statistics: {
      confirmed: 2087,
      recovered: 3348,
      critical: 4263,
      deaths: 3776,
    },
    _id: '628360785af42d12eef05c45',
    code: 'AL',
  },
];

describe('Dashboard', () => {
  it('User can use full dashboard functionality', () => {
    cy.visit('/');
    cy.get('#username').type('cypress');
    cy.get('#password').type('password');
    cy.get('#loginSubmit').click();
    cy.intercept('POST', `${Cypress.env('baseApiUrl')}login`, {
      statusCode: 201,
      body: {
        token: 123,
      },
    }).as('req');
    cy.wait('@req');
    cy.intercept('GET', `${Cypress.env('baseApiUrl')}countries`, {
      statusCode: 201,
      body: countries,
    });
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
    cy.get('#languageChanger').click();
    cy.contains('ქართული').click();
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
    cy.intercept('POST', `${Cypress.env('baseApiUrl')}login`, {
      statusCode: 201,
      body: {
        token: 123,
      },
    });
    cy.intercept('GET', `${Cypress.env('baseApiUrl')}countries`, {
      statusCode: 401,
    });
    cy.get('#loginSubmit').click();
    cy.get('#dashboardError').should('be.visible');
    cy.get('#dashboardLogout').click();
  });
});
