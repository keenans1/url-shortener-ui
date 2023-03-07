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

})