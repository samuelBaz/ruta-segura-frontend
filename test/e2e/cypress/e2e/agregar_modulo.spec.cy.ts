export {}
const urlPaginaLogin = Cypress.env('BASE_URL') + 'login'
const urlPaginaModulos = Cypress.env('BASE_URL') + 'admin/modulos'
const cantidadSecciones = 2
let numeroNombre = 5

describe('Modulos ', () => {
  const randomWords = require('random-words')
  before('Login', () => {

    cy.session('ADMINISTRADOR-TECNICO', () => {
      cy.visit(urlPaginaLogin)
      cy.get('#usuario').clear().type('ADMINISTRADOR-TECNICO')
      cy.get('#contrasena').clear().type('123')
      cy.contains('Iniciar sesión').click()
      cy.wait(3000)
    })
  })

  it('Agregar modulo', () => {
    const secciones = []
    cy.visit(urlPaginaModulos)
    for (let i = 1; i < cantidadSecciones + 1; i++) {
      const seccion = 'Prueba ' + numeroNombre
      cy.get('span:contains("add_circle_outline")').click()
      cy.get('p:contains("Nueva sección")').click()
      cy.get('#nombre').type(seccion)
      secciones.push(seccion)
      cy.get('#label').type(seccion)
      cy.get('#descripcion').type('descripcion ' + seccion)
      cy.get('#url').type('/admin/' + seccion)
      cy.get('button:contains("Guardar")').click()
      numeroNombre += 1
    }

    for (const seccion of secciones) {
      cy.get('span:contains("add_circle_outline")').click()
      cy.get('p:contains("Nuevo módulo")').click()
      cy.get('#fidModulo').click()
      cy.get(`li:contains("${seccion}")`).eq(0).click()
      cy.get('#icono').type('home')
      cy.get('#nombre').type('nombre ' + seccion)
      cy.get('#label').type('label ' + seccion)
      cy.get('#descripcion').type('descripcion de ' + seccion)
      cy.get('#url').type('/admin/' + randomWords())
      cy.get('button:contains("Guardar")').click()
    }
  })
})
