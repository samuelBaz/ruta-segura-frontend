import { expect, test } from '@playwright/test'

interface CiudadanosPruebaType {
  ci: string
  nombre: string,
  apellido_paterno: string,
  apellido_materno: string,
  telefono: string,
  email: string,
  fecha_nacimiento: string
}

test('Cuidadania - Inicio Session con Ciudadania', async ({ page, isMobile }) => {
  const fs = require('fs')

  const rawCiudadanos = fs.readFileSync(process.env.PATH_CIUDADANOS)

  const ciudadanos: Array<CiudadanosPruebaType> = JSON.parse(rawCiudadanos)
  const indice = Math.floor(Math.random() * ciudadanos.length)
  const numeroAleatorio = Math.floor(Math.random() * 1000000);

  // Asegura que el número siempre tenga 6 dígitos
  const numero6Digitos = String(numeroAleatorio).padStart(6, '0');
  if (ciudadanos.length == 0) {
    return
  }

  const algunCiudadano = ciudadanos[indice]

  await page.goto('/login');
  await page.getByRole('button', { name: 'Ingresar con Ciudadanía Ingresa con Ciudadanía' }).click();
  await page.locator('#username').fill(algunCiudadano.ci)
  await page.locator('#password').fill('Agepic135')
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.locator('#code').fill(`${numero6Digitos}`)
  await page.getByRole('button', { name: 'Continuar' }).click();


  const componentePresente = await page.getByRole('button', { name: 'Continuar' }).isVisible({ timeout: 5000 });

  if (componentePresente) {
    await page.getByRole('button', { name: 'Continuar' }).click()
  }
  await page.getByRole('button', { name: 'Perfil Información del perfil de usuario que inicio sesión' }).click()
  const locator = page.getByText(`CI ${algunCiudadano.ci}`);
  await expect(locator).toContainText(`CI ${algunCiudadano.ci}`);
  if (isMobile) {
    await page.getByRole('banner').getByRole('button').nth(2).click();
  } else {
    await page.getByRole('button', { name: `${algunCiudadano.nombre}` }).click();
  }
  await page.getByText('Cerrar sesión').click();
  await page.getByRole('button', { name: 'Aceptar' }).click();
  await page.waitForResponse((response) => response.url().includes('/login'))
})

