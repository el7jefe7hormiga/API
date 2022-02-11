const db = require('../config/db.config.js');
const config = require('../config/config.js');
const ROLEs = config.ROLEs; 
const User = db.user;
const Role = db.role;

checkDuplicateUserNameOrEmail = (req, res, next) => {
	// -> Check Username is already in use
	User.findOne({
		where: {
			username: req.body.username
		} 
	}).then(user => {
		if(user){
			res.status(200).json({
				"mensage": "Intenta con otro.",
				"error": "Username ya está tomado."
			});
			return;
		}
		
		// -> Check Email is already in use
		User.findOne({ 
			where: {
				email: req.body.email
			} 
		}).then(user => {
			if(user){
				res.status(200).json({
					"mensage": "Intenta con otro.",
					"error": "Username ya está tomado."
				});
				return;
			}
				
			next();
		});
	});
}

checkRolesExisted = (req, res, next) => {	
  console.log('roles:', req.body)
	for(let i=0; i<req.body.roles.length; i++){
		if(!ROLEs.includes(req.body.roles[i].toUpperCase())){
			res.status(200).json({
				"mensage": "Verifica si el rol existe.",
				"error": "No existe el Rol: " + req.body.roles[i]
			});
			return;
		}
	}
	next();
}

const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = signUpVerify;