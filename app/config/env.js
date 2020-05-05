const env = {
  database: 'megainv',
  username: 'root',
  password: 'hormigaLL',
  host: 'localhost',
  dialect: 'mysql',
  timezone: "-06:00",
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};
 
module.exports = env;
