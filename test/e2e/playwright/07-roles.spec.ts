import { test } from '@playwright/test'

import randomWords from 'random-words'

test('Roles - Nuevo rol', async ({ page }) => {
  const palabra = randomWords({ exactly: 1 }).pop() ?? ''
  await page.goto(`/login`)
  await page.locator('#usuario').fill('ADMINISTRADOR-TECNICO')
  await page.locator('#contrasena').fill('123')
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
  await page.getByRole('button', { name: 'Roles', exact: true }).click()
  await page.getByRole('button', { name: 'Agregar rol' }).click()
  await page.locator('#rol').fill(palabra)
  await page.locator('#nombre').fill(palabra)
  await page.getByRole('button', { name: 'Guardar' }).click()
})
