export{}

const urlRegistro = Cypress.env('BASE_URL') + 'login'

describe('Registro', () => {
  const randomWords = require('random-words')
  it('Registro de usuario', () => {
    cy.visit(urlRegistro)
    const correo = `${randomWords()}@yopmail.com`
    const contrasena = 'contrasenaSuperSecreta'
    cy.get('button:contains("Regístrate")').click()
    cy.get('#nombres').type('usuario 1')
    cy.get('#correoElectronico').type(correo)
    cy.get('#newPassword1').type(contrasena)
    cy.get('#newPassword2').type(contrasena)

    cy.get('button:contains("Crear cuenta")').click()
  })
})