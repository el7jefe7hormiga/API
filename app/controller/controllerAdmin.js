const db = require('../config/db.config.js');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

//const { Datatypes } = require("sequelize")

/*
CONTROLADOR DEL  A D M I N I S T R A D O R
*/

// Pagina principal del administrador
exports.adminBoard = (req, res) => {
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
            "mensage": "Página del Administrador...",
            "usuario": user
        });
    }).catch(err => {
        res.status(200).json({
            "mensage": "No se puede accesar a la página del Administrador.",
            "error": err
        })
    })
}

// Crear nuevo usuario
exports.signup = (req, res) => {
    // Save User to Database
    console.log("Procesando el registro del usuario... -> SignUp");

    User.create({
        nombre: req.body.nombre,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        Role.findAll({ // where Role.nombre=req.body.roles[0] OR Role.nombre=req.body.roles[1] OR .... [n]
            where: { nombre: { [Op.or]: req.body.roles } }
        }).then(roles => {
            user.setRoles(roles).then(() => {
                res.status(200).json({
                    "mensage": "Usuario registrado.",
                    "usuario": user
                })
            }).catch(err => {
                res.status(200).json({
                    "mensage": "Error al crear nuevo usuario.",
                    "error": err
                })
            })
        }).catch(err => {
            res.status(200).json({
                "mensage": "No se pudo registrar al usuario.",
                "error": err
            })
        })
    })
}

// Mostrar lista de usuarios
exports.verUsuarios = (req, res) => {
    User.findAll({
        where: { eliminadoEl: null }
    }).then(usuarios => {
        res.status(200).json({
            "mensage": "Lista de usuarios",
            "usuarios": usuarios
        })
    }).catch(err => {
        res.status(200).json({
            "mensage": "No se pueden listar a los usuarios.",
            "error": err
        });
    })
}

// Mostrar UN usuario
exports.verUsuario = (req, res) => {
    const param_id = req.params.id;
    User.findOne({
        where: {
            id: param_id,
            eliminadoEl: null
        }
    })
        .then(usuario => {
            if (!usuario) {
                return res.status(200).json({
                    "mensage": "Usuario no encontrado!",
                    "usuario": null
                })
            }
            res.status(200).json({
                "mensage": "Mostrando al usuario...",
                "usuario": usuario
            })
        }, () => {
            // no se encontró el registro o está eliminado
            res.status(200).json({
                "mensage": "Usuario no existe o está eliminado.",
                "usuario": null //param_id
            })
        }).catch(err => {
            res.status(200).json({
                "mensage": "No se puede mostrar al usuario.",
                "error": err
            })
        })
}

// Modificar UN usuarios
exports.modificarUsuario = (req, res) => {
    const param_id = req.params.id;
    // METODO DOS
    // el metodo uno esta en metodo1.js
    User.update({
        nombre: req.body.nombre,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }, {
        where: {
            id: param_id,
            eliminadoEl: null
        }
    }).then(() => {
        console.log(">  Usuario actualizado, ahora actualiza los Roles")
        // hasta aqui, se ha actualizado el user, pero solo devuelve
        // la cantidad de registros actualizados,
        // tengo que hacer una busqueda del registro actualizado y 
        // entonces si, actualizar la usuario_roles
        User.findOne({ where: { id: param_id } }).then(user => {
            Role.findAll({ where: { nombre: { [Op.or]: req.body.roles } } }).then(roles => {
                user.setRoles(roles).then(() => {
                    //res.send("Usuario y sus Roles se han actualizado !!")
                    res.status(200).json({
                        "mensage": "Usuario actualizado",
                        "usuario": user,
                        "roles": roles
                    })
                })
            })
        })
    }, () => {
        // no se actualizó el registro o está eliminado
        res.status(200).json({
            "mensage": "Usuario no actualizado, no existe o está eliminado.",
            "usuario": null //param_id
        })
    }).catch(err => {
        res.status(200).json({
            "mensage": "No se pudo actualizar la información del usuario.",
            "error": err
        })
    })

}

// Eliminar un usuario
// No se elimina 'fisicamente' de la tabla, se modifica el campo eliminadoEl = fecha de eliminacion
exports.eliminaUsuario = (req, res) => {
    const param_id = req.params.id;
    User.update({
        eliminadoEl: Date.now()
    }, {
        where: {
            id: param_id,
            eliminadoEl: null
        }
    }).then(() => {
        console.log("Usuario eliminado")
        res.status(200).json({
            "mensage": "Usuario eliminado",
            "usuario": param_id
        })
    }, () => {
        // no se encontró el registro o está eliminado
        res.status(200).json({
            "mensage": "Usuario no existe o está eliminado.",
            "usuario": null //param_id
        })
    }).catch(err => {
        res.status(200).json({
            "mensage": "No se pudo eliminar al usuario.",
            "error": err
        })
    })
}