var Checklist = (function () {
  var current = 0;
  var stop = false;
  
  return {
    run: function (url) {
      console.log(stop);
      
      this.fetch(url, current++, function (err, results) {
        if (!stop) {
          if (err) {
            stop = true;
            document.body.innerHTML += '<h1>CARAI</h1>';
          } else {
            results.forEach(function (result) {
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
        .fail(function () { console.log('deu merda no ' + i); callback(true, null); });
    }
  };
})();

$(document).ready(function () {
  if (document.getElementById('checking')) {
    Checklist.run('www.youtube.com');
  }
});