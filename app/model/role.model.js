module.exports = (sequelize, Sequelize) => {
	const Role = sequelize.define('roles', {
	  id: {
        type: Sequelize.INTEGER,
        primaryKey: true
	  },
	  nombre: {
		  type: Sequelize.STRING
	  }
	});
	
	return Role;
}

/*
PERMISOS DE LOS ROLES

CAJERO:
  - capturar ventas
  - ver ALGUNOS catalogos (reportes)

SUPERVISOR:
  - autorizar descuentos
  - ver ALGUNOS reportes (todos los catalogos y algunos informes)
  - modificar productos
  - realizar inventarios

ADMIN:
  - ver TODOS los reportes (catalogos, informes y reportes)
  - modificar cualquier registro de la BD
  - eliminar cualquier registro de la BD
  - realizar inventarios
  - modificar roles de usuarios
  - ingresar nuevos usuarios

*/