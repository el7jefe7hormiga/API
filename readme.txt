Nodejs JWT Authentication = 
	Nodejs/Express RestAPIs + JSON Web Token + BCryptjs + Sequelize + MySQL

https://grokonez.com/node-js/jwt/nodejs-jwt-authentication-nodejs-express-restapis-json-web-token-bcryptjs-sequelize-mysql#SourceCode
o de aqui:
https://bezkoder.com/node-js-jwt-authentication-mysql/
https://bezkoder.com/node-js-express-sequelize-mysql/


https://www.bezkoder.com/node-js-jwt-authentication-mysql/#Run_Test_with_Results


COMO LO EJECUTO:
/> node server.js

*! ATAJO: />run



<> si no quiere iniciar MySQL, checar si el servicio se esta ejecutando:
<> - En algunas ocasiones MySQL Server no se registra como servicio en Windows durante su instalación. 
Sigue estos pasos para hacerlo manualmente.
Abre el terminal CMD como administrador
Necesitarás ejecutar algunos comandos y necesitarás tener permisos de administrador para ellos.
Dirígete a la ubicación donde instalaste MySQL (C:\AppServ\MySQL\bin). 
Es aquí donde están los binarios que necesitarás ejecutar.
El primer comando es para asegurarte de no tener alguna instancia del servidor corriendo actualmente.
/> mysqladmin.exe -u root shutdown
Si obtienes un error como este:
mysqladmin.exe: connect to server at 'localhost' failed
error: 'Can't connect to MySQL server on 'localhost' (10061)'
Entonces no tienes ninguna instancia del servidor en ejecución.
Estando aquí ejecuta:
/> mysqld --install
Si todo sale bien el comando imprimirá un mensaje de confirmación.
INICIAR EL SERVICIO
/> net start mysql



Technologies
� Nodejs/Express
� Json Web Token
� BCryptjs
� Sequelize
� MySQL
/> npm install express body-parser sequelize mysql2 jsonwebtoken bcryptjs --save

JSON Web Token
JSON Web Token (JWT) defines a compact and self-contained way for securely transmitting information between parties as a JSON object.


-------------------
Como logearse:
-------------------
1. enviar con metodo POST http://localhost:5580/api/signin
2. body content type: application/json, editor view: raw input
3. send, enviar o enter.

Se recibe algo asi:
{
  "auth": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQyNTUzMTM1LCJleHAiOjE2NDI1ODE5MzV9.DZIWDY5uNPLY0YZnk-dCAZ-GlBLH018DJrbnABN9iXc",
  "usuario-solo": {
    "id": 1,
    "nombre": "Aarón",
    "username": "aLL",
    "email": "all@mail.com",
    "password": "$2a$08$ydgfSde75S6w1O2Nj9TmUOcTi22wqMWWKM2xRpF1cdB/FLi9W7S6e",
    "eliminadoEl": null,
    "createdAt": "2020-04-26 16:21:10",
    "updatedAt": "2020-04-26 16:21:10"
  },
"usuario": [
  {
  "id": 1,
  "nombre": "Aarón",
  "username": "aLL",
  "email": "all@mail.com",
  "password": "$2a$08$ydgfSde75S6w1O2Nj9TmUOcTi22wqMWWKM2xRpF1cdB/FLi9W7S6e",
  "eliminadoEl": null,
  "createdAt": "2020-04-26 16:21:10",
  "updatedAt": "2020-04-26 16:21:10"
  },
    [
    {
    "id": 1,
    "nombre": "CAJERO",
    "createdAt": "2020-04-26 16:21:10",
    "updatedAt": "2020-04-26 16:21:10",
    "usuario_roles": {
      "createdAt": "2020-04-26 16:21:11",
      "updatedAt": "2020-04-26 16:21:11",
      "roleId": 1,
      "usuarioId": 1
     }
    }
    ],
  ],
}

4. el acces-token es el que se necesita para hacer consultas a la API.

5. utilizar la api:
a. metodo GET
b. http://localhost:5580/api/.....
c. Header name: x-access-Token
d. Header value: el key token generado en el paso 1.

***************************************************

Que puedo obtener de esta API:

RUTAS:
TIPO DE ACCESO  |   METODO DE ACCESO Y  RUTA
---------------------------------------------------------------------------
Público           app.get('/api/', controller.allAccess)
-USUARIOS:
	1	 Login		POST/api/signin
	2	 Mostrar	GET/api/caja 				< --muestra la pagina para los cajeros
	3	 Mostrar	GET/api/supervisor			< --muestra la pagina para los supervisores
	4	 Mostrar	GET/api/admin 				< --muestra la pagina para los administradores
	5	 Listar		GET/api/admin/usuarios 		< --lisar todos los usuarios(solo los admin)
	6	 Crear		POST/api/admin/signup 		< --solo los administradores podran agregar nuevos usuarios
	7	 Update		PUT/api/admin/usuario:id 	< --solo los administradores podran modificar la info del usuario
	8	 Delete		DELETE/api/admin/usuario:id < --solo los administradores podran eliminar a los usuarios
	9	 Mostrar	GET/api/admin/usuario:id 	< --solo los administradores podran mostrar a los usuarios
	*/
	app.post('/api/signin', controller.signin)
	app.get('/api/caja', [authJwt.verifyToken, authJwt.isCajero], ctrlCaja.userContent)
	app.get('/api/supervisor', [authJwt.verifyToken, authJwt.isSupvOrAdmin], ctrlSuperv.managementBoard)
	app.get('/api/admin', [authJwt.verifyToken, authJwt.isAdmin], ctrlAdmin.adminBoard)
	app.get('/api/admin/usuarios', [authJwt.verifyToken, authJwt.isAdmin], ctrlAdmin.verUsuarios)
	app.post('/api/admin/signup', 
		[authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted ], 
		ctrlAdmin.signup)
	app.put('/api/admin/usuario/:id', [authJwt.verifyToken, authJwt.isAdmin], ctrlAdmin.modificarUsuario)
	app.delete('/api/admin/usuario/:id', [authJwt.verifyToken, authJwt.isAdmin], ctrlAdmin.eliminaUsuario)
	app.get('/api/admin/usuario/:id', [authJwt.verifyToken, authJwt.isAdmin], ctrlAdmin.verUsuario)

- PRODUCTOS
	 1. Mostrar todos los productos
	 2. Mostrar un solo producto
	 3. Agregar un producto
	 4. Modificar un producto
	 5. Eliminar un producto
	 6. Buscar producto
	*/
	app.get('/api/productos', [authJwt.verifyToken], ctrlProductos.verProductos)
	app.get('/api/producto/:id', [authJwt.verifyToken], ctrlProductos.verProducto)
	app.post('/api/producto/', [authJwt.verifyToken, authJwt.isSupvOrAdmin], ctrlProductos.crearProducto)
	app.put('/api/producto/:id', [authJwt.verifyToken, authJwt.isSupvOrAdmin], ctrlProductos.modificarProducto)
	app.delete('/api/producto/:id', [authJwt.verifyToken, authJwt.isSupvOrAdmin], ctrlProductos.eliminarProducto)
	app.get('/api/productos/:prod', [authJwt.verifyToken], ctrlProductos.buscarProducto)

-  CATEGORIAS
	 1. Mostrar todos
	 2. Mostrar uno
	 3. Agregar uno
	 4. Modificar uno
	 5. Eliminar uno
	 6. Mostrar solo las categorias padres
	 7. Buscar categoria
	*/
	app.get('/api/categorias', [authJwt.verifyToken], ctrlCategorias.verCategorias)
	app.get('/api/categoria/:id', [authJwt.verifyToken], ctrlCategorias.verCategoria)
	app.post('/api/categoria', [authJwt.verifyToken, authJwt.isSupvOrAdmin], ctrlCategorias.crearCategoria)
	app.put('/api/categoria/:id', [authJwt.verifyToken, authJwt.isSupvOrAdmin], ctrlCategorias.modificarCategoria)
	app.delete('/api/categoria/:id', [authJwt.verifyToken, authJwt.isSupvOrAdmin], ctrlCategorias.eliminarCategoria)
	app.get('/api/categorias/padres', [authJwt.verifyToken], ctrlCategorias.Padres)
	app.get('/api/categorias/:cat', [authJwt.verifyToken], ctrlCategorias.buscarCategoria)
}
/*