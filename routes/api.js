var mongo = require('mongoskin');

exports.recipes = function(req, res, next) {
  req.db.recipe.find({}).toArray(function(error, list) {
    res.send(list || []);
  });
}

exports.taboos = function(req, res, next) {
  req.db.taboo.find({}).toArray(function(error, list) {
    res.send(list || []);
  });
}


