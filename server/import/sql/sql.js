var _ = require('underscore');
var db = require('../../../lib/database');

exports.getNewsSources = "SELECT id, code, category_id FROM sources LIMIT 10"; 

exports.insertNews = function(news) {
	news_rows = _.map(news, exports.news_sql_rows);
	news_values = "(" + news_rows.join(',NOW(), NOW()\), \(') + ", NOW(), NOW())";
	return [
		'INSERT INTO news (source_id, sort_id, category_id, author, title, ',
		'description, url, url_to_image, published_at, created, modified)',
		'VALUES ',
		news_values
	].join(' \n');
}

exports.news_sql_rows = function(eachNews) {
	return [
		db.escape(eachNews.sourceId),
		db.escape(eachNews.sort),
		db.escape(eachNews.category_id),
		db.escape(eachNews.author),
		db.escape(eachNews.title),
		db.escape(eachNews.description),
		db.escape(eachNews.url),
		db.escape(eachNews.urlToImage),
		db.escape(eachNews.publishedAt)
	].join(', ');
}