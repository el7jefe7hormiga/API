var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
 
require('./app/router/router.js')(app);

const db = require('./app/config/db.config.js');

const Role = db.role;
const Admin = db.user;
var bcrypt = require('bcryptjs');
const Op = db.Sequelize.Op;
  
// force: true will drop the table if it already exists
// usar forse: false para que no limpiea las tablas
db.sequelize.sync({force: false}).then(() => {
  //console.log('Drop and Resync with { force: true }');
  
  /*
  Es la primera vez que vas a utilizar esta API:
  1. deshabilita la linea // inicio(), esto es para crear los roles y al usuario inicial (administrativo)
  ya que él será el unico que podra crear a mas usuarios. 
  */
  //inicio(); // <-- habilitarlo para crear los registros, cuando forse=true
});
 
//require('./app/route/project.route.js')(app);
 
// Create a Server
var server = app.listen(5580, function (err) {
   /*
   var host = server.settings.address
   var port = server.settings.port
   console.log("App listening at http:// %s : %s", host, port)
   */
   if (err) console.error("\u2718 Error in server setup")
   console.log("\u2713 Server listening on Port", 5580)
})


function inicio(){
	Role.create({id: 1,	nombre: "CAJERO" })	
	Role.create({id: 2,	nombre: "SUPERVISOR" })	
	Role.create({id: 3,	nombre: "ADMIN"	})
	// crear a los usuarios (admin aLL:hormiga77)
	data = {
		nombre: "Aarón López",
		username: "aLL",
		email: "all@mail.com",
		password: bcrypt.hashSync("hormiga77", 8)
	}
	crea(data,["ADMIN", "SUPERVISOR"])

	data = {
			nombre: "Yoly Langarica",
			username: "yoly",
			email: "yoly@mail.com",
			password: bcrypt.hashSync("jefa77", 8)
	}
	crea(data, ["SUPERVISOR"])

	data = {
			nombre: "Sidney López",
			username: "pininane",
			email: "sidney@mail.com",
			password: bcrypt.hashSync("jefita01", 8)
	}
	crea(data,["CAJERO"])

	/*
	Admin.create({
		nombre: "Aarón",
		username: "aLL",
		email: "all@mail.com",
		password: bcrypt.hashSync("hormiga77", 8) 
	}).then(user => {
		console.log("	********* USUARIO AGREGADO  *********")
		Role.findAll({	where: {nombre: { [Op.or]: ["ADMIN", "SUPERVISOR"] } }
		}).then(roles => {
			console.log("	***** Buscando el id del rol que le asingé ******")
			user.setRoles(roles).then(() => {
				console.log("Usuario registrado !! " + user)
			})
		}).catch(err => { console.error("Error -> " + err) })
	}).catch(err => { console.error("Falló! Error -> " + err)	})
	*/
}

function crea(data, tipo){
	Admin.create(data).then(user => {
		//console.log("	********* USUARIO AGREGADO  *********")
		Role.findAll({	where: {nombre: { [Op.or]: tipo } }
		}).then(roles => {
			//console.log("	***** Buscando el id del rol que le asingé ******")
			user.setRoles(roles).then(() => {
				console.log("Usuario registrado !! ")
			})
		}).catch(err => { console.error("Error -> " + err) })
	}).catch(err => { console.error("Falló! Error -> " + err)	})
}
