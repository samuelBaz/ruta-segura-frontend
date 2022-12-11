export {}
const urlPaginaHome = Cypress.env('BASE_URL') + 'admin/home'
const urlPaginaLogin = Cypress.env('BASE_URL') + 'login'
const cantidadDeParametros = 3000
let nombreParametro = 1

describe('Parametro', () => {
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

  it('Agregar parametro', async () => {
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

      nombreParametro += 1
      cy.get('button:contains("Guardar")').click()
    }
  })
})
