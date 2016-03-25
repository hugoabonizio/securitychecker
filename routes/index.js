var express = require('express');
var router = express.Router();
var domain = require('../lib/domain');

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

module.exports = router;
