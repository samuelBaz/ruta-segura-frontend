export {}

const urlCiudadania = Cypress.env('CIUDADANIA_DIGITAL_URL')
const urlRegistro = Cypress.env('BASE_URL') + 'login'
//ruta del archivo donde se encuentran la lista de usuarios en formato xlsx
const pathUsuarios = Cypress.env('PATH_NOMBRES_PRUEBA')

describe('Registro', () => {
  let usuarios: any[];

  before('load images', () => {
    cy.task('generateUsers', { pth: pathUsuarios }).then(
      // @ts-ignore
      (users) => (usuarios = users)
    )
  })

  it('register user', () => {
    const usuarioActual = 0
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarios, usuarioActual } },
      ({ usuarios, usuarioActual }) => {
        cy.get('#username').type(usuarios[usuarioActual].ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
  })
  
})
