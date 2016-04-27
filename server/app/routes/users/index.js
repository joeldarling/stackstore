'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', function(req, res, next){
	User.find({})
	.then(function(users){
		res.json(users);
	})
	.then(null, next);
});

router.get('/:id', function(req, res, next){
	User.findOne({_id: req.params.id})
	.then(function(user){
		res.json(user);
	})
	.then(null, next);
});


module.exports = router;