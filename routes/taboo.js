var mongo = require('mongoskin');


exports.list = function(req, res, next) {
  req.db.taboo.find({}).toArray(function(error, list) {
    res.render('taboo_list', {'list': list || []});
  });
}

exports.toAdd = function(req, res, next) {
  res.render('taboo_add');
}

exports.save = function(req, res, next) {
  var data = req.body;
  data.createAt = new Date().getTime();
  data.items = data.items.split(/;|,/);
  req.db.taboo.insert(data, function(error, obj) {
    res.redirect('/taboos');
  });
}

exports.remove = function(req, res, next) {
  req.db.taboo.remove({_id: new mongo.ObjectID(req.query.id)}, function(error, result) {
    res.redirect('/taboos');
  });
}

exports.toEdit = function(req, res, next) {
  req.db.taboo.findOne({_id: new mongo.ObjectID(req.query.id)}, function(error, obj) {
    console.log(obj);
    res.render('taboo_edit', {'obj': obj || {}});
  });
}

exports.update = function(req, res, next) {
  var data = req.body;
  var id = new mongo.ObjectID(data.id)
  data.updateAt = new Date().getTime();
  data.items = data.items.split(/;|,/);

  console.log(data);
  delete data.id;
  req.db.taboo.update({'_id': id}, {$set: data}, function(error, obj) {
    res.redirect('/taboos');
  });

}



