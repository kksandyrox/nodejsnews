var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./lib/database');
var cors = require('cors');
var server = require('http').createServer(app)

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080  
, ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

server.listen(port, ip);

app.use(express.static(__dirname + '/client'));  


app.get('/categoryNews/:id', function(req, res) {
    db.query("SELECT * FROM news WHERE category_id = " + req.params.id, function(data) {
        res.json(data);
    });
})