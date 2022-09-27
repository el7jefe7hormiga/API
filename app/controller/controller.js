const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.allAccess = (req, res) => {
	res.status(200).send("Contenido público...<a href='../html/api/index.html'>login</a><br><a href='/singup'>registrar</a>");
};

exports.signin = (req, res) => {
	console.clear()
	console.log()
	console.log("Iniciando sesión... SignIn")
	/*
	const dato = req.body.username
	return res.status(200).json({
		"mensage": "Usuario NO Encontrado!!",
		"enviado": dato,
	}) */
	User.findOne({
		where: { username: req.body.username }
	}).then(user => {
		if (!user) {
			//return res.status(404).send('Usuario No Encontrado !!');
			return res.status(200).json({
				"error": "Error",
				"mensage": "Usuario NO Encontrado!!" & req.body.username
			})
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(200).send({ 
				//auth: false, 
				//accessToken: null, 
				error: "Error",
				mensage: "Password Invalido!",
			 });
		}
		
		var token = jwt.sign({ id: user.id }, config.secret, {
		  expiresIn: 60*60*8 //=86400 // expires in 8 hours
		});
		
		
		// sacar los datos que se ocupan del usuario: id, email, username, nombre, roles
		// y enviarlo.
		user.getRoles().then(roles => {	
			res.status(200).json({
				'auth': true, 
				'accessToken': token,
				'usuario-solo': user,
				"usuario": [user, roles]
			})
		})

		/*
		User.findOne({ 
			where: { id: user.id },
        		attributes: ['id', 'nombre', 'username', 'email'],
        		include: [{
            			model: Role,
            			attributes: ['id', 'nombre'],
            			through: { attributes: ['usuarioId', 'roleId'] }
        		}]
    		}).then(usuarioRoles => {       		
			//res.status(200).send({ auth: true, accessToken: token, usuario: usuarioRoles, extra: 'INFO EXTRA' });
			return res.status(200).json({
				'auth': true, 
				'accessToken': token,
				'usuario': usuarioRoles,
			})
    		});
		*/
	}).catch(err => {
		return res.status(200).send({
			//auth: false,
			//accessToken: null,
			error: "Error",
			mensage: err
		});
	});
}