var db = require('../lib/database');
var config = require('./config')
var os = require('os');

exports.json = function(data) {
	data = JSON.stringify(data);
	data = JSON.parse(data);
	return data;
}

exports.sorts = function(sort) {
	var selectSortId = {
		"top" : 1,
		"latest" : 2,
		"popular" : 3
	};

	return selectSortId[sort];
}

exports.getEnvironment = function() {
	switch (os.hostname()) {
		case config.hostNames.production :
			return 'production';
		default :
			return 'local';
	}
}