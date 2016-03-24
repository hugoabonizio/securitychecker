var expect = require('chai').expect;
var domain = require('../../lib/domain');

describe('Domain extractor', function () {
  it('should extract only root domains', function () {
    var urls = [
      'http://www.youtube.com/watch?v=ClkQA2Lb_iE',
      'https://www.youtube.com/watch?v=ClkQA2Lb_iE',
      'www.youtube.com/watch?v=ClkQA2Lb_iE',
      'www.youtube.com:1234/dir/file.txt'
    ];
    
    urls.forEach(function (url) {
      var extracted = domain(url);
      expect(extracted).to.equal('www.youtube.com');
    });
  });
  
  it('should ignore parse with and without www', function () {
    var extracted = domain('youtube.com/watch?v=ClkQA2Lb_iE');
    expect(extracted).to.equal('youtube.com');
  });
  
  it('should fail with invalid domains', function () {
    var extracted = domain('sdfsdf.fdsjsoidf d er');
    console.log(extracted);
    expect(extracted).to.equal(false);
  });
});