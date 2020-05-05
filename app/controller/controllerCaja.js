const db = require('../config/db.config.js');
const User = db.user;
const Role = db.role;

/*
CONTROLADOR DEL  C A J E R O	
*/
exports.userContent = (req, res) => {
	User.findOne({
		where: {
            id: req.usuarioId, 
            eliminadoEl: null
        },
		attributes: ['nombre', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'nombre'],
			through: {
				attributes: ['usuarioId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"uescripción": ".... CAJA ...",
			"usuario": user
		});
	}).catch(err => {
		res.status(200).json({
			"mensage": "No se puede accesar a la página del usuario.",
			"error": err
		});
	})
}

