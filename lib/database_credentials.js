var config = require('./config');
var utilities = require('./utilities');

exports.details = function(env) {
	var systems = {
		'production' : {
			host : 'localhost',
			user : 'admingjrXzMd',
			password : 'AjiNLp8W9Vnr',
			database : 'nodejsnews',
			port : 3388
		},
		'local' : {
			host : 'localhost',
			user : 'root',
			password : '',
			database : 'news',
			port : 3306
		}		
	}
	return systems[env];
};