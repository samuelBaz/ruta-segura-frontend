export {}
const urlPaginaLogin = Cypress.env('BASE_URL') + 'login'
const urlPaginaUsuarios = Cypress.env('BASE_URL') + 'admin/usuarios'
//Ruta del archivo con nombres de prueba
const rutaDatosUsuarios = Cypress.env('PATH_DATOS_FAKE_SEGIP')
let datos: any[] = []

describe('Agregar usuarios ', () => {
  before('Load users', () => {
    cy.task('createUsersFromODS', { pth: rutaDatosUsuarios }).then(
      // @ts-ignore
      (usuarios) => (datos = usuarios)
    )
  })

  beforeEach('Login', () => {
    cy.session('ADMINISTRADOR-TECNICO', () => {
      cy.visit(urlPaginaLogin)
      cy.get('#usuario').clear().type('ADMINISTRADOR-TECNICO')
      cy.get('#contrasena').clear().type('123')
      cy.contains('Iniciar sesión').click()
      cy.wait(3000)
    })
  })

  it('Agregar usuario desde archivo ods 1', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 0; i < 10; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 2', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 10; i < 20; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 3', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 20; i < 30; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 4', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 30; i < 40; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 5', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 40; i < 50; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 6', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 50; i < 60; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 7', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 60; i < 70; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 8', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 70; i < 80; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 9', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 80; i < 90; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 10', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 90; i < 100; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 11', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 100; i < 110; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 12', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 110; i < 120; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 13', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 120; i < 130; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 14', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 130; i < 140; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 15', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 140; i < 150; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 16', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 150; i < 160; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 17', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 160; i < 170; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 18', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 170; i < 180; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 19', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 180; i < 190; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 20', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 190; i < 200; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 21', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 200; i < 210; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 22', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 210; i < 220; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 23', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 220; i < 230; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 24', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 230; i < 240; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 25', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 240; i < 250; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 26', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 250; i < 260; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 27', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 260; i < 270; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 28', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 270; i < 280; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 29', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 280; i < 290; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 30', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 290; i < 300; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 31', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 300; i < 310; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 32', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 310; i < 320; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 33', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 320; i < 330; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 34', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 330; i < 340; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 35', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 340; i < 350; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 36', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 350; i < 360; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 37', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 360; i < 370; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 38', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 370; i < 380; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 39', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 380; i < 390; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 40', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 390; i < 400; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 41', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 400; i < 410; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 42', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 410; i < 420; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 43', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 420; i < 430; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 44', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 430; i < 440; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 45', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 440; i < 450; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 46', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 450; i < 460; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 47', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 460; i < 470; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 48', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 470; i < 480; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 49', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 480; i < 490; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 50', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 490; i < 500; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 51', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 500; i < 510; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 52', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 510; i < 520; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 53', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 520; i < 530; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 54', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 530; i < 540; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 55', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 540; i < 550; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 56', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 550; i < 560; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 57', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 560; i < 570; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 58', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 570; i < 580; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 59', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 580; i < 590; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 60', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 590; i < 600; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 61', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 600; i < 610; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 62', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 610; i < 620; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 63', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 620; i < 630; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 64', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 630; i < 640; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 65', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 640; i < 650; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 66', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 650; i < 660; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 67', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 660; i < 670; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 68', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 670; i < 680; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 69', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 680; i < 690; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 70', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 690; i < 700; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 71', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 700; i < 710; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 72', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 710; i < 720; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 73', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 720; i < 730; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 74', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 730; i < 740; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 75', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 740; i < 750; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 76', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 750; i < 760; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 77', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 760; i < 770; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 78', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 770; i < 780; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 79', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 780; i < 790; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 80', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 790; i < 800; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 81', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 800; i < 810; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 82', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 810; i < 820; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 83', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 820; i < 830; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 84', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 830; i < 840; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 85', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 840; i < 850; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 86', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 850; i < 860; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 87', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 860; i < 870; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 88', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 870; i < 880; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 89', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 880; i < 890; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 90', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 890; i < 900; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 91', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 900; i < 910; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 92', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 910; i < 920; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 93', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 920; i < 930; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 94', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 930; i < 940; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 95', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 940; i < 950; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 96', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 950; i < 960; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 97', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 960; i < 970; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 98', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 970; i < 980; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 99', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 980; i < 990; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })

  it('Agregar usuario desde archivo ods 100', () => {
    cy.visit(urlPaginaUsuarios)
    cy.wait(3000)
    for (let i = 990; i < 1000; i++) {
      cy.get('button').contains('Agregar').click()

      cy.get('#roles').click()
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click()
      cy.get('li').contains('Técnico').click()
      cy.get('li').contains('Usuario').click()
      cy.get('body').type('{esc}')

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento)
      cy.get('#nombre').clear().type(datos[i].Nombres)
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido)
      if (datos[i].SegundoApellido !== '') {
        cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido)
      }
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento)

      cy.get('#correoElectronico')
        .clear()
        .type('agepic-' + datos[i].NumeroDocumento + '@yopmail.com')
      cy.get('button').contains('Guardar').click()

      cy.get(`[aria-label="Close"]`).click()
      cy.get('body').type('{esc}')

      //cy.wait(1000);
    }
  })
})
