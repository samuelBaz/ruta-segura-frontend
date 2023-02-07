import { expect, test } from '@playwright/test'

import randomWords from 'random-words'

test('Módulos - Nuevo módulo', async ({ page }) => {
  const nombreAleatorio = randomWords({ exactly: 1 }).pop() ?? ''

  await page.goto('/login')
  await page.locator('#usuario').fill('ADMINISTRADOR-TECNICO')
  await page.locator('#contrasena').fill('123')
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
  await page.getByRole('button', { name: 'Módulos', exact: true }).click()

  await page
    .getByRole('main')
    .getByRole('button', { name: 'agregar nuevo módulo' })
    .click()
  await page.getByText('Nuevo módulo').click()
  await page.locator('#idModulo').click()

  await page.getByRole('option', { name: 'Configuración' }).click()
  await page.locator('#icono').fill('check')
  await page.locator('#nombre').fill(nombreAleatorio)
  await page.locator('#label').fill(nombreAleatorio)
  await page.locator('#descripcion').fill(nombreAleatorio)
  await page.locator('#url').fill(nombreAleatorio)
  await page.getByRole('button', { name: 'Guardar' }).click()
  await page.locator('#btnFiltro').click()
  await page.locator('#buscar').click()
  await page.locator('#buscar').fill(nombreAleatorio)

  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: 'Editar' }).click()

  const nombreAleatoria2 = randomWords({ exactly: 1, min: 3 }).pop() ?? ''
  await page.locator('#icono').fill('check')
  await page.locator('#nombre').fill(nombreAleatoria2)
  await page.locator('#label').fill(nombreAleatoria2)
  await page.locator('#descripcion').fill(nombreAleatoria2)
  await page.locator('#url').fill(nombreAleatoria2)

  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: 'Guardar' }).click()
  await page.waitForTimeout(2000)
  await page.locator('#buscar').fill(nombreAleatoria2)

  expect(page.getByRole('cell', { name: nombreAleatorio })).toBeDefined()
})
