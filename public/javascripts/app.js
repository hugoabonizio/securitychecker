var Check = (function () {
  var current = 0;
  var passed = 0;
  var stop = false;
  
  function ok(set, attr) {
    var result = true;
    set.forEach(function (i) {
      if (!i[attr]) result = false;
    });
    return result;
  }
  
  function render_result(passed, total) {
    var ratio = passed / total;
    var color, icon;
    if (ratio > .8) {
      color = 'green';
      icon = 'check';
    } else if (ratio > .65) {
      color = 'orange';
      icon = 'check';
    } else {
      color = 'red';
      icon = 'minus-square';
    }
    return '<span class="' + color + '">' + passed + '/' + total + '</span>'
         + ' <i class="fa fa-' + icon + ' ' + color + '"></i>';
  }
  
  return {
    run: function (url) {
      var self = this;
      this.fetch(url, current++, function (err, data) {
        if (!stop) {
          if (err) {
            stop = true;
            $('#status').html('Passed ' + render_result(passed, current - 1));
          } else {
            self.append(data.description, data.results);
            self.run(url);
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
        passed++;
      } else {
        icon = 'fa-minus-square';
        color = 'red';
      }
      var element = "<br><li><i class='fa-li fa " + icon + "' style='color:" + color + "'></i> " + description + "<br><br><em>Test:</em><pre>\n";
      results.forEach(function (result) {
        console.log(result);
        element += "\t$ " + result.command + "\n\t" + result.output + "\n";
      });
      element += "</pre></li>";
      document.getElementById('results').innerHTML += element;
    }
  };
})();

$(document).ready(function () {
  if (document.getElementById('status')) {
    Check.run($('#domain').text());
  }
});