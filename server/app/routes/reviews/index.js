'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var Product = mongoose.model('Product')


router.get('/', function(req, res, next){
	Review.find({})
	.then(function(reviews){
		res.json(reviews);
	}, next);
});


router.get('/:productid', function(req, res, next){
	Review.find({product: req.params.productid})
	.populate('user')
	.then(function(reviews){
		res.json(reviews);
	}, next);
});


router.post('/', function(req, res, next){
	var newReview = new Review({
		user: req.body.user,
		product: req.body.product,
		rating: req.body.rating,
		description: req.body.description
	});
	newReview.save()
	.then(function(response){
		res.send(response);
	});
});

router.delete('/:id', function(req, res, next){
	Review.findOneAndRemove({_id: req.params.id})
	.then(function(response){
		res.send(response);
	}, next);
});

module.exports = router;
