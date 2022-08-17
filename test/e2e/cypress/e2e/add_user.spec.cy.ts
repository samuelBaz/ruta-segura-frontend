
export{}
const urlPaginaLogin = 'localhost:8080'
const urlPaginaUsuarios = 'localhost:8080/admin/usuarios' 

describe('Add users ', () => {


  const datos = require('../fixtures/DatosCorrectos.json');
  beforeEach('Enter the page usuarios', () => {
    //https://proyecto-base.test.gtic.gob.bo/

    cy.session('ADMINISTRADOR-TECNICO',() => {
      cy.visit(urlPaginaLogin);
      cy.get('#usuario').clear().type("ADMINISTRADOR-TECNICO");
      cy.get('#contrasena').clear().type('123');
      cy.contains('Ingresar').click();
      cy.wait(3000)
    });
  })

  //this commented part does not works because is too long to finish

  /*it('Adding users from ods file', () => {
    
    cy.visit(urlPaginaUsuarios);
    cy.wait(3000)

    for(var i = 0; i < datos.length; i++){
      
    
      cy.get('button').contains('Agregar').click();
      
      cy.get('#roles').click();
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click();
      cy.get('li').contains('Técnico').click();
      cy.get('li').contains('Usuario').click();
      cy.get('body').type('{esc}');

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento);
      cy.get('#nombre').clear().type(datos[i].Nombres);
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido);
      cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido);
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento);

      
      
      cy.get('#correoElectronico').clear().type('agepic-'+datos[i].NumeroDocumento+'@yopmail.com');
      cy.get('button').contains('Guardar').click();

      cy.get(`[aria-label="Close"]`).click();
      cy.get('body').type('{esc}')

      
      //cy.wait(1000);
    }
  expect(2).to.be.equal(2);
  });*/


  //these test are the same as above, the difference is it was separated in multiples test with 20 iteration each test.
  //It does not run all the DatosCoreectos.json file, only the 220 at top


  it('Adding users from ods file 0', () => {
    
    cy.visit(urlPaginaUsuarios);
    cy.wait(3000)

    for(var i = 0; i < 20; i++){
      
    
      cy.get('button').contains('Agregar').click();
      
      cy.get('#roles').click();
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click();
      cy.get('li').contains('Técnico').click();
      cy.get('li').contains('Usuario').click();
      cy.get('body').type('{esc}');

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento);
      cy.get('#nombre').clear().type(datos[i].Nombres);
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido);
      cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido);
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento);

      
      
      cy.get('#correoElectronico').clear().type('agepic-'+datos[i].NumeroDocumento+'@yopmail.com');
      cy.get('button').contains('Guardar').click();

      cy.get(`[aria-label="Close"]`).click();
      cy.get('body').type('{esc}')

      
      //cy.wait(1000);
    }
  expect(2).to.be.equal(2);
  });
it('Adding users from ods file 1', () => {
    
    cy.visit(urlPaginaUsuarios);
    cy.wait(3000)

    for(var i = 20; i < 40; i++){
      
    
      cy.get('button').contains('Agregar').click();
      
      cy.get('#roles').click();
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click();
      cy.get('li').contains('Técnico').click();
      cy.get('li').contains('Usuario').click();
      cy.get('body').type('{esc}');

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento);
      cy.get('#nombre').clear().type(datos[i].Nombres);
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido);
      cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido);
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento);

      
      
      cy.get('#correoElectronico').clear().type('agepic-'+datos[i].NumeroDocumento+'@yopmail.com');
      cy.get('button').contains('Guardar').click();

      cy.get(`[aria-label="Close"]`).click();
      cy.get('body').type('{esc}')

      
      //cy.wait(1000);
    }
  expect(2).to.be.equal(2);
  });
it('Adding users from ods file 2', () => {
    
    cy.visit(urlPaginaUsuarios);
    cy.wait(3000)

    for(var i = 40; i < 60; i++){
      
    
      cy.get('button').contains('Agregar').click();
      
      cy.get('#roles').click();
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click();
      cy.get('li').contains('Técnico').click();
      cy.get('li').contains('Usuario').click();
      cy.get('body').type('{esc}');

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento);
      cy.get('#nombre').clear().type(datos[i].Nombres);
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido);
      cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido);
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento);

      
      
      cy.get('#correoElectronico').clear().type('agepic-'+datos[i].NumeroDocumento+'@yopmail.com');
      cy.get('button').contains('Guardar').click();

      cy.get(`[aria-label="Close"]`).click();
      cy.get('body').type('{esc}')

      
      //cy.wait(1000);
    }
  expect(2).to.be.equal(2);
  });
it('Adding users from ods file 3', () => {
    
    cy.visit(urlPaginaUsuarios);
    cy.wait(3000)

    for(var i = 60; i < 80; i++){
      
    
      cy.get('button').contains('Agregar').click();
      
      cy.get('#roles').click();
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click();
      cy.get('li').contains('Técnico').click();
      cy.get('li').contains('Usuario').click();
      cy.get('body').type('{esc}');

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento);
      cy.get('#nombre').clear().type(datos[i].Nombres);
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido);
      cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido);
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento);

      
      
      cy.get('#correoElectronico').clear().type('agepic-'+datos[i].NumeroDocumento+'@yopmail.com');
      cy.get('button').contains('Guardar').click();

      cy.get(`[aria-label="Close"]`).click();
      cy.get('body').type('{esc}')

      
      //cy.wait(1000);
    }
  expect(2).to.be.equal(2);
  });
it('Adding users from ods file 4', () => {
    
    cy.visit(urlPaginaUsuarios);
    cy.wait(3000)

    for(var i = 80; i < 100; i++){
      
    
      cy.get('button').contains('Agregar').click();
      
      cy.get('#roles').click();
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click();
      cy.get('li').contains('Técnico').click();
      cy.get('li').contains('Usuario').click();
      cy.get('body').type('{esc}');

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento);
      cy.get('#nombre').clear().type(datos[i].Nombres);
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido);
      cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido);
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento);

      
      
      cy.get('#correoElectronico').clear().type('agepic-'+datos[i].NumeroDocumento+'@yopmail.com');
      cy.get('button').contains('Guardar').click();

      cy.get(`[aria-label="Close"]`).click();
      cy.get('body').type('{esc}')

      
      //cy.wait(1000);
    }
  expect(2).to.be.equal(2);
  });
it('Adding users from ods file 5', () => {
    
    cy.visit(urlPaginaUsuarios);
    cy.wait(3000)

    for(var i = 100; i < 120; i++){
      
    
      cy.get('button').contains('Agregar').click();
      
      cy.get('#roles').click();
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click();
      cy.get('li').contains('Técnico').click();
      cy.get('li').contains('Usuario').click();
      cy.get('body').type('{esc}');

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento);
      cy.get('#nombre').clear().type(datos[i].Nombres);
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido);
      cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido);
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento);

      
      
      cy.get('#correoElectronico').clear().type('agepic-'+datos[i].NumeroDocumento+'@yopmail.com');
      cy.get('button').contains('Guardar').click();

      cy.get(`[aria-label="Close"]`).click();
      cy.get('body').type('{esc}')

      
      //cy.wait(1000);
    }
  expect(2).to.be.equal(2);
  });
it('Adding users from ods file 6', () => {
    
    cy.visit(urlPaginaUsuarios);
    cy.wait(3000)

    for(var i = 120; i < 140; i++){
      
    
      cy.get('button').contains('Agregar').click();
      
      cy.get('#roles').click();
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click();
      cy.get('li').contains('Técnico').click();
      cy.get('li').contains('Usuario').click();
      cy.get('body').type('{esc}');

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento);
      cy.get('#nombre').clear().type(datos[i].Nombres);
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido);
      cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido);
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento);

      
      
      cy.get('#correoElectronico').clear().type('agepic-'+datos[i].NumeroDocumento+'@yopmail.com');
      cy.get('button').contains('Guardar').click();

      cy.get(`[aria-label="Close"]`).click();
      cy.get('body').type('{esc}')

      
      //cy.wait(1000);
    }
  expect(2).to.be.equal(2);
  });
it('Adding users from ods file 7', () => {
    
    cy.visit(urlPaginaUsuarios);
    cy.wait(3000)

    for(var i = 140; i < 160; i++){
      
    
      cy.get('button').contains('Agregar').click();
      
      cy.get('#roles').click();
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click();
      cy.get('li').contains('Técnico').click();
      cy.get('li').contains('Usuario').click();
      cy.get('body').type('{esc}');

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento);
      cy.get('#nombre').clear().type(datos[i].Nombres);
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido);
      cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido);
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento);

      
      
      cy.get('#correoElectronico').clear().type('agepic-'+datos[i].NumeroDocumento+'@yopmail.com');
      cy.get('button').contains('Guardar').click();

      cy.get(`[aria-label="Close"]`).click();
      cy.get('body').type('{esc}')

      
      //cy.wait(1000);
    }
  expect(2).to.be.equal(2);
  });
it('Adding users from ods file 8', () => {
    
    cy.visit(urlPaginaUsuarios);
    cy.wait(3000)

    for(var i = 160; i < 180; i++){
      
    
      cy.get('button').contains('Agregar').click();
      
      cy.get('#roles').click();
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click();
      cy.get('li').contains('Técnico').click();
      cy.get('li').contains('Usuario').click();
      cy.get('body').type('{esc}');

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento);
      cy.get('#nombre').clear().type(datos[i].Nombres);
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido);
      cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido);
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento);

      
      
      cy.get('#correoElectronico').clear().type('agepic-'+datos[i].NumeroDocumento+'@yopmail.com');
      cy.get('button').contains('Guardar').click();

      cy.get(`[aria-label="Close"]`).click();
      cy.get('body').type('{esc}')

      
      //cy.wait(1000);
    }
  expect(2).to.be.equal(2);
  });
it('Adding users from ods file 9', () => {
    
    cy.visit(urlPaginaUsuarios);
    cy.wait(3000)

    for(var i = 180; i < 200; i++){
      
    
      cy.get('button').contains('Agregar').click();
      
      cy.get('#roles').click();
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click();
      cy.get('li').contains('Técnico').click();
      cy.get('li').contains('Usuario').click();
      cy.get('body').type('{esc}');

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento);
      cy.get('#nombre').clear().type(datos[i].Nombres);
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido);
      cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido);
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento);

      
      
      cy.get('#correoElectronico').clear().type('agepic-'+datos[i].NumeroDocumento+'@yopmail.com');
      cy.get('button').contains('Guardar').click();

      cy.get(`[aria-label="Close"]`).click();
      cy.get('body').type('{esc}')

      
      //cy.wait(1000);
    }
  expect(2).to.be.equal(2);
  });
it('Adding users from ods file 10', () => {
    
    cy.visit(urlPaginaUsuarios);
    cy.wait(3000)

    for(var i = 200; i < 220; i++){
      
    
      cy.get('button').contains('Agregar').click();
      
      cy.get('#roles').click();
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-r8u8y9');
      //cy.get('ul').should('have.class', 'MuiList-root MuiList-padding MuiMenu-list css-6hp17o-MuiList-root-MuiMenu-list')
      cy.get('li').contains('Administrador').click();
      cy.get('li').contains('Técnico').click();
      cy.get('li').contains('Usuario').click();
      cy.get('body').type('{esc}');

      cy.get('#nroDocumento').clear().type(datos[i].NumeroDocumento);
      cy.get('#nombre').clear().type(datos[i].Nombres);
      cy.get('#primerApellido').clear().type(datos[i].PrimerApellido);
      cy.get('#segundoApellido').clear().type(datos[i].SegundoApellido);
      cy.get('#fechaNacimiento').clear().type(datos[i].FechaNacimiento);

      
      
      cy.get('#correoElectronico').clear().type('agepic-'+datos[i].NumeroDocumento+'@yopmail.com');
      cy.get('button').contains('Guardar').click();

      cy.get(`[aria-label="Close"]`).click();
      cy.get('body').type('{esc}')

      
      //cy.wait(1000);
    }
  expect(2).to.be.equal(2);
  });


})