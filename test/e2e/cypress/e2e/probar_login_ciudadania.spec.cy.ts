export {}

const urlCiudadania = Cypress.env('CIUDADANIA_DIGITAL_URL')
const urlRegistro = Cypress.env('BASE_URL') + 'login'
//ruta del archivo donde se encuentran la lista de usuarios en formato xlsx
const pathUsuarios = Cypress.env('PATH_NOMBRES_PRUEBA')

describe('Registro', () => {
  let usuarios: any[];
  let indiceUsuario = 0

  before('Cargar imagenes', () => {
    cy.task('generateUsers', { pth: pathUsuarios }).then(
      // @ts-ignore
      (users) => (usuarios = users)
    )
  })

  it('Registrar usuario 1', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 2', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 3', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 4', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 5', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 6', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 7', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 8', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 9', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })
  
  it('Registrar usuario 10', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 11', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 12', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 13', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 14', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })
  
  it('Registrar usuario 15', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 16', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 17', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 18', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 19', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })
  
  it('Registrar usuario 20', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 21', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 22', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 23', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 24', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })
  
  it('Registrar usuario 25', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 26', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 27', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 28', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })

  it('Registrar usuario 29', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })
  
  it('Registrar usuario 30', () => {
    const usuarioActual = usuarios[indiceUsuario]
    cy.visit(urlRegistro)
    cy.get('button:contains("Ingresa con Ciudadanía")').click()
    cy.origin(
      urlCiudadania,
      { args: { usuarioActual } },
      ({ usuarioActual }) => {
        cy.get('#username').type(usuarioActual.ci)
        cy.get('#password').type('Agepic135')
        cy.get('button:contains("Continuar")').click()
        cy.get('#code').type('123456')
        cy.get('button:contains("Continuar")').first().click()
      },
    )
    cy.wait(3500)
    cy.get(`p:contains("${usuarioActual.nombre}")`).click()
    cy.get('p:contains("Cerrar sesión")').click()
    cy.get('button:contains("Aceptar")').click()
    cy.wait(3500)
    indiceUsuario += 1
  })
})
