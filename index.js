var Bluebird = require('bluebird'),
  Fauxbird = require('./src/fauxbird'),
  request = require('request');

function sendMessage(config, message, callback) {
  // Determine if we're using a callback or a promise
  var Promise = (callback && typeof callback === 'function') ? new Fauxbird(callback) : Bluebird;
  return new Promise(function(fulfill, reject) {
    // Allow just  string message or an object
    var payload = typeof message === 'object' ? message : {
      'text': message,
      'icon_emoji': ':arrowhead:'
    };

    // Assign defaults where values are required
    for (var field in config.defaults) {
      payload[field] = (payload[field] || payload[field] === 0) ? payload[field] : config.defaults[field];
    }

    // Send the request to slack
    request.post({
      url: config.connection.url.replace('{{token}}', config.connection.token),
      form: JSON.stringify(payload)
    }, function(e, r, body) {
      if (e) {
        reject(e);
      } else {
        fulfill(body);
      }
    });
  });
}

module.exports = function SlackApi(config) {
  config = config || require('./config');
  return function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(config);
    return sendMessage.apply(this, args);
  };
};
