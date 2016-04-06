var express = require('express');
var router = express.Router();
var domain = require('../lib/domain');
var checker = require('../lib/checker');

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
  var check_domain = domain(url);
  if (check_domain) {
    
    checker(test_index, url, function (err, results) {
      if (err) res.status(401).send(err).end();
      res.json(results);
    });
  } else {
    res.status(400).end();
  }
});

module.exports = router;
