'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');
var Address = mongoose.model('Address');

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
  //don't we have the user from passport req.user?

  //how about putting this logic into order model?
  //Order.getCart(req.user)
	Order.findOne({user: req.body.user, status: 'Cart'})
	.populate('products.product')
	.then(function(cart){
		if(!cart){
			//no cart exists for this user - create one
			var newCart = new Order({
                user: req.body.user,
                status: 'Cart'
            });
      //why nest here? can't you flatten this out?
      //if(cart)
      //  return cart
      //var new Cart = ....;
      //return newCart.save();
      //})
      //.then(function(cart){
      //    res.send(cart);
      //});
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

//see if this can be a restful route...
//router.put('/:id', function(){
//  how about passing a cart to the server
//  also-- does a cart have products or lineItems?
//  in any event you can pass the entire cart back and save the cart -- or find out what changed and just edit that
//  what you are calling product in the order.products is really a lineItem .. no?
//)
//also-- too much logic here.. how about having the order do the work?
// Order.updateCart(req.body, req.user) ?
/*
  imagine if you're req.body looked like this--
  { lineItems: [
      {
        quantity: 3,
        _id: xxxxx
      },
      {
        quantity: 6,
        _id: xxxxx
      }
  ] }

  then you could loop over lineItems.. find the appropriate product, set the price, reduce the quantity for that product perhaps.. and then just find the current cart, set the lineItems to your new values.. and save.. much simpler
 */
router.put('/:id', function(req, res, next){

	Order.findOne({_id: req.params.id})
	.then(function(order){
		//get index of product in products array
		var index = order.products.map(function(product) { return product.product.toString(); }).indexOf(req.body.productid);

		if(req.body.action === 'delete' && index!==-1){
			order.products.splice(index, 1);

		}	else if (req.body.action === 'add') {
			//if product exists then update quantity, otherwise add to products array
			if (index === -1) {
				order.products.push({
					product: req.body.productid,
					quantity: 1,
					price: req.body.price//why is this being sent to the server.. dangerous
          // can't we do a lookup for the price
				});
			} else {
				order.products[index].quantity++;
				order.products[index].price = req.body.price;
			}
		} else { //remove one
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

//this is fine.. but this really is an update of the cart
//in any event this logic belongs in model..
// find the order.. then order.checkout()
router.put('/checkout/:id', function(req, res, next){
	Order.findOne({_id: req.params.id})
	.then(function(order){
		//loop through products in the order to update inventory
		order.products.forEach(function(item){
			Product.findOne({_id: item.product})
			.then(function(product){
				if (product.inventoryQty > item.quantity) {
					product.inventoryQty = product.inventoryQty - item.quantity;
					return product.save();
				} else {
					//there wasn't enough inventory - what should we do here?
					//if there are some left - update the order's quantity to what's available?
					//if nothing in the order is available, update status to 'Cancelled'?
				}
			})
		});
		//update the order's status
		order.status = 'Created';
		order.total = req.body.total;

		//update the order's address
		if (req.body.address) {
			var newAddress = new Address({
				address: req.body.address,
				city: req.body.city,
				state: req.body.state,
				zip: req.body.zip
			});
			newAddress.save()
			.then(function(address){
				order.address = address;
			});
		}

		return order.save();
	})
	.then(function(response){
		res.send(response);
	}, next);
});


module.exports = router;
