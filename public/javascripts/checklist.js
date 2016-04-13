var Checklist = (function () {
  var current = 0;
  var stop = false;
  
  function ok(set, attr) {
    var result = true;
    set.forEach(function (i) {
      if (!i[attr]) result = false;
    });
    return result;
  }
  
  return {
    run: function (url) {
      var self = this;
      this.fetch(url, current++, function (err, data) {
        if (!stop) {
          if (err) {
            stop = true;
            document.body.innerHTML += '<h1>FIM</h1>';
          } else {
            self.append(data.description, data.results);
            Checklist.run(url);
          }
        }
      });
    },
    fetch: function (url, i, callback) {
      $
        .post('/check', { url: url, test: i })
        .done(function (results) { callback(null, results); })
        .fail(function (err) { callback(err.status, null); });
    },
    append: function (description, results) {
      var icon, color;
      if (ok(results, 'result')) {
        icon = 'fa-check-square';
        color = 'green';
      } else {
        icon = 'fa-minus-square';
        color = 'red';
      }
      var element = "<br><li><i class='fa-li fa " + icon + "' style='color:" + color + "'></i> " + description + "<br><br><em>Test:</em><pre>\n";
      results.forEach(function (result) {
        element += "\n$ " + result.command + "\n" + result.output;
      });
      element += "\n</pre></li>";
      document.getElementById('results').innerHTML += element;
    }
  };
})();

$(document).ready(function () {
  if (document.getElementById('checking')) {
    Checklist.run($('#domain').text());
  }
});