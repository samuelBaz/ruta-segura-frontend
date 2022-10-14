export {}

const urlPaginaLogin = Cypress.env('BASE_URL') + 'login'

describe('Visitar la pagina login', () => {
  beforeEach('VIsit the page', () => {
    //https://proyecto-base.test.gtic.gob.bo/
    cy.visit(urlPaginaLogin)
  })

  it('Clickeando los botones superiores', () => {
    //Open the Informacion dialog and then close it.
    cy.get(`[name="Ayuda"]`).contains('help_outline').click()
    cy.get('h2')
      .should('have.class', 'MuiTypography-root')
      .contains('Información')
    cy.get(`[aria-label="close"]`).click()

    //Clcik the dark mode button
    cy.get(`[aria-label="Cambiar a modo oscuro"]`).click()
    // cy.get('body').should('have.css', 'background-color', hexToRgb(darkTheme.palette.background.default));
    cy.get(`[aria-label="Cambiar a modo claro"]`).click()
    // cy.get('body').should('have.css', 'background-color', hexToRgb(lightTheme.palette.background.default));
  })

  it('Campos de login vacios', () => {
    cy.get('#usuario').clear()
    cy.get('#contrasena').clear()
    cy.get('#usuario').should('have.class', 'MuiInputBase-input')
    cy.contains('Iniciar sesión').click()

    cy.get('p:contains("Este campo es requerido")').should('have.length', 2)

    cy.get('#usuario').type('Usuario-Inexistente')

    cy.get('p:contains("Este campo es requerido")').should('have.length', 1)

    cy.get('#usuario').clear()
    cy.get('#contrasena').type('PasswordSuperLargoParaPrueba')
    cy.get('p:contains("Este campo es requerido")').should('have.length', 1)
  })

  it('Campos de login vacios', () => {
    cy.get('#usuario').clear().type('Prueba')
    cy.get('#contrasena').clear().type('Password123')
    cy.get('#usuario').should('have.class', 'MuiInputBase-input')
    cy.contains('Iniciar sesión').click()

    cy.get('#notistack-snackbar')
    cy.get(`[aria-label="Close"]`).click()
  })

  it('Visibilidad de password', () => {
    cy.get('#contrasena').should('have.attr', 'type', 'password')

    cy.get('[aria-label="toggle password visibility"]').eq(2).click()
    cy.get('#contrasena').should('have.attr', 'type', 'text')

    cy.get('[aria-label="toggle password visibility"]').eq(2).click()
    cy.get('#contrasena').should('have.attr', 'type', 'password')
  })

  it('Login correcto', () => {
    cy.get('#usuario').clear().type('ADMINISTRADOR-TECNICO')
    cy.get('#contrasena').clear().type('123')
    cy.contains('Iniciar sesión').click()
    cy.url().should('include', '/admin/home')
  })
})
