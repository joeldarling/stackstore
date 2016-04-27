'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
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

	User.findOne({_id: req.params.id}, {email: 1, address: 1})
	.populate('address')
	.then(function(user){
		userToReturn = user;
		return Order.find({user: req.params.id});
	})
	.then(function(orders){

		res.json({user: userToReturn, orders: orders});
	})
	.then(null, next);
});


module.exports = router;
