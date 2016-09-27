var db = require('../../lib/database');
var sql = require('./sql/sql')

exports.getSources = function(callback) {
	db.query(sql.getNewsSources, function(sources) {
		callback(sources);
	});
}

exports.saveNews = function(news, callback) {
	db.query(sql.insertNews(news), function() {
		callback();
	});
}