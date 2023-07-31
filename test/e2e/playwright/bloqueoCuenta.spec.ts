import { expect, test } from '@playwright/test'

function generarCadenaAleatoria(longitud:number) {
  const caracteresValidos = "0123456789";
  let cadenaAleatoria = "";

  for (let i = 0; i < longitud; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteresValidos.length);
    cadenaAleatoria += caracteresValidos[indiceAleatorio];
  }

  return cadenaAleatoria;
}

test('Bloqueo de Cuenta', async ({ page }) => {
  await page.goto('/login')
  const randomNumber = Math.floor(Math.random() * 1001)
  const pasword = generarCadenaAleatoria(10);
  await page.getByRole('tab', { name: 'Regístrate' }).click()
  await page.getByLabel('Nombre de usuario').fill(`pedro${randomNumber}`)
  await page
    .getByLabel('Correo electrónico')
    .fill(`pedro${pasword}${randomNumber}@gmail.com`)
  await page
    .getByLabel('Nueva contraseña', { exact: true })
    .fill(pasword)
  await page
    .getByLabel('Repita su nueva contraseña')
    .fill(pasword)
  await page.getByRole('button', { name: 'Crear cuenta' }).click()

  const response = await page.waitForResponse(
    `${process.env.BASE_URL_BACK}/usuarios/crear-cuenta`
  )
  const data = await response
    .json()
    .then((value) => {
      return value
    })
    .catch((err) => {
      throw new Error('Error al crear usuario:',err)
    })
  const codigo = await fetch(
    `${process.env.BASE_URL_BACK}/usuarios/test/codigo/${data.datos.id}`,
    {
      method: 'get',
    }
  )
  const codigo1 = await codigo
    .json()
    .then((value) => {
      return value
    })
    .catch((err) => {
      throw new Error('Error al validar codigo activación:',err);      
    })
  //¡Activación de cuenta exitosa!
  await page.goto(
    `${process.env.BASE_URL}/activacion?q=${codigo1.datos.codigoActivacion}`
  )
  const locator = page.getByText(`Cuenta Activa`)
  await expect(locator).toContainText(`Cuenta Activa`)

  let mesaje=''
  await page.goto('/login')
  for(let i=1;i<=4;i++){
    await page.getByLabel('Usuario', { exact: true }).fill(`pedro${pasword}${randomNumber}@gmail.com`);
    await page.getByLabel('Contraseña', { exact: true }).fill(`${pasword}fake`);
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    const response = await page.waitForResponse(
      `${process.env.BASE_URL_BACK}/auth`
    )
    const data = await response
      .json()
      .then((value) => {
        return value
      })
      .catch((err) => {
        throw new Error('Error al crear usuario:',err)
      })
      mesaje=data.mensaje
      setTimeout(()=>{
        console.log("sperando")
      },1000 )
  }
  const locator1 = page.getByText(mesaje)
  await expect(locator1).toContainText(`El usuario ha sido bloqueado debido a demasiados intentos fallidos de inicio de sesión. Revisa tu correo electrónico.`)
  const codigoDesbloqueo = await fetch(
    `${process.env.BASE_URL_BACK}/usuarios/test/codigo/${data.datos.id}`,
    {
      method: 'get',
    }
  )
  const codigoDesbloqueo1 = await codigoDesbloqueo
    .json()
    .then((value) => {
      return value
    })
    .catch((err) => {
      throw new Error('Error al validar codigo activación:',err);      
    })
  await page.goto(`${process.env.BASE_URL}/desbloqueo?q=${codigoDesbloqueo1.datos.codigoDesbloqueo}`)
  //verificando si el desbloque fue exitoso
  const ok=page.getByText('Cuenta desbloqueada exitosamente.')
  await expect(ok).toContainText('Cuenta desbloqueada exitosamente.')
  await page.getByRole('button', { name: 'Ir al inicio' }).click();
})




