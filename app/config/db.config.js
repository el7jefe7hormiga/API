const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  timezone: env.timezone,
  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  },
  charset: 'utf8',
  collate: 'utf8_spanish_ci',
  dialectOptions: {
    //useUTC: false, //for reading from database  <-- marcó un warning!
    dateStrings: true,
    typeCast: true
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.role = require('../model/role.model.js')(sequelize, Sequelize);
db.role.belongsToMany(db.user, { through: 'usuario_roles', foreignKey: 'roleId', otherKey: 'usuarioId'});
db.user.belongsToMany(db.role, { through: 'usuario_roles', foreignKey: 'usuarioId', otherKey: 'roleId'});
// relacion Many-to-Many  user<+---+>role
// un user puede tener muchos roles, y viceversa: un rol puede estar en varios user's
// al crear las relaciones, me generan otra tabla:  [ usuario_roles ]


db.producto = require('../model/producto.model.js')(sequelize, Sequelize);
db.categoria = require('../model/categoria.model.js')(sequelize, Sequelize);
// One-To-Many associations (hasMany)
db.producto.belongsTo(db.categoria, { foreignKey: 'codigo_categoria', targetKey: 'codigo' });
db.categoria.hasMany(db.producto, { foreignKey: 'codigo_categoria', sourceKey: 'codigo' });
/* 
RELACIONES: Un producto solo tiene una categoria
y una categoria puede pertenecer a varios productos
CATEGORIA [1 -> n] PRODUCTOS
*/

module.exports = db;