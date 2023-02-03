import { test } from '@playwright/test'
import randomWords from 'random-words'

test('Parámetros - Nuevo parámetro', async ({ page }) => {
  const codigo = randomWords.name

  await page.goto('http://localhost:8080/login')
  await page.locator('#usuario').fill('ADMINISTRADOR-TECNICO')
  await page.locator('#contrasena').fill('123')
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
  await page.goto('http://localhost:8080/admin/parametros')
  await page.locator('#codigo').press('CapsLock')
  await page.locator('#codigo').click()
  await page.locator('#codigo').fill(codigo)
  await page.locator('#grupo').dblclick()
  await page.locator('#grupo').fill(codigo)
  await page.locator('#descripcion').click()
  await page.locator('#descripcion').fill(codigo)
  await page.getByRole('button', { name: 'Guardar' }).click()
  await page.getByRole('button').filter({ hasText: 'search' }).click()
  await page
    .locator('div')
    .filter({ hasText: 'Buscar parámetro' })
    .nth(4)
    .click()
  await page.locator('#parametro').click()
  await page.locator('#parametro').fill(codigo)
  await page.getByRole('button', { name: 'Editar' }).click()
  await page.getByRole('button', { name: 'close' }).click()
})
