export {}
const urlPaginaLogin = 'http://localhost:8080/login'
const urlPaginaUsuario = 'http://localhost:8080/admin/usuarios'
const urlPaginaParametro = 'http://localhost:8080/admin/parametros'
const urlModulos = 'http://localhost:8080/admin/modulos'
const urlPaginaPolicy = 'http://localhost:8080/admin/politicas'

const tiempoEntreAcciones = 2000
describe('probar usuarios', () => {
  const randomWords = require('random-words')
  let palabraRandom = ''
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

  it('Probar usuario', () => {
    cy.visit(urlPaginaUsuario).then(() => {
      cy.wait(tiempoEntreAcciones)
      cy.log(
        '#############Restableciendo nueva contrasena###########'.toUpperCase()
      )
      cy.get('button[name="Restablecer contraseña"]').eq(0).click()
      cy.get('button:contains("Aceptar")').click()
      cy.wait(tiempoEntreAcciones)
      cy.log('#############Inactivando usuario###########'.toUpperCase())
      cy.get('[name="Inactivar Usuario"]').eq(0).click()
      cy.get('button:contains("Aceptar")').click()
      cy.wait(tiempoEntreAcciones)
      cy.log(
        '#############Restableciendo nueva contrasena despues de inactivar usuario###########'.toUpperCase()
      )
      cy.get('button[name="Restablecer contraseña"]').eq(0).click()
      cy.get('button:contains("Aceptar")').click()
      cy.wait(tiempoEntreAcciones)
      cy.log('#############Editando usuario###########'.toUpperCase())
      cy.get('button[name="Editar usuario"]').eq(0).click()
      cy.get('#nombre').type('Nombre de prueba')
      cy.get('button:contains("Guardar")').click()
      cy.wait(tiempoEntreAcciones)
      cy.log('#############Activando usuario de nuevo###########'.toUpperCase())
      cy.get('[name="Activar Usuario"]').first().click()
      cy.get('button:contains("Aceptar")').click()
      cy.wait(tiempoEntreAcciones)
      cy.get('button[name="Actualizar lista de usuario"]').click()

      cy.wait(tiempoEntreAcciones)
      cy.log(
        '#############Restableciendo nueva contrasena###########'.toUpperCase()
      )
      cy.get('button[name="Restablecer contraseña"]').eq(1).click()
      cy.get('button:contains("Aceptar")').click()
      cy.wait(tiempoEntreAcciones)
      cy.log('#############Inactivando usuario###########'.toUpperCase())
      cy.get('[name="Inactivar Usuario"]').eq(0).click()
      cy.get('button:contains("Aceptar")').click()
      cy.wait(tiempoEntreAcciones)
      cy.log(
        '#############Restableciendo nueva contrasena despues de inactivar usuario###########'.toUpperCase()
      )
      cy.get('button[name="Restablecer contraseña"]').eq(1).click()
      cy.get('button:contains("Aceptar")').click()
      cy.wait(tiempoEntreAcciones)
      cy.log('#############Editando usuario###########'.toUpperCase())
      cy.get('button[name="Editar usuario"]').eq(1).click()
      cy.get('#nombre').type('Nombre de prueba')
      cy.get('button:contains("Guardar")').click()
      cy.get('body').type('{esc}')
      cy.wait(tiempoEntreAcciones)
      cy.get('button[name="Actualizar lista de usuario"]').click()

      cy.wait(tiempoEntreAcciones)
      // })
    })
  })

  it('adicionar parametros', () => {
    cy.visit(urlPaginaParametro).then(() => {
      cy.get('[name="Agregar parámetro"]').click()

      palabraRandom = randomWords()
      cy.get('#codigo').type(palabraRandom)
      cy.get('#nombre').type(randomWords())
      cy.get('#grupo').type(randomWords())
      cy.get('#descripcion').type(randomWords())

      cy.get('button:contains("Guardar")').click()
      cy.wait(1500)
    })
  })

  it('Probar parametro', () => {
    cy.visit(urlPaginaParametro).then(() => {
      cy.get('button:contains("search")').click()
      cy.get('#parametro').type(palabraRandom)
      cy.wait(2000)
      cy.get('[name="Parámetros"]').first().click()
      cy.get('#nombre').clear().type(randomWords())
      const search = randomWords()
      cy.get('#codigo').clear().type(search)
      cy.get('#grupo').clear().type(randomWords())
      cy.get('#descripcion').clear().type(randomWords())
      cy.get('button:contains("Guardar")').click()
      cy.get('#parametro').clear().type(search)
      cy.get('body').type('{enter}')
      cy.wait(3000)
      // })
    })
  })

  it('crear modulo de prueba', () => {
    const secciones = []
    cy.visit(urlModulos)
    for (let i = 1; i < 1 + 1; i++) {
      const seccion = randomWords()
      cy.get('span:contains("add_circle_outline")').click()
      cy.get('p:contains("Nueva sección")').click()
      cy.get('#nombre').type(seccion)
      secciones.push(seccion)
      cy.get('#label').type(seccion)
      cy.get('#descripcion').type('descripcion ' + randomWords())
      cy.get('#url').type('/admin/' + randomWords())
      cy.get('button:contains("Guardar")').click()
    }

    for (const seccion of secciones) {
      palabraRandom = 'nombre ' + seccion
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
    cy.wait(2000)
  })

  it('Probar modulo', () => {
    cy.visit(urlModulos)
    let variableRandom = randomWords()
    cy.get('button:contains("search")').click()
    cy.get('#buscar').type(palabraRandom).type('{enter}')
    cy.wait(2500)
    cy.get('[name="Editar módulo"]').first().click()
    cy.get('#nombre').clear().type(variableRandom)
    cy.get('#descripcion').clear().type(variableRandom)
    cy.get('button:contains("Guardar")').click()
    cy.get('#buscar').clear().type(variableRandom).type('{enter}')
    cy.wait(2000)

    cy.get('[name="Inactivar Módulo"]').first().click()
    cy.get('button:contains("Aceptar")').click()

    variableRandom = randomWords()
    cy.get('[name="Editar módulo"]').first().click()
    cy.get('#nombre').clear().type(variableRandom)
    cy.get('#descripcion').clear().type(variableRandom)
    cy.get('button:contains("Guardar")').click()
    cy.get('#buscar').clear().type(variableRandom).type('{enter}')

    cy.get('[name="Activar Módulo"]').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(2000)
  })

  it('crear politica de prueba', () => {
    palabraRandom = randomWords()
    cy.visit(urlPaginaPolicy)
    cy.get('[name="Agregar política"]').click()
    cy.get('#sujeto').click()
    cy.get(`li:contains("ADMINISTRADOR")`).click()
    cy.get('#app').click()
    cy.get(`li:contains("frontend")`).click()
    cy.get('#accion').click()
    cy.get(`li:contains("create")`).click()
    cy.get('body').type('{esc}')
    cy.get('#objeto').type('/admin/' + palabraRandom)
    cy.get('button:contains("Guardar")').click()
    cy.wait(2000)
  })

  it('probar politica', () => {
    const aux = randomWords()
    cy.visit(urlPaginaPolicy)
    cy.get('button:contains("search")').click()
    cy.get('#buscar').type(palabraRandom).type('{enter}')
    cy.wait(2000)

    cy.get('button:contains("edit")').click()
    cy.get('#sujeto').click()
    cy.get('li:contains("TECNICO")').click()
    cy.get('#objeto')
      .clear()
      .type('/admin/' + aux)
    cy.get('#app').click()
    cy.get('li:contains("backend")').click()
    cy.get('#accion').click()
    cy.get('li:contains("GET")').click()
    cy.get('li:contains("POST")').click()
    cy.get('body').type('{esc}')
    cy.get('button:contains("Guardar")').click()
    cy.get('#buscar').clear().type(aux).type('{enter}')
    cy.wait(2000)

    cy.get('button:contains("delete_outline")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.get('#buscar').clear().type(aux).type('{enter}')
    cy.wait(2000)
  })

  it('logout', () => {
    cy.visit(urlPaginaUsuario)
    cy.get('[aria-label="account of current user"]').click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(2000)
  })
})
