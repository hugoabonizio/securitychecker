/**
 * TODO use dns module to validate
var dns = require('dns');
**/

module.exports = function extractDomain(url) {
  if (url) {
    var domain;
    if (url.indexOf("://") > -1) {
      domain = url.split('/')[2];
    } else {
      domain = url.split('/')[0];
    }
    domain = domain.split(':')[0];

    var pattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    if (pattern.test(domain)) {
      return domain;
    } else {
      return false;
    }
  } else {
    return false;
  }
};