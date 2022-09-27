const { json } = require('sequelize');
const db = require('../config/db.config.js');
const Categoria = db.categoria;
const Op = db.Sequelize.Op;

//const { Datatypes } = require("sequelize")

/*
CONTROLADOR DE LOS CATEGORIAS
*/

// Mostrar lista de categorias
exports.verCategorias = (req, res) => {
 
    const param = Object.keys(req.query).length==0 ? "codigo" :  req.query._sort.split(' ')

    Categoria.findAll(
        { order: [ param ] },
        { where: { eliminadoEl: null } }
    ).then(categorias => {
        res.status(200).json({
            "mensage": "Lista de categorias",
             "orden": param,
            "categorias": categorias
        })
    }).catch(err => {
        console.error("ALGO PASO AL OBTENER LAS CATEGORIAS!!");
        res.status(200).json({
            "mensage": "No se pueden listar las categorias.",
            "error": err
        });
    })
}

// Mostrar UNA categoria
exports.verCategoria = (req, res) => {
    const param_id = req.params.id;
    Categoria.findOne({
        where: {
            codigo: param_id,
            //eliminadoEl: null
        }
    })
        .then(categoria => {
            if (!categoria) {
                return res.status(200).json({
                    "mensage": "categoria no encontrada!",
                    "categoria": null
                })
            }
            res.status(200).json({
                "mensage": "Mostrando la categoria...",
                "categoria": categoria
            })
        }, () => {
            // no se encontró el registro o está eliminado
            res.status(200).json({
                "mensage": "Categoria no existe o está eliminado.",
                "categoria": null //param_id
            })
        }).catch(err => {
            res.status(200).json({
                "mensage": "No se puede mostrar la categoria.",
                "error": err
            })
        })
}

// Crear nuevo categoria
exports.crearCategoria = (req, res) => {
    // Save Categoria to Database
    console.log("Procesando el registro de la categoria... -> crearCategoria");
    console.log(req.body);

    Categoria.create(req.body).then(categoria => {
        res.status(200).json({
            "mensage": "Categoria creada",
            "categoria": categoria
        })
    }).catch(err => {
        res.status(200).json({
            "mensage": "Error al crear la categoria",
            "error": err
        })
    })
}

// Modificar UN categoria
exports.modificarCategoria = (req, res) => {
    const param_id = req.params.id;
    Categoria.update(req.body, {
        where: {
            codigo: param_id,
            eliminadoEl: null
        }
    }).then(categoria => {
        res.status(200).json({
            "mensage": "Categoria actualizada",
            "categoria": categoria,
        })
    }).catch(err => {
        res.status(200).json({
            "mensage": "No se pudo modificar la categoria.",
            "error": err
        })
    })
}

// Eliminar un categoria
// No se elimina 'fisicamente' de la tabla, se modifica el campo eliminadoEl = fecha de eliminacion
exports.eliminarCategoria = (req, res) => {
    const param_id = req.params.id;
    Categoria.update({
        eliminadoEl: Date.now()
    }, {
        where: {
            codigo: param_id,
            eliminadoEl: null
        }
    }).then(() => {
        console.log("Categoria eliminada")
        res.status(200).json({
            "mensage": "Categoria eliminada",
            "categoria": param_id
        })
    }, () => {
        // no se encontró el registro o está eliminado
        res.status(200).json({
            "mensage": "Categoria no existe o está eliminada.",
            "categoria": null //param_id
        })
    }).catch(err => {
        res.status(200).json({
            "mensage": "No se pudo eliminar a la categoria.",
            "error": err
        })
    })
}

// Buscar UNA categoria
exports.buscarCategoria = (req, res) => {
    const param_cat = req.params.cat;
    Categoria.findAll({
        where: {
            categoria: { [Op.like]: '%'+param_cat+'%' },
        }
    }).then(categoria => {
        if (!categoria) {
            return res.status(200).json({
                "mensage": "Categoria no encontrada!",
                "categoria": null
            })
        }
        res.status(200).json({
            "mensage": "Mostrando la categoria...",
            "categoria": categoria
        })
    }, () => {
        // no se encontró el registro o está eliminado
        res.status(200).json({
            "mensage": "Categoria no existe o está eliminado.",
            "categoria": null //param_cat
        })
    }).catch(err => {
        res.status(200).json({
            "mensage": "No se puede mostrar la categoria.",
            "error": err
        })
    })
}

// Mostrar las categorias Padres
exports.Padres = (req, res) => {    
    Categoria.findAll(
        {
            attributes: ['categoria'],
            where: { EsPadre: "1" },
            order: ['categoria']
        }
    ).then(padres => {            
        res.status(200).json({
            "mensage": "....Mostrando las categorias padres...",
            "padres": padres
        })
    }).catch(err => {
        res.status(200).json({
            "mensage": "No se pueden mostrar las categorias padres.",
            "error": err
        })
    })
}

// Mostrar las categorias Hijos de...
exports.HijosDe = (req, res) => {    
    codigoPadre = req.params.padre
    Categoria.findAll(
        {
            attributes: ['codigo','categoria','icon','imagen','eliminadoEl'],
            where: { EsHijoDe: codigoPadre },
            order: ['categoria']
        }
    ).then(padres => {            
        res.status(200).json({
            "mensage": "....Mostrando las categorias hijas de " & codigoPadre,
            "padres": padres
        })
    }).catch(err => {
        res.status(200).json({
            "mensage": "No se pueden mostrar las categorias hijas de " & codigoPadre,
            "error": err
        })
    })
}