var Checklist = (function () {
  var current = 0;
  var stop = false;
  
  return {
    run: function (url) {
      
      this.fetch(url, current++, function (err, data) {
        if (!stop) {
          if (err) {
            stop = true;
            document.body.innerHTML += '<h1>FIM</h1>';
          } else {
            data.results.forEach(function (result) {
              document.body.innerHTML += '<h2>' + result.output + '</h2>';
            });
            Checklist.run(url);
          }
        }
      });
    },
    
    fetch: function (url, i, callback) {
      $
        .post('/check', { url: url, test: i })
        .done(function (results) { callback(null, results); })
        .fail(function (err) { console.log(err.status); callback(err.status, null); });
    }
  };
})();

$(document).ready(function () {
  if (document.getElementById('checking')) {
    Checklist.run('www.youtube.com');
  }
});