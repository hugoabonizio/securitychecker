var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/check', function (req, res, next) {
  res.render('check', { domain: req.param('domain') });
});

module.exports = router;
