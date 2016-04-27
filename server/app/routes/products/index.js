'use strict';
var router = require('express').Router();

var mongoose = require('mongoose');
var Product = mongoose.model('Product');


router.get('/', function(req, res, next){
	Product.find({})
	.populate('category')
	.then(function(products){
		res.json(products);
	})
	.then(null, next);
});

router.get('/:id', function(req, res, next){
	Product.findOne({_id: req.params.id})
	.populate('category')
	.then(function(product){
		res.json(product);
	})
	.then(null, next);
});


module.exports = router;
