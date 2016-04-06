var list = require('./list'),
    execute = require('./execute'),
    util = require('util'),
    async = require('async');

module.exports = function (i, domain, cb) {
  if (i in list) {
    var test = list[i];
    
    var tests = [];
    test.tests.forEach(function (t) {
      var command = util.format(t.command, domain);
      tests.push(function (callback) {
        execute(command, test.handler, callback);
      });
    });
    
    async.series(tests, cb);
  } else {
    cb(true, null);
  }
};


// var url = 'www.youtube.com';

// list.forEach(function (item) {
//   var tests = item.tests;
//   tests.forEach(function (test) {
//     var command = util.format(test.command, url);
//     execute(command, test.expect, function (result) {
//       console.log(command + " = " + result);
//     });
//   });
// });