'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

router.get('/', function(req, res, next){
	Product.find({})
	.then(function(products){
		res.json(products);
	})
	.then(null, next);
});

router.get('/:id', function(req, res, next){
	Product.find({_id: req.params.id})
	.then(function(product){
		res.json(product);
	})
	.then(null, next);
});


module.exports = router;