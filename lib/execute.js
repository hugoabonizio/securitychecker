var tester = require('./tester');

function escapeHTML(string) {
  return string
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
}

module.exports = function (command, handler, cb) {
  var terminal = require('child_process').spawn('bash');
  var running = true;
  var stderr = '';

  terminal.stdout.on('data', function (data) {
    var output = data.toString().trim().substr(0, 140).trim();
    var result = tester(output, handler);
    
    if (running) {
      running = false;
      cb(null, { result: result, command: command, output: escapeHTML(output) });
    }
  });
  
  terminal.stderr.on('data', function (data) { stderr += data.toString().trim() });
  
  terminal.on('close', function (code) {
    console.log('exit com', code);
    if (code) {
      cb(null, { result: false, command: command, output: stderr });
    }
  });
  
  terminal.stdin.write(command);
  terminal.stdin.end();
  setTimeout(function () {
    if (running) {
      running = false;
      terminal.kill('SIGHUP');
    }
  }, 2000);
};