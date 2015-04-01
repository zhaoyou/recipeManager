exports.buildToken = function(username) {
  var a = new Date().getTime() + (1000 * 60 * 60 * 24);
  console.log('a', a);
  return username + '__' + a;
}

exports.decodeToken = function(str) {
  return {
    'username': str.split('__')[0],
    'outofTime': parseInt(str.split('__')[1])
  };
}
