describe('login into app',() => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5173/sign-in')
    })

    it('Unsuccessful login', () => {
        cy.get('#email').type('admi@example.com')
        cy.get('#password').type('test123')
        cy.get('button').should('have.class', 'MuiButtonBase-root')
        .click()
        .get('div').should('have.class', 'Toastify__toast-icon')
      })

    it('Successful login', () => {
        cy.get('#email').type('admin@example.com')
        cy.get('#password').type('test1234')
        cy.get('button').should('have.class', 'MuiButtonBase-root').click()
      })
})