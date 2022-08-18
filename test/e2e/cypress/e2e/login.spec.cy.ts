import { darkTheme } from '../../../../themes/dark-theme';
import { lightTheme } from '../../../../themes/light-theme';

function hexToRgb(hex: string): string {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16)
  return 'rgb('+r+', '+g+', '+b+')';
}

const urlPaginaLogin = 'localhost:8080'

describe('Visit the login page', () => {

  beforeEach('VIsit the page', ()=>{
    //https://proyecto-base.test.gtic.gob.bo/
    cy.visit(urlPaginaLogin);

  });

  it('Clicking top buttons', () => {
    //Open the Informacion dialog and then close it.
    cy.get(`[name="Ayuda"]`).contains("help_outline").click();
    cy.get('h2').should("have.class", "MuiTypography-root")
    .contains("Información");
    cy.get(`[aria-label="close"]`).click();

    //Clcik the dark mode button
    cy.get(`[aria-label="Cambiar a modo oscuro"]`).click();
    cy.get('body').should('have.css', 'background-color', hexToRgb(darkTheme.palette.background.default));
    cy.get(`[aria-label="Cambiar a modo claro"]`).click();
    cy.get('body').should('have.css', 'background-color', hexToRgb(lightTheme.palette.background.default));

    }
  );

  it('Empty login fields', () => {
    cy.get('#usuario').clear();
    cy.get('#contrasena').clear();
    cy.get("#usuario").should("have.class", "MuiInputBase-input")
    cy.contains('Ingresar').click();

    cy.get('p:contains("Este campo es requerido")').should('have.length', 2);

    cy.get('#usuario').type('Usuario-Inexistente');

    cy.get('p:contains("Este campo es requerido")').should('have.length', 1);

    cy.get('#usuario').clear();
    cy.get('#contrasena').type('PasswordSuperLargoParaPrueba');
    cy.get('p:contains("Este campo es requerido")').should('have.length', 1);
  });

  it('Invalid login fields', () => {
    cy.get('#usuario').clear().type('Prueba');
    cy.get('#contrasena').clear().type('Password123');
    cy.get("#usuario").should("have.class", "MuiInputBase-input")
    cy.contains('Ingresar').click();

    cy.get("#notistack-snackbar");
    cy.get(`[aria-label="Close"]`).click();
  });

  it("Password visibility", () => {
    cy.get('#contrasena').should('have.attr', 'type', 'password');

    cy.get('[aria-label="toggle password visibility"]').click();
    cy.get('#contrasena').should('have.attr', 'type', 'text');

    cy.get('[aria-label="toggle password visibility"]').click();
    cy.get('#contrasena').should('have.attr', 'type', 'password');
  });

  it('Correct login', () => {
    cy.get('#usuario').clear().type("ADMINISTRADOR-TECNICO");
    cy.get('#contrasena').clear().type('123');
    cy.contains('Ingresar').click();
    cy.url().should('include', '/admin/home')
  });

})