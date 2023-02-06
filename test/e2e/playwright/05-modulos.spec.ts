import { expect, test } from '@playwright/test'

import randomWords from 'random-words'

test('Modulos - Nuevo módulo', async ({ page }) => {
  const palabra = randomWords({ exactly: 1 }).pop() ?? ''
  await page.goto('/login')
  await page.locator('#usuario').fill('ADMINISTRADOR-TECNICO')
  await page.locator('#contrasena').fill('123')
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
  await page.getByRole('button', { name: 'Módulos', exact: true }).click()

  await page
    .getByRole('main')
    .getByRole('button', { name: 'account of current user' })
    .click()
  await page.getByText('Nuevo módulo').click()
  await page.getByRole('button', { name: '​', exact: true }).click()

  await page.getByRole('option', { name: 'Configuración' }).click()
  await page.locator('#icono').fill('check')
  await page.locator('#nombre').fill(palabra)
  await page.locator('#label').fill(palabra)
  await page.locator('#descripcion').fill(palabra)
  await page.locator('#url').fill(palabra)

  await page.getByRole('button', { name: 'Guardar' }).click()
  await page.locator('#btnFiltro').click()
  await page.locator('#buscar').click()
  await page.locator('#buscar').fill(palabra)
  expect(page.getByRole('cell', { name: palabra })).toBeDefined()
})
//72083089
