'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

var Promise = require('bluebird');

var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Address = mongoose.model('Address');

router.get('/', function(req, res, next){
	User.find({},{email: 1, address: 1, isAdmin: 1})
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
		res.json({user: result[0], orders: result[1]});
	});

});

router.post('/', function(req, res, next){
	var newAddress = new Address({
		address: req.body.address,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip
	});
	newAddress.save()
	.then(function(address){
		var newUser = new User({
			email: req.body.email,
			address: address._id,
			passwordReset: false,
			status: req.body.status
		});
		newUser.save()
		.then(function(response){
			res.send(response);
		});
	})
});

router.put('/status/:id', function(req, res, next){
	User.findOne({_id: req.params.id})
	.then(function(user){
		user.status = req.body.status;
		return user.save();
	})
	.then(function(response){
		res.send(response);
	}, next);
});

router.put('/passwordreset/:id', function(req, res, next){
	User.findOne({_id: req.params.id})
	.then(function(user){
		user.passwordReset = true;
		return user.save();
	})
	.then(function(response){
		res.send(response);
	}, next);
});

router.put('/password/:id', function(req, res, next){
	User.findOne({_id: req.params.id})
	.then(function(user){
		user.password = req.body.password;
		return user.save();
	})
	.then(function(response){
		res.send(response);
	}, next);
});

router.delete('/:id', function(req, res, next){
	User.findOneAndRemove({_id: req.params.id})
	.then(function(response){
		res.send(response);
	}, next);
});
