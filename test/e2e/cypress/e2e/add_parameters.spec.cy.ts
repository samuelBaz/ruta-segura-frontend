export {}
const urlPaginaHome = 'localhost:8080/admin/home'
const urlPaginaLogin = 'localhost:8080'
const cantidadDeParametros = 3000
const nombreParametro = 1

describe('empty spec', () => {
  beforeEach('login', () => {
    //https://proyecto-base.test.gtic.gob.bo/

    cy.session('ADMINISTRADOR-TECNICO', () => {
      cy.visit(urlPaginaLogin)
      cy.get('#usuario').clear().type('ADMINISTRADOR-TECNICO')
      cy.get('#contrasena').clear().type('123')
      cy.contains('Iniciar sesión').click()
      cy.wait(3000)
    })
  })

  it('Adding users from ods file', async () => {
    cy.visit(urlPaginaHome)
    cy.url().should('include', '/admin/home')
    cy.wait(3000)
    cy.get('button:contains(Parámetros)').click()
    cy.url().should('include', '/admin/parametros')

    for (let i = 1; i < cantidadDeParametros; i++) {
      cy.get('[name="Agregar parámetro"]').click()

      cy.get('#codigo').type('parametro' + nombreParametro)
      cy.get('#nombre').type('parametro' + nombreParametro)
      cy.get('#grupo').type('parametro' + nombreParametro)
      cy.get('#descripcion').type('parametro' + nombreParametro)

      cy.get('button:contains("Guardar")').click()
    }
  })
})
