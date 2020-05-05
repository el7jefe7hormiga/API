const db = require('../config/db.config.js');
const Producto = db.producto;
const Op = db.Sequelize.Op;

//const { Datatypes } = require("sequelize")

/*
CONTROLADOR DE LOS PRODUCTOS
*/

// Mostrar lista de productos
exports.verProductos = (req, res) => {
    Producto.findAll({
    where: {
        eliminadoEl: null
    }}).then(productos => {
		res.status(200).json({
			"mensage":"Lista de productos",
			"productos": productos
		})
	}).catch(err => {
		res.status(200).json({
			"mensage": "No se pueden listar los productos.",
			"error": err
		});
	})
}

// Mostrar UN producto
exports.verProducto = (req, res) => {
    const param_id = req.params.id;
    User.findOne({
        where: {
            id: param_id,
            eliminadoEl: null
        }})
        .then( producto => {
            if (!producto) {
                return res.status(200).json({
                    "mensage": "producto no encontrado!",
                    "producto": null
                })
            }
            res.status(200).json({
                "mensage": "Mostrando al producto...",
                "producto": producto
            })
        }, () => {
            // no se encontró el registro o está eliminado
            res.status(200).json({
                "mensage": "Producto no existe o está eliminado.",
                "producto": null //param_id
            })
        }).catch(err => {
            res.status(200).json({
                "mensage": "No se puede mostrar el producto.",
                "error": err
            })
	    })
}

// Crear nuevo producto
exports.crearProducto = (req, res) => {
    // Save Producto to Database
    console.log("Procesando el registro del producto... -> crearProducto");

    Producto.create( req.body ).then(producto => {
        res.status(200).json({
            "mensage": "Producto creado",
            "producto": producto
        })
    }).catch(err => {
        res.status(200).json({
			"mensage": "Error al crear el producto",
			"error": err
		})
    })
}

// Modificar UN producto
exports.modificarProducto = (req, res) => {
	const param_id = req.params.id;
    Producto.update(req.body , {
        where: {
            id: param_id,
            eliminadoEl: null
        }
	}).then(producto => {
        res.status(200).json({
            "mensage": "Producto actualizado",
            "producto": producto,
        })
	}).catch(err => {
        res.status(200).json({
            "mensage": "No se pudo modificar el producto.",
            "error": err
        })
	})
}

// Eliminar un producto
// No se elimina 'fisicamente' de la tabla, se modifica el campo eliminadoEl = fecha de eliminacion
exports.eliminarProducto = (req, res) => {
    const param_id = req.params.id;
    Producto.update({
        eliminadoEl: Date.now()
    }, {
        where: { 
            id: param_id,
            eliminadoEl: null 
        }
    }).then(() => {
        console.log("Producto eliminado")
        res.status(200).json({
            "mensage": "Producto eliminado",
            "producto": param_id
        })
    }, () => {
        // no se encontró el registro o está eliminado
        res.status(200).json({
            "mensage": "Producto no existe o está eliminado.",
            "producto": null //param_id
        })
    }).catch(err => {
        res.status(200).json({
            "mensage": "No se pudo eliminar al producto.",
            "error": err
        })
    })
}

// Buscar UN producto
exports.buscarProducto = (req, res) => {
    const param_prod = req.params.prod;
    Producto.findAll({
        where: {
            producto: { [Op.like]: '%' + param_prod + '%' },
        }
    }).then(producto => {
        if (!producto) {
            return res.status(200).json({
                "mensage": "Producto no encontrado!",
                "producto": null
            })
        }
        res.status(200).json({
            "mensage": "Mostrando la producto...",
            "producto": producto
        })
    }, () => {
        // no se encontró el registro o está eliminado
        res.status(200).json({
            "mensage": "Producto no existe o está eliminado.",
            "producto": null // param_prod
        })
    }).catch(err => {
        res.status(200).json({
            "mensage": "No se puede mostrar la producto.",
            "error": err
        })
    })
}