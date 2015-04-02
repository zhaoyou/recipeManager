var mongo = require('mongoskin');

exports.getCourse = function(req, res, next) {
  req.db.course.findOne({}, function(err, result){
    if (err) { next(err); return;}
    //req.db.lesson.find({course_id: result._id.toString()}).toArray(function(error, list){
    //  if (error) {next(err);return};
      res.render('course', {'course': result});
    //});
  });
}

exports.list = function(req, res, next) {
  req.db.recipe.find({}).toArray(function(error, list) {
    res.render('recipe_list', {'list': list || []});
  });
}

exports.toAdd = function(req, res, next) {
  res.render('recipe_add');
}

exports.save = function(req, res, next) {
  var data = req.body;
  data.createAt = new Date().getTime();
  req.db.recipe.insert(data, function(error, obj) {
    res.redirect('/recipes');
  });
}

exports.remove = function(req, res, next) {
  req.db.recipe.remove({_id: new mongo.ObjectID(req.query.id)}, function(error, result) {
    res.redirect('/recipes');
  });
}

exports.toEdit = function(req, res, next) {
  req.db.recipe.findOne({_id: new mongo.ObjectID(req.query.id)}, function(error, obj) {
    console.log(obj);
    res.render('recipe_edit', {'obj': obj || {}});
  });
}

exports.update = function(req, res, next) {
  var data = req.body;
  var id = new mongo.ObjectID(data.id)
  data.updateAt = new Date().getTime();

  console.log(data);
  delete data.id;
  req.db.recipe.update({'_id': id}, {$set: data}, function(error, obj) {
    res.redirect('/recipes');
  });

}



