var db = require('../lib/database');

module.exports = {
  configure: function(app) {

    app.get('/carousal', function(req, res) {
      db.query('SELECT * FROM news LIMIT 5', function(data) {
        res.json(data);
      })
    });
    
    app.get('/categoryNews/:id', function(req, res) {
      db.query("SELECT * FROM news WHERE category_id = " + req.params.id + " ORDER BY created DESC", function(data) {
        res.json(data);
      });
    });

    app.get('/sources', function(req, res) {
      db.query('SELECT * FROM sources', function(data) {
        res.json(data);
      });
    });

    app.get('/sourceNews/:id', function(req, res) {
      db.query('SELECT * FROM news WHERE source_id = ' + req.params.id, function(data) {
        res.json(data)
      })
    });



  }
};