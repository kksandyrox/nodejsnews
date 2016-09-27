'use strict'

var mysql = require('mysql');
var credentials = require('./database_credentials');
var util = require('./utilities');
var connection = mysql.createConnection(credentials.details(util.getEnvironment()));

exports.query = function(query, callback) {
	console.log(query)
	connection.query(query, function(error, rows) {
		if(error) {
			console.log(error);
		}
		else {
			callback(util.json(rows));
		}
	})
}

exports.escape = function (query) {
    return connection.escape(query);
};

exports.closeConnection = function(callback) {
	connection.end(callback);
};