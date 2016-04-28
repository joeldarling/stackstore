'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

var Promise = require('bluebird');

var User = mongoose.model('User');
var Order = mongoose.model('Order');

router.get('/', function(req, res, next){
	User.find({})
	.then(function(users){
		res.json(users);
	})
	.then(null, next);
});

router.get('/:id', function(req, res, next){

	var userToReturn = {};

	Promise.all([

		User.findOne({_id: req.params.id}, {email: 1, address: 1})
		.populate('address')
		.then(function(user){
			return user;
		}),
		Order.find({user: req.params.id, status: {$ne: 'Cart'}})
		.populate('products.product')
		.then(function(products){
			return products;
		})
	])
	.then(function(result){
		console.log(result[1].products)
		res.json({user: result[0], orders: result[1]});
	});

});
