// check out https://github.com/visionmedia/node-pwd

/**
 * Module dependencies.
 */

var crypto = require('crypto');
/**
 * Bytesize.
 */

var len = 128;

/**
 * Iterations. ~300ms
 */

var iterations = 12000;

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {String} password to hash
 * @param {String} optional salt
 * @param {Function} callback
 * @api public
 */
exports.hash = function (pwd, salt, fn) {
  if (3 == arguments.length) {
    crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
      fn(err, (new Buffer(hash, 'binary')).toString('base64'));
    });
  } else {
    fn = salt;
    crypto.randomBytes(len, function(err, salt){
      if (err) return fn(err);
      salt = salt.toString('base64');
      crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
        if (err) return fn(err);
        fn(null, salt, (new Buffer(hash, 'binary')).toString('base64'));
      });
    });
  }
};

var key = 'salt_from_the_user_document'

exports.cipher = function(plaintext) {
  var cipher = crypto.createCipher('aes-256-cbc', key)
  var encryptedPassword = cipher.update(plaintext, 'utf8', 'base64');
  encryptedPassword = encryptedPassword + cipher.final('base64');
  return encryptedPassword.replace(new RegExp('\\+', 'g'), '_');
}

exports.decipher = function(token) {
  var decipher = crypto.createDecipher('aes-256-cbc', key);
  var decryptedPassword = decipher.update(token.replace(new RegExp('_', 'g'), '+'), 'base64', 'utf8');
  decryptedPassword = decryptedPassword + decipher.final('utf8');
  return decryptedPassword;
}

