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
        esHijoDe: {
            type: Sequelize.STRING(6)
        }
    },
    // opciones:
    {
        timestamps: true,
        // don't delete database entries but set the newly added attribute deletedAt
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled
        paranoid: true
    });

    return Categoria;
}
/*
ESTRUCTIRA:
--------------
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Llave pimaria. Id unico.',
  `codigo` varchar(20) DEFAULT NULL COMMENT 'Codigo de la categoria alfanumerico (letras y numeros).',
  `categoria` varchar(50) DEFAULT NULL COMMENT 'Nombre de la categoria.',
  `esHijoDe` varchar(20) DEFAULT NULL COMMENT 'Codigo de la categoria Padre. Si es NULL es padre.',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Creado el...',
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp() COMMENT 'Actualizado el...',
  `deleted_at` datetime DEFAULT NULL COMMENT 'Eliminado el...',
  PRIMARY KEY (`id`)
)


DATOS:
--------------
 INSERT INTO WEGAinv.categorias (codigo,categoria,esHijoDe) VALUES
     ('10','Bebidas',NULL),
     ('1001','Bebidas 15%','10'),
     ('1003','Bebidas 0%','10'),
     ('20','Snack',NULL),
     ('2001','Bimbo','20'),
     ('2002','Sabritas','20'),
     ('2003','Dulces','20'),
     ('2004','Nevería','20'),
     ('2005','Snack','20'),
     ('2006','Medicamentos','20'),
     ('30','Papelería',NULL),
     ('3001','Papelería','30'),
     ('40','Servicios',NULL),
     ('4001','Servicio','40'),
     ('4002','Copias','40'),
     ('4003','Soporte Tecnico','40'),
     ('50','Impresiones',NULL),
     ('5001','Impresiones a Color','50'),
     ('5002','Impresiones en Negro','50'),
     ('60','Accesorios Y Equipo',NULL),
     ('6001','Accs Y Eqs','60'),
     ('6002','Accs y Eqs Soporte','60');
*/