
module.exports = function (command, handler, cb) {
  var terminal = require('child_process').spawn('bash');
  var running = true;
  
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
    if (running) {
      running = false;
      cb(null, { result: result, command: command, output: output });
    }
  });
  
  terminal.on('close', function (code) {
    console.log('exit com', code);
    if (code == 1) {
      cb(null, { result: false, command: command, output: '' });
    }
  });
  
  terminal.stdin.write(command);
  terminal.stdin.end();
  setTimeout(function () {
//     if (running) {
//       running = false;
//       cb(true, null);
//     }
//     console.log('killing');
    if (running) {
//       console.log('running kill', running);
      running = false;
      terminal.kill('SIGHUP');
    }
  }, 2000);
};