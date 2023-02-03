import { test, expect } from '@playwright/test'

test('Iniciar sesión - usuario/contraseña', async ({ page }) => {
  await page.goto('http://localhost:8080/login')
  await page.locator('#usuario').fill('ADMINISTRADOR-TECNICO')
  await page.locator('#contrasena').fill('123')
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
  await expect(page).toHaveURL(/.*admin/)
})

test('Usuarios - Nuevo usuario', async ({ page }) => {
  await page.goto('http://localhost:8080/login')
  await page.locator('#usuario').fill('ADMINISTRADOR-TECNICO')
  await page.locator('#contrasena').fill('123')
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
  await page
    .getByRole('button', { name: 'Usuarios Control de usuarios del sistema' })
    .click()
  await page.getByRole('button', { name: 'Agregar' }).click()
  await page.locator('#nroDocumento').fill('5602708')
  await page.locator('#nombre').fill('RICARDO')
  await page.locator('#primerApellido').fill('AGUILERA')
  await page.locator('#segundoApellido').fill('JIMENEZ')
  await page.getByPlaceholder('dd/mm/yyyy').fill('21/07/1983')
  await page.locator('#correoElectronico').fill('agepic-5602708a@yopmail.com')
  await page.getByRole('button', { name: 'Guardar' }).click()
  await page.getByRole('button').filter({ hasText: 'search' }).click()
  await page.locator('#nombre').fill('5602708')
  await expect(page).toHaveProperty('cell')
  await page.getByRole('cell', { name: 'CI 5602708' }).click()
})
