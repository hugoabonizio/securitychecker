
module.exports = function (command, handler, cb) {
  var terminal = require('child_process').spawn('bash');
  
  terminal.stdout.on('data', function (data) {
    var output = data.toString().trim();
    var result;
    if (handler instanceof RegExp) {
      result = handler.test(output);
    } else if (typeof handler == "string") {
      result = (output == handler);
    } else if (typeof handler == "function") {
      result = handler(output);
    } else {
      result = false;
    }
    cb(null, { result: result, command: command, output: output });
  });
  
  terminal.stdin.write(command);
  terminal.stdin.end();
};