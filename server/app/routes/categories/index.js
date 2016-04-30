'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Product = mongoose.model('Product');


router.get('/', function(req, res, next){
	Category.find({})
	.then(function(categories){
		res.json(categories);
	}, next);
});

//hmm.... doesn't feel restful...
//should this be nested inside of products-- because the resource being returned is products not categories...
// maybe /products/byCategory/:name ? would be a better route
router.get('/:name', function(req, res, next){

	Product.getByCategory(req.params.name)
	.then(function(products){

		res.json(products);

	});

});


module.exports = router;
