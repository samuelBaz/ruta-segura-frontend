export {}
const urlPaginaPolicy = 'http://localhost:8080/admin/politicas'
const urlPaginaLogin = 'http://localhost:8080/login'
const sujetos = ['ADMINISTRADOR', 'TECNICO', 'USUARIO']
const objetos = ['/admin/', '/api/']
const apps = ['frontend', 'backend']
const acciones_frontend = ['create', 'read', 'update', 'delete']
const acciones_backend = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

describe('empty spec', () => {
  var randomWords = require('random-words')
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

  it('add policy frontend', () => {
    cy.visit(urlPaginaPolicy)
    for (let i = 0; i < sujetos.length; i++) {
      for (let j = 0; j < acciones_frontend.length; j++) {
        cy.get('[name="Agregar política"]').click()
        cy.get('#sujeto').click()
        cy.get(`li:contains(${sujetos[i]})`).click()
        cy.get('#app').click()
        cy.get(`li:contains(${apps[0]})`).click()
        cy.get('#accion').click()
        cy.get(`li:contains("${acciones_frontend[j]}")`).click()
        cy.get('body').type('{esc}')
        cy.get('#objeto').type(
          objetos[Math.floor(Math.random())] + randomWords()
        )
        cy.get('button:contains("Guardar")').click()
      }
    }
  })

  it('add policy backend', () => {
    cy.visit(urlPaginaPolicy)
    for (let i = 0; i < sujetos.length; i++) {
      for (let j = 0; j < acciones_backend.length; j++) {
        cy.get('[name="Agregar política"]').click()
        cy.get('#sujeto').click()
        cy.get(`li:contains(${sujetos[i]})`).click()
        cy.get('#app').click()
        cy.get(`li:contains(${apps[1]})`).click()
        cy.get('#accion').click()
        cy.get(`li:contains("${acciones_backend[j]}")`).click()
        cy.get('body').type('{esc}')
        cy.get('#objeto').type(
          objetos[Math.floor(Math.random())] + randomWords()
        )
        cy.get('button:contains("Guardar")').click()
      }
    }
  })
})
