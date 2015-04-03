module.exports = function(callback) {
  return function(f) {
    f(function(res) {
        callback(null, res);
      },
      function(err) {
        callback(err);
      }
    );
  };
};

