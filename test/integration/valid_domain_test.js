var request = require('supertest');
var http = require('http');


describe('Domain validation', function () {
  var server;
  before(function () {
    var app = require('../../app');
    app.set('port', 4567);
    server = http.createServer(app);
    server.listen(4567);
  });
  
  it('should redirect when invalid', function (done) {
    request(server).get('/check?domain=').expect(301, done);
  });
});