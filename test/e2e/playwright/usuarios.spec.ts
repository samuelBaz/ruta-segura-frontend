import { expect, test } from '@playwright/test'

interface usuarioPruebaType {
  ComplementoVisible: number
  NumeroDocumento: string
  Complemento: string
  Nombres: string
  PrimerApellido: string
  SegundoApellido: string
  FechaNacimiento: string
  LugarNacimientoPais: string
  LugarNacimientoDepartamento: string
  LugarNacimientoProvincia: string
  LugarNacimientoLocalidad: string
  Observacion: string
}

test('Usuarios - Nuevo usuario', async ({ page }) => {
  const fs = require('fs')

  const rawCiudadanos = fs.readFileSync(process.env.PATH_CIUDADANOS)

  const ciudadanos: Array<usuarioPruebaType> = JSON.parse(rawCiudadanos)

  const indice = Math.floor(Math.random() * ciudadanos.length)

  if (ciudadanos.length == 0) {
    return
  }

  const algunCiudadano = ciudadanos.filter(
    (value) => value.Observacion == null
  )[indice]

  if (!algunCiudadano) {
    return
  }

  await page.goto(`/login`)
  await page.locator('#usuario').fill('ADMINISTRADOR-TECNICO')
  await page.locator('#contrasena').fill('123')
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
  await page.getByRole('button', { name: 'Usuarios', exact: true }).click()
  await page.getByRole('button', { name: 'Agregar' }).click()
  await page.locator('#nroDocumento').click()
  await page.locator('#nroDocumento').fill(algunCiudadano.NumeroDocumento)
  await page.locator('#nombre').fill(algunCiudadano.Nombres)
  await page
    .locator('#primerApellido')
    .fill(algunCiudadano.PrimerApellido ?? '')
  await page
    .locator('#segundoApellido')
    .fill(algunCiudadano.SegundoApellido ?? '')
  await page.getByPlaceholder('dd/mm/yyyy').fill(algunCiudadano.FechaNacimiento)
  await page.locator('#roles').first().click()
  await page.getByRole('option', { name: 'Usuario' }).click()
  await page.getByRole('option', { name: 'Usuario' }).press('Escape')
  await page
    .locator('#correoElectronico')
    .fill(`agepic-${algunCiudadano.NumeroDocumento}@yopmail.com`)
  await page.getByRole('button', { name: 'Guardar' }).click()
  await page.getByRole('button').filter({ hasText: 'search' }).click()
  await page.locator('#nombre').fill(algunCiudadano.NumeroDocumento)
  expect(
    page.getByRole('cell', { name: algunCiudadano.NumeroDocumento })
  ).toBeDefined()
})
