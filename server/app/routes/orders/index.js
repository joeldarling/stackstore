'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

router.get('/', function(req, res, next){
	Order.find({})
	.then(function(orders){
		res.json(orders);
	}, next);
});

router.get('/:id', function(req, res, next){
	Order.findOne({_id: req.params.id})
	.populate('products.product')
	.then(function(order){
		res.json(order);
	}, next);
});

router.post('/', function(req, res, next){

	Order.findOne({user: req.body.user, status: 'Cart'})
	.populate('products.product')
	.then(function(cart){
		if(!cart){
			//no cart exists for this user - create one
			var newCart = new Order({
                user: req.body.user,
                status: 'Cart'
            });
           	newCart.save()
           	.then(function(response){
           		res.send(response);
           	});
		} else {
			//cart already existed, return cart
			res.send(cart);
		}
	});
});

router.put('/:id', function(req, res, next){

	Order.findOne({_id: req.params.id})
	.then(function(order){
		//get index of product in products array
		var index = order.products.map(function(product) { return product.product.toString(); }).indexOf(req.body.productid);

		if (req.body.action === 'add') {
			//if product exists then update quantity, otherwise add to products array
			if (index === -1) {
				order.products.push({product: req.body.productid, quantity: 1});
			} else {
				order.products[index].quantity++;
			}
		} else {
			if (order.products[index].quantity > 0) {
				order.products[index].quantity--;
			}
		}
		return order.save();
	})
	.then(function(response){
		res.send(response);
	}, next);
});


router.delete('/:id', function(req, res, next){
	Order.findOneAndRemove({_id: req.params.id})
	.then(function(response){
		res.send(response);
	}, next);
});


module.exports = router;
