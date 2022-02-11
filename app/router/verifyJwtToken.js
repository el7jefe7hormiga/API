const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const db = require('../config/db.config.js');
const Role = db.role;
const User = db.user;

verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token']

	if (!token){
		return res.status(200).send({ 
			auth: false, 
			mensage: 'Login Requerido. No se encontró token.' 
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err){
			return res.status(200).send({ 
				auth: false, 
				mensage: 'Falló la Autenticación.',
				error: err 
			});
		}
		req.usuarioId = decoded.id
		next()
	})
}

isAdmin = (req, res, next) => {
	console.log("-----  Es ADMIN ??  ----")
	User.findByPk(req.usuarioId)
		.then(user => {
			user.getRoles().then(roles => {
				console.log("-----  Verifica el Rol  ----" + roles[0].nombre)

				for(let i=0; i<roles.length; i++){
					if(roles[i].nombre.toUpperCase() === "ADMIN"){
						console.log('--- >' + roles[i].nombre);
						next();
						return;
					}
				}
				res.status(200).json({
					"error": "Se requiere Rol de Administrador.",
					"usuario": user.nombre,
					"rol": roles
				})
				//res.status(403).send("Se requiere Rol de Administrador !");
				return;
			})
		})
}

isSupervisor = (req, res, next) => {
	console.log('--------- Es Supervisor ? -------')
	User.findByPk(req.usuarioId)
		.then(supervisor => {
			supervisor.getRoles().then( roles => {

				for (let i = 0; i < roles.length; i++) {
					if (roles[i].nombre.toUpperCase() === "SUPERVISOR") {
						console.log('--- Si > ' + roles[i].nombre);
						next();
						return;
					}
				}
				res.status(403).json({
					"error": "Se requiere Rol de Supervisor.",
					"usuario": supervisor.nombre,
					"rol": roles
				})
				//res.status(403).send("Se requiere Rol de Supervisor !");
				return;
			})
		})
}

isSupvOrAdmin = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	User.findByPk(req.usuarioId)
		.then(user => {
			user.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){					
					if ((roles[i].nombre.toUpperCase() === "SUPERVISOR") || (roles[i].nombre.toUpperCase() === "ADMIN")){
						next()
						return
					}
				}
				res.status(200).json({
					"error": "Se requiere Rol de Supervisor o Administrador.",
					"usuario": user.nombre,
					"rol": roles
				})
				//res.status(403).send("Se requiere Rol de Supervisor o Administrador!");
			})
		})
}

isCajero = (req, res, next) => {
	console.log('--------- Es Cajero ? -------')
	User.findByPk(req.usuarioId)
		.then(cajero => {
			cajero.getRoles().then(roles => {

				for (let i = 0; i < roles.length; i++) {
					if (roles[i].nombre.toUpperCase() === "CAJERO") {
						console.log('--- Si > ' + roles[i].nombre);
						next();
						return;
					}
				}
				res.status(200).json({
					"error": "Se requiere Rol de cajero.",
					"usuario": cajero.nombre,
					"rol": roles
				})
				//res.status(403).send("Se requiere Rol de cajero !");
				return;
			})
		})
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isCajero = isCajero;
authJwt.isSupervisor = isSupervisor;
authJwt.isAdmin = isAdmin;
authJwt.isSupvOrAdmin = isSupvOrAdmin;

module.exports = authJwt;