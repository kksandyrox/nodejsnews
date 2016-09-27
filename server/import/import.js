var db = require('../../lib/database');
var util = require('../../lib/utilities');
var https = require('https');
var async = require('async');
var _ = require('underscore');
var News = require('./news');
var os = require('os');


function requestNews(params, callback) {
	var url = 'https://newsapi.org/v1/articles?source=' + params.source.code +
			  '&sortBy='+params.sortBy+'&apiKey=06c06c246f594c5180f228d0e7e84095';

	function insertRequiredFields(articles, params) {
		async.each(articles, function(article, callback) {
			article.sort = util.sorts(params.sortBy);
			article.sourceId = params.source.id;
			article.category_id = params.source.category_id;
			callback();
		})
	}

	function accumulateData(data) {
		data = JSON.parse(data);
		if(data.status === 'ok') {
			insertRequiredFields(data.articles, params);
			params.news.push(data.articles);
		}
		callback(params.news);
	}

	https.get(url, function(res) {
			res.setEncoding('utf8');
			res.on('data', function(d) {
				accumulateData(d);
			})
		}
	);
}

function importNews() {
	News.getSources(function(sources) {
		async.each(sources, function(source, callback) {
			var params = {
				sortBy: 'latest',
				source: source,
				news: []
			};

			requestNews(params, gotLatestNews);

			function gotLatestNews(latestNews) {
				params.sortBy =  'top';
				requestNews(params, gotTopNews);
			}

			function gotTopNews(topNews) {
				params.sortBy = 'popular';
				requestNews(params, gotPopularNews);
			}

			function gotPopularNews(poplularNews) {
				News.saveNews(_.flatten(poplularNews), callback);
			}
		}, function(err) {
			if(err) {
				console.log('Error while importing ' + err);
			}
			else {
				console.log('Importing finished successfully');
				db.closeConnection();
			}
		});
	});
}

// importNews();


console.log(os.hostname())