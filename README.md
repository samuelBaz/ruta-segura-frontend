# Frontend Base - NextJS/ReactJS

> Para proyectos de AGETIC

## Técnologias empleadas

- NextJS, framework sobre ReactJS. [Sitio oficial](https://nextjs.org)
- ReactJS como librería para desarrollo frontend  [Sitio oficial](https://es.reactjs.org)
- MUI (Material UI), librería de componentes UI para ReactJS. [Sitio oficial](https://mui.com)
- Axios, para el manejo de peticiones HTTP. [Documentación](https://axios-http.com)
- ESLint, para examinar el código en busca de problemas. [Documentación](https://eslint.org)

## Estructura general

Para la creación de la estructura general del proyecto base se hizo uso de `Next.js CLI`

## Utilidades

El proyecto cuenta con utilidades que podrían que pueden aplicarse de según el caso:

| Utilidad           | Descripción                                                                                                                             | Ejemplo                                                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Cookies            | Utilidad wrapper que ayuda a leer/guardar cookies                                                                                       | `guardarCookie('token','mi-token' )` guarda el valor de la cookie                                                             |
| Fechas             | Utilidad wrapper de `dayjs` que puede validar y parsear fechas                                                                          | `formatoFecha('1994-07-05', '05/07/1994')`, retorna el valor de la fecha en nuevo formato                                     |
| Imprimir           | Utilidad wrapper de `console.log` que sirve para mostrar mensajes en consola con el nombre de la función que lo invoca segun el entorno | `imprimir('hola mundo')`, imprime `🖨 funcionSaludo -> hola mundo`                                                            |
| InterpreteMensajes | Utilidad que ayuda a extra mensajes de respuesta, pueden ser `Exception`, `strings`, objetos que contengan `message` o `mensaje`        | `interpretarMensaje({mensaje: 'hola mundo'})` retorna `Hola Mundo`                                                            |
| Alerta             | Hook que muestra alertas de confirmación, error, advertencía o información                                                              | `Alerta({mensaje: 'Hola mundo', variant: 'success'})` mostrará una Alerta en color verde                                      |
| Token              | Utilidad que valida la caducidad de un token                                                                                            | `verificarToken('mi-token')` el token devolverá `true` o `false` si caduco o no                                               |
| AlertDialog        | Utilidad que muestra una alerta con acciones según el caso                                                                              | `<AlertDialog isOpen={mostrarAlerta} titulo={'Alerta'}, texto={'Hola mundo'}><Button onClick={'cerrarAlerta'}></AlertDialog>` |
| Servicios          | Utilidad wrapper de `Axios` con funciones para hacer peticiones HTTP                                                                    | `await Servicios.get({url: 'localhost:3000', })`                                                                              |

## Navegación

Todas las rutas se encuentran en la carpeta `pages` (si, así de simple)

## Hooks (ciclo de vida)

Funciones de React que permiten crear/acceder al estado y ciclo de vida de componentes, las usadas en el proyecto son:

- useContext, es un Hook que nos permite acceder al contexto de un Provider
- useState, es un Hook que permite añadir el estado de React a un componente de función
- useEffect, es un Hook que permite controlar y decidir cuándo queremos que se ejecute un código concreto

## Componentes

Todos los componentes para uso general se encuentran en la carpeta `common/` y los componentes de uso específico por
módulo se encuentran en  `modules/`.

## Archivos estáticos

Los archivos estáticos (imágenes, etc.) se encuentran en la carpeta `public/`.

### Iconos

Los iconos de los menús son de  [material icons](https://fonts.google.com/icons).

## Sistema de diseño

Para cambiar los colores del sistema, se debe editar los archivos `theme/light-theme.ts` o  `theme/dark-theme.ts` según corresponda

Se recomienda seguir la regla `60 - 30 - 10` para el uso de colores

Para más información, se recomienda leer el articulo [How the 60-30-10 rule saved the day](https://uxdesign.cc/how-the-60-30-10-rule-saved-the-day-934e1ee3fdd8)

## Instalación

Para instalar la aplicación se recomienda revisar el siguiente documento:

> [INSTALL.md](INSTALL.md)

### Ejecutar en modo desarrollo

```
npm run dev
```

### Compilar para producción

```
npm run build
```

### Ejecutar test

```
npm run test
```

## Documentación


> La documentación esta en progreso

## Changelog

1. Instalar dependencia 
```bash
npm i generate-changelog -g
```
2. Generar tag de la versión

```bash
git tag v1.0.5 -m "1.0.5"
```

3. Generar archivo CHANGELOG para el tag
```bash
 generate-changelog 1.0.5
```

generar change log entre tags

```bash
generate-changelog 1.0.1...1.0.5
```
