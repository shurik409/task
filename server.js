const data = require('./src/persons.json')


var express = require('express');
var app = express();
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});
app.listen(8080);
