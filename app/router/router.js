const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {
	
	const controller = require('../controller/controller.js')
	
	const ctrlCaja = require('../controller/controllerCaja.js')
	const ctrlSuperv = require('../controller/controllerSupervisor.js')
	const ctrlAdmin = require('../controller/controllerAdmin.js')

	const ctrlProductos = require('../controller/controllerProducto.js')
	const ctrlCategorias = require('../controller/controllerCategoria.js')

	app.get('/api/', controller.allAccess)
	
	/*	RUTAS:
		USUARIOS:
	-------------------------
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


	/*  PRODUCTOS
	 --------------
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

	/*  CATEGORIAS
	 --------------
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
	-- Para el primer usuario de la tabla (administrador), se generará automáticamente:  aLL:hormiga77

POSTMAN:
1: 		signin...login
Body:
 {
	"username": "aLL",
	"password": "hormiga77"
}   <-- me regresa un accessToken


2,3,4:   mostrar las paginas segun su Rol, solo le envío el token
Headers: [{
	"key" : "x-access-token",
	"value" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg3MDk3MzUxLCJleHAiOjE1ODcxODM3NTF9.QqhSGNwCvp_HoHzdFwFW1J918Z3cu21Pufbaket1iUM","description":"","type":"text","enabled":true}]

*/