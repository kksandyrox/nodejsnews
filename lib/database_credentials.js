var config = require('./config');
var utilities = require('./utilities');

exports.details = function(env) {
	var systems = {
		'production' : {
			host : process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
			user : 'admingjrXzMd',
			password : 'AjiNLp8W9Vnr',
			database : 'nodejsnews',
			port : process.env.OPENSHIFT_MYSQL_DB_PORT || 3306
		},
		'local' : {
			host : 'localhost',
			user : 'root',
			password : 'root',
			database : 'news',
			port : 3306
		}		
	}
	return systems[env];
};


// if(utilities.getEnvironment())

// exports.details = {
// 	host     : process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
//   	user     : 'admingjrXzMd',
//   	password : 'AjiNLp8W9Vnr',
//   	database : 'nodejsnews',
//   	port: process.env.OPENSHIFT_MYSQL_DB_PORT || 3306
// };
