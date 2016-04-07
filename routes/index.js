var express = require('express');
var router = express.Router();
var domain = require('../lib/domain');
var checker = require('../lib/checker');
var list = require('../lib/list');

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/check', function (req, res, next) {
  var check_domain = domain(req.query.domain);
  var locals;
  if (check_domain) {
    res.render('check', { domain: req.query.domain });
  } else {
    req.session.sessionFlash = {
      type: 'error',
      message: 'Invalid domain!'
    }
    res.redirect(301, '/');
  }
});

router.post('/check', function (req, res, next) {
  var url = req.body.url;
  var test_index = req.body.test;
  if (test_index in list) {
    var test_obj = list[test_index];
    var check_domain = domain(url);
    if (check_domain) {
      checker(test_index, url, function (err, results) {
        if (err) res.sendStatus(400);
        res.json({ description: test_obj.description, results: results });
      });
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
