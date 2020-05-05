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