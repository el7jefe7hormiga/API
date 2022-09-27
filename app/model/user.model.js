module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('usuarios', {
	  nombre: {
		  type: Sequelize.STRING
	  },
	  username: {
		  type: Sequelize.STRING
	  },
	  email: {
		  type: Sequelize.STRING
	  },
	  password: {
		  type: Sequelize.STRING
	  }
	}, {
		timestamps: true,
		// don't delete database entries but set the newly added attribute deletedAt
		// to the current date (when deletion was done). paranoid will only work if
		// timestamps are enabled
		paranoid: true,			
	});
	
	return User;
}

/* 

{
	"nombre": "Aarón López",
	"username": "aLL",
	"email": "all@mail.com",
	"roles": ["admin"],
	"password": "jefe77"
}
{
	"nombre": "Yoly Langarica",
	"username": "yoly",
	"email": "yoly@mail.com",
	"roles": ["supervisor"],
	"password": "jefa77"
}
{
	"nombre": "Sidney López",
	"username": "pininane",
	"email": "sidney@mail.com",
	"roles": ["cajero"],
	"password": "jefita01"
}
{
	"nombre": "Kahel López",
	"username": "kahel",
	"email": "kahel@mail.com",
	"roles": ["cajero"],
	"password": "jefito17"
}
{
	"nombre": "Lenny López",
	"username": "kenai",
	"email": "kenai@mail.com",
	"roles": ["cajero"],
	"password": "jefito08"
}



*/