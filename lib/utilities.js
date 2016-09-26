var db = require('../lib/database');

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