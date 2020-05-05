module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define('categorias', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        codigo: {
            type: Sequelize.STRING(6),
            allowsNull: false,
            unique: true,
            //primaryKey: true
        },
        categoria: {
            type: Sequelize.STRING(50),
            allowsNull: false
        },
        EsPadre: {
            type: Sequelize.STRING(1)
        },
        EsHijoDe: {
            type: Sequelize.STRING(6)
        },
        eliminadoEl: {
            type: Sequelize.DATE(6),
            defaultValue: null
        },
    });

    return Categoria;
}

/*
    `Id` int(10) NOT NULL,
    `codigo` varchar(6) COLLATE utf8_spanish_ci NOT NULL,
    `categoria` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
    `EsPadre` varchar(1) COLLATE utf8_spanish_ci DEFAULT NULL,
    `EsHijoDe` varchar(6) COLLATE utf8_spanish_ci DEFAULT NULL
*/