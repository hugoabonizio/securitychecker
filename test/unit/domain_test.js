var expect = require('chai').expect;
var domain = require('../../lib/domain');

describe('Domain extractor', function () {
  it('should extract only root domains', function () {
    var urls = [
      'http://www.youtube.com/watch?v=ClkQA2Lb_iE',
      'https://www.youtube.com/watch?v=ClkQA2Lb_iE',
      'https://www.youtube.com:3000/watch?v=ClkQA2Lb_iE',
      'www.youtube.com/watch?v=ClkQA2Lb_iE',
      'www.youtube.com:1234/dir/file.txt'
    ];
    
    urls.forEach(function (url) {
      var extracted = domain(url);
      expect(extracted).to.equal('www.youtube.com');
    });
  });
  
  it('should parse with and without www', function () {
    var extracted = domain('youtube.com/watch?v=ClkQA2Lb_iE');
    expect(extracted).to.equal('youtube.com');
  });
  
  it('should fail with invalid domains', function () {
    expect(domain('sdfsdf.fdsjsoidf d er')).to.equal(false);
    expect(domain('hdsfhsf sdfs dfhsd fsu')).to.equal(false);
    expect(domain('')).to.equal(false);
    expect(domain(undefined)).to.equal(false);
  });
  
  it('should validate more complexes domains', function () {
    expect(domain('http://pandora-xxx.nitrousapp.com:3000/')).to.equal('pandora-xxx.nitrousapp.com');
  });
});