'use strict';
var router = require('express').Router();
module.exports = router;

var GITHUB_URL = 'https://github.com/joeldarling/stackstore';

router.get('/', function(req, res, next){

  res.redirect(GITHUB_URL);

});
