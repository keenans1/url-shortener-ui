describe('url shortener', () => {

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', { fixture: 'receivedinfo.json' })
    cy.visit('http://localhost:3000/')
  })

  it('Should show the website title and existing urls', () => {
    cy.get('h1').should('contain', 'URL Shortener')
    cy.get('div[id="1"]').should('contain', 'http://localhost:3001/useshorturl/1')
    cy.get('div[id="2"]').should('contain', 'http://localhost:3001/useshorturl/2')
  })

  it('Should fill out the form and the corresponding inputs should be visible in the dom', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', { fixture: 'createdinfo.json' })
    cy.get('form').within(() => {
      cy.get('input[name="title"]').type('abraham')
      cy.get('input[name="urlToShorten"]').type('lincoln')
      cy.get('button').click()
    })
    cy.get('div[id="3"]').should('contain', 'http://localhost:3001/useshorturl/3')
  })

  it('Should display an error message when server is down', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', { forceNetworkError: true })
    cy.visit('http://localhost:3000/')
    cy.get('h2').should('contain', 'Failed to fetch. Issue with server. Please try again')
  })

  it('Should not allow a user to submit without entering data in both inputs', () => {
    cy.get('section').children().should('have.length', 2)
    cy.get('button').click()
    cy.get('section').children().should('have.length', 2)
  })

})