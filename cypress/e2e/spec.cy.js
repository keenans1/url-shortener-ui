describe('url shortener', () => {

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', { fixture: 'example.json' })

    cy.visit('http://localhost:3000/')
  })

  it('Should show the website title and existing urls', () => {
    cy.get('h1').should('contain', 'URL Shortener')
    cy.get('div[id="1"]').should('contain', 'abcd')
    cy.get('div[id="2"]').should('contain', 'keenan')
  })

})


// When a user visits the page, they can view the page title and the existing shortened URLs

// When a user visits the page, they can view the Form with the proper inputs
// When a user fills out the form, the information is reflected in the input fields