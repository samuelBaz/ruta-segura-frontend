import { expect, test } from '@playwright/test'

import randomWords from 'random-words'

const rolAleatorio = randomWords({ exactly: 1 }).pop() ?? ''
test('Roles - crear/editar rol', async ({ page }) => {
  await page.goto(`/login`)
  await page.locator('#usuario').fill('ADMINISTRADOR-TECNICO')
  await page.locator('#contrasena').fill('123')
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
  await page.getByRole('button', { name: 'Roles', exact: true }).click()
  await page.getByRole('button', { name: 'Agregar rol' }).click()
  await page.locator('#rol').fill(rolAleatorio)
  await page.locator('#nombre').fill(rolAleatorio)
  await page.getByRole('button', { name: 'Guardar' }).click()

  await page.getByRole('button').filter({ hasText: 'search' }).click()
  await page.locator('#filtroRol').fill(rolAleatorio)

  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: 'Editar' }).click()
  const rolAleatorio2 = randomWords({ exactly: 1, min: 3 }).pop() ?? ''

  await page.locator('#rol').fill(rolAleatorio2)
  await page.locator('#nombre').fill(rolAleatorio2)
  await page.getByRole('button', { name: 'Guardar' }).click()
  await page.waitForTimeout(2000)
  await page.locator('#filtroRol').fill(rolAleatorio2)
  expect(page.getByRole('cell', { name: rolAleatorio2 })).toBeDefined()
})
