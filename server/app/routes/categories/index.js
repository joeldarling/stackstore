'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Product = mongoose.model('Product')


router.get('/', function(req, res, next){
	Category.find({})
	.then(function(categories){
		res.json(categories);
	}, next);
});

router.post('/', function(req, res, next){
	var newCategory = new Category({name: req.body.name});
	newCategory.save()
	.then(function(response){
		res.send(response);
	}, next);
});

router.get('/:name', function(req, res, next){

	Product.getByCategory(req.params.name)
	.then(function(products){

		res.json(products);

	});

});


module.exports = router;
