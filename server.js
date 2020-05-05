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
  //inicio(); // <-- habilitarlo para crear los registros, cuando forse=true
});
 
//require('./app/route/project.route.js')(app);
 
// Create a Server
var server = app.listen(5580, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("App listening at http:// %s : %s", host, port)
})


function inicio(){
	Role.create({id: 1,	nombre: "CAJERO" })	
	Role.create({id: 2,	nombre: "SUPERVISOR" })	
	Role.create({id: 3,	nombre: "ADMIN"	})
	// crear al primer usuario (admin aLL:hormiga77)
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
		}).catch(err => { console.log("Error -> " + err) })
	}).catch(err => { console.log("Falló! Error -> " + err)	})

}