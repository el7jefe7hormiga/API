module.exports = (sequelize, Sequelize) => {
	const Producto = sequelize.define('productos', {
    codigo: {
        type: Sequelize.STRING(6), 
        allowNull: false, 
        comment: 'Codigo de barras',
        primaryKey: true,
    },
    codigo_mega: {
        type: Sequelize.STRING(4), 
        allowNull: false, 
        comment:  'Codigo corto de hasta 4 digitos',
        unique: true,
    },
    codigo_cat: {
        type: Sequelize.STRING(6), 
        allowNull: false
    },
    precio_de_venta: {
        type: Sequelize.DECIMAL(30, 2),
        defaultValue: null,
    },
    precio_de_compra: {
        type: Sequelize.DECIMAL(30, 2),
        defaultValue: null,
    },
    existe_min: {
        type: Sequelize.INTEGER,
        defaultValue: null,
    },
    producto: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    existe_actual: {
        type: Sequelize.INTEGER,
        defaultValue: null,
    },
    inventariable: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        comment:  'Se contabiliza en el inventario ?',
    }, 
    IVA: {
        type: Sequelize.DECIMAL(10, 4),
        defaultValue: null,
    },
    IEPS: {
        type: Sequelize.DECIMAL(10, 4),
        defaultValue: null,
    },
    estado: {
        type: Sequelize.STRING(10),
        defaultValue: null,
    },
    f_ultimacompra: {
        type: Sequelize.DATE(6),
        defaultValue: null, 
        comment:  'Fecha de la ultima compra',
    },
    c_ultimacompra: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: null, 
        comment:  'Cantidad de la ultima compra',
    },
    IdGpoFac: {
        type: Sequelize.INTEGER,
        defaultValue: null,
    },
    descmax: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: null, 
        comment:  'Porcentaje de descuento maximo aplicable'
    },
    eliminadoEl: {
        type: Sequelize.DATE(6),
        defaultValue: null
    },
    
	/*}, {
			// don't delete database entries but set the newly added attribute deletedAt
			// to the current date (when deletion was done). paranoid will only work if
			// timestamps are enabled
			paranoid: true,
			// And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
			deletedAt: 'destroyTime'  */
	});
	
	return Producto;
}
/*
ALTER TABLE `tproductos`
  ADD PRIMARY KEY (`codigo`),
  ADD UNIQUE KEY `codigo mega` (`codigo_mega`),
  ADD KEY `codigo_cat` (`codigo_cat`);
*/


/* 
SHOW CREATE TABLE tProdutos

CREATE TABLE `tproductos` (
 `codigo` varchar(30) COLLATE utf8_spanish_ci NOT NULL COMMENT 'Codigo de barras',
 `codigo_mega` varchar(4) COLLATE utf8_spanish_ci NOT NULL COMMENT 'Codigo corto de hasta 4 digitos',
 `codigo_cat` varchar(6) COLLATE utf8_spanish_ci NOT NULL,
 `precio_de_venta` decimal(30,2) DEFAULT NULL,
 `precio_de_compra` decimal(30,2) DEFAULT NULL,
 `existe_min` int(10) DEFAULT NULL,
 `producto` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
 `existe_actual` int(10) DEFAULT NULL,
 `inventariable` tinyint(1) NOT NULL COMMENT 'Se contabiliza en el inventario ?',
 `IVA` decimal(10,4) DEFAULT NULL,
 `IEPS` decimal(10,4) DEFAULT NULL,
 `estado` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL,
 `f_ultimacompra` datetime DEFAULT NULL COMMENT 'Fecha de la ultima compra',
 `c_ultimacompra` decimal(10,2) DEFAULT NULL COMMENT 'Cantidad de la ultima compra',
 `IdGpoFac` int(10) DEFAULT NULL,
 `descmax` decimal(10,2) DEFAULT NULL COMMENT 'Porcentaje de descuento maximo aplicable',
 PRIMARY KEY (`codigo`),
 UNIQUE KEY `codigo mega` (`codigo_mega`),
 KEY `codigo_cat` (`codigo_cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci


SHOW CREATE TABLE productos
CREATE TABLE `productos` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `codigo` varchar(6) COLLATE utf8_spanish_ci NOT NULL,
 `codigo_mega` varchar(4) COLLATE utf8_spanish_ci NOT NULL,
 `codigo_cat` varchar(6) COLLATE utf8_spanish_ci NOT NULL,
 `precio_de_venta` decimal(30,2) DEFAULT NULL,
 `precio_de_compra` decimal(30,2) DEFAULT NULL,
 `existe_min` int(11) DEFAULT NULL,
 `producto` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
 `existe_actual` int(11) DEFAULT NULL,
 `inventariable` int(11) NOT NULL,
 `IVA` decimal(10,4) DEFAULT NULL,
 `IEPS` decimal(10,4) DEFAULT NULL,
 `estado` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL,
 `f_ultimacompra` datetime(6) DEFAULT NULL,
 `c_ultimacompra` decimal(10,2) DEFAULT NULL,
 `IdGpoFac` int(11) DEFAULT NULL,
 `descmax` decimal(10,2) DEFAULT NULL,
 `eliminadoEl` datetime(6) DEFAULT NULL,
 `createdAt` datetime NOT NULL,
 `updatedAt` datetime NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `codigo_mega` (`codigo_mega`),
 UNIQUE KEY `codigo` (`codigo`) USING BTREE,
 KEY `codigo_cat` (`codigo_cat`),
 CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`codigo_cat`) REFERENCES `categorias` (`codigo`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci

*/