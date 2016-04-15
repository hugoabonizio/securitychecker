var expect = require('chai').expect;
var list = require('../../lib/list');
var tester = require('../../lib/tester');

describe('List', function () {
  list.forEach(function (test) {
    describe(test.description, function () {
      test.tests.forEach(function (t) {
        it('should pass valid output', function () {
          expect(tester(t.expect, t.handler)).to.equal(true);
        });

        it('should fail invalid output', function () {
          expect(tester('', t.handler)).to.equal(false);
        });
      });
    });
  });
//   describe('Is the website only served over https?', function () {
//     it('should pass valid output', function () {
//       var test = list[0];
//       expect(tester(test.tests[0].expected, test.tests[0].handler)).to.truthy;
//     });
    
//     it('should fail invalid output', function () {
//       var test = list[0];
//       expect(tester('', test.tests[0].handler)).to.falsy;
//     });
//   });
});