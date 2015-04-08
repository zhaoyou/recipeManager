
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://localhost:27017/recipedb?auto_reconnect', {safe:true});
var http = require('http');
var path = require('path');
var recipe = require('./routes/recipe.js');
var taboo = require('./routes/taboo.js');
var api = require('./routes/api.js');

var app = express();

var server = http.createServer(app)

app.use(function(req, res, next) {
  req.db = {};
  req.db.recipe      = db.collection('recipe');
  req.db.taboo      = db.collection('taboo');
  next();
})

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
app.use(express.cookieParser('my secret here'));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var checkCode = function(req, res, next) {
  user.checkToken(req, res, next);
}

app.get('/', routes.index);


app.get('/recipes', recipe.list);
app.get('/recipe/add', recipe.toAdd);
app.post('/recipe/save', recipe.save);
app.get('/recipe/edit', recipe.toEdit);
app.post('/recipe/update', recipe.update);
app.get('/recipe/remove', recipe.remove);

app.get('/taboos', taboo.list);
app.get('/taboo/add', taboo.toAdd);
app.post('/taboo/save', taboo.save);
app.get('/taboo/edit', taboo.toEdit);
app.post('/taboo/update', taboo.update);
app.get('/taboo/remove', taboo.remove);

app.get('/api/recipes', api.recipes);
app.get('/api/taboos', api.taboos);



basicAuth = express.basicAuth('hadeser', '123')

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
