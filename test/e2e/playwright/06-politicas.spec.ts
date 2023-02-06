import { expect, test } from '@playwright/test'

import randomWords from 'random-words'

test('Politicas - Nueva política', async ({ page }) => {
  const palabra = randomWords({ exactly: 1 }).pop() ?? ''

  await page.goto(`/login`)
  await page.locator('#usuario').fill('ADMINISTRADOR-TECNICO')
  await page.locator('#contrasena').fill('123')
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
  await page.getByRole('button', { name: 'Políticas', exact: true }).click()
  await page.getByRole('button', { name: 'Agregar política' }).click()

  await page.locator('#sujeto').click()
  await page.getByRole('option', { name: 'TECNICO' }).click()
  await page.locator('#objeto').fill(palabra)
  await page.waitForTimeout(1000)
  await page.locator('#app').click()
  await page.getByRole('option', { name: 'frontend' }).click()
  await page.getByRole('button', { name: '​', exact: true }).click()
  await page.getByRole('option', { name: 'create' }).click()
  await page.getByRole('option', { name: 'update' }).click()
  await page.locator('#menu- div').first().click()
  await page.getByRole('button', { name: 'Guardar' }).click()

  await page.getByRole('button').filter({ hasText: 'search' }).click()
  await page.locator('#buscar').fill(palabra)
  await page.waitForTimeout(1000)
  expect(page.getByRole('cell', { name: palabra })).toBeDefined()
})
