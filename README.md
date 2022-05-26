# Frontend Base - NextJS/ReactJS

> Para proyectos de AGETIC

## Técnologias empleadas
- NextJS, framework sobre ReactJS. [Sitio oficial](https://nextjs.org)
- ReactJS como librería para desarrollo frontend  [Sitio oficial](https://es.reactjs.org)
- MUI (Material UI), librería de componentes UI para ReactJS. [Sitio oficial](https://mui.com)
- Axios, para el manejo de peticiones HTTP. [Documentación](https://axios-http.com)
- ESLint, para examinar el código en busca de problemas. [Documentación](https://eslint.org)

## Estructura general
Para la creación de la estructura general del proyecto base se hizo uso de `vue-cli` con el template oficial recomendado en la uĺtima versión [Documentación](https://cli.vuejs.org/)

## Plugins
El proyecto cuenta con plugins (librerías que extienden la funcionalidad de `Vue.js`) para diversos usos y requerimientos:

Plugin | Descripción | Ejemplo |
--- | --- | --- |
$util | Plugin con funciones generales del sistema | `this.$util.toType([])` devuelve el tipo de dato más específico, en este caso devuelve `array` |
$storage | Plugin wrapper de funciones para el manejo de `localstorage`, su uso es obligatorio | `this.$storage.get('mi-dato')` |
$datetime | Plugin con funciones para el manejo de fechas | `this.$datetime.format('DD/MM/YYYY', '2021-08-17T23:59:14.357Z')` lo convierte a `17/08/2021` |
$waiting | Plugin para el bloqueo a petición del usuario de la pantalla | `this.$waiting(true, 'Bloquear pantalla por 5 segundos'), this.$waiting(false)` |
$message | Plugin con funciones de mensajes de notificaciones | `this.$message.success('¡Hola mundo!')` |
$alert | Plugin que reemplaza al `alert` nativo del navegador | `this.$alert({ text: '¡Hola mundo!' })` |
$confirm | Plugin que reemplaza al `confirm` nativo del navegador | `this.$confirm({ text: '¿Desea continuar?', callbackOk: () => { ... esto se ejecuta cuando se acepte el mensaje ...} })` |
$service | Plugin wrapper con funciones para el manejo de peticiones con `axios` su uso es obligatorio | `this.$service.post('usuarios', { ... datos ... }).then(response => { ... })` |

> Nota.- Se recomienda usar todos estos plugins y tratar de buscar la funcionalidad que se requiera dentro de estos para no sobrecargar el proyecto

## Vue Router
La configuración general de rutas se encuentra en `src/router/index.js`.

## Vuex
La configuración general de vuex para el manejo de estados se encuentra en `src/store/index` se recomienda manejarlo por módulos.

## Components
Se deben crear todos los componentes de la aplicación en `src/components/` y para los componentes generales en `src/plugins/`.

## Archivos estáticos
Si se desean modificar variables globales de $vuetify se puede hacer en el archivo src/scss/variables.scss
Los archivos estáticos(imágenes, etc.) se encuentran en la carpeta `public/`.

### Iconografía

Para los íconos se esta utilizando [material icons](https://fonts.google.com/icons). Se puede consultar la documentación de la librería [vue-material-icons](https://www.npmjs.com/package/@dbetka/vue-material-icons) para referenciar los iconos requeridos.

## Configuración de Tokens(variables del sistema de diseño)
Para cambiar los colores del sistema basado en tokens(variables) se debe cambiar en `src/scss/variables.scss` y en `src/plugins/vuetify.js` en la constante `light, dark`.

## Importante
La elección de `Vuetify` fue debido a que esta ya tiene la mayoría de los componentes más comunes para la construcción de cualquier sistema, es importante usar todo lo que nos ofrece y no tratar de colocar librerías que ya tengan funcionalidades similares a las que ya se tienen, para no así sobrecargar el sistema.

## Instalación
Para instalar la aplicación se recomienda revisar el siguiente enlace:

> [INSTALL.md](INSTALL.md)


### Ejecutar en modo desarrollo
```
npm run start
```

### Compilar para produccion
```
npm run build
```

### Ejecutar test
```
npm run test
```

## Documentación
Este proyecto incluye el directorio **docs** con más detalle de la documentación técnica:
1. [Documentación](docs/analisis/README.md)

## Licencia

[LGP-Bolivia](LICENSE).
