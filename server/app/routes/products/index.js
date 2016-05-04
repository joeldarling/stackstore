'use strict';
var router = require('express').Router();

var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Review = mongoose.model('Review');

router.get('/', function(req, res, next){
	Product.find({})
	.populate('category')
	.then(function(products){
		res.json(products);
	})
	.then(null, next);
});


router.post('/', function(req, res, next){

	var newProduct = new Product({
		name: req.body.name,
		description: req.body.description,
		category: req.body.category,
		price: req.body.price,
		inventoryQty: req.body.inventory,
		photoUrl: req.body.photo
	});
	newProduct.save()
	.then(function(response){
		res.send(response);
	}, next);
});


router.get('/:id', function(req, res, next){
	Product.findOne({_id: req.params.id})
	.populate('category')
	.then(function(product){
		res.json(product);
	})
	.then(null, next);
});

router.delete('/:id', function(req, res, next){
	Product.findOneAndRemove({_id: req.params.id})
	.then(function(response){
		res.send(response);
	}, next);
});


router.get('/reviews/:id', function(req, res, next){
	Review.find({product: req.params.id})
	.populate('user')
	.then(function(reviews){
		res.json(reviews);
	}, next);
});


router.post('/:id/reviews', function(req, res, next){
	var newReview = new Review({
		user: req.body.user,
		product: req.params.id,
		rating: req.body.rating,
		description: req.body.description
	});
	newReview.save()
	.then(function(response){
		res.send(response);
	});
});

router.delete('/:id/reviews', function(req, res, next){
	Review.findOneAndRemove({_id: req.params.id})
	.then(function(response){
		res.send(response);
	}, next);
});



module.exports = router;
