/*
database: plantaexterna
username: p83h2pd43qlug1s4a12y
host: aws.connect.psdb.cloud
password: pscale_pw_OpCy21ejS1durmqkSdNupowfvaQUedzf8VZNspqTr74
*/

const env = {
  database: 'plantaexterna',
  username: 'p83h2pd43qlug1s4a12y',
  password: 'pscale_pw_OpCy21ejS1durmqkSdNupowfvaQUedzf8VZNspqTr74',
  host: 'aws.connect.psdb.cloud',
  dialect: 'mysql',
  timezone: "-07:00",
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};

const env2 = {
  database: 'WEGAinv',
  username: 'aLL',
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
