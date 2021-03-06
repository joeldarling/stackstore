'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');
var Address = mongoose.model('Address');
var User = mongoose.model('User');

var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "ontima.test@gmail.com",
        pass: "stackstore"
    }
});

router.get('/', function(req, res, next){
	Order.find({status: {$ne: 'Cart'}})
  .populate('user')
	.then(function(orders){
		res.json(orders);
	}, next);
});

router.get('/cart', function(req, res, next){


  Order.findOne({_id: req.session.cartId})
  .populate('products.product')
  .then(function(cart){
    res.json(cart);
  });

});

router.get('/:id', function(req, res, next){
	Order.findOne({_id: req.params.id})
	.populate('products.product')
	.then(function(order){
		res.json(order);
	}, next);
});



router.post('/', function(req, res, next){

	if(req.body.user){
    Order.findOrCreateAuth(req.body.user)
    .then(function(cart){
      res.json(cart);
    });
  } else {
    Order.findOrCreateUnAuth(req.cookies['connect.sid'])
    .then(function(cart){
      res.json(cart);
    });
  }

});

router.put('/', function(req, res, next){

	Order.findOne({_id: req.session.cartId})
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
					price: req.body.price
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


router.put('/checkout/', function(req, res, next){
	Order.findOne({_id: req.session.cartId})
	.populate('user')
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
			});
		});
		//update the order's status
		order.status = 'Created';
		order.total = req.body.total;

    if(req.body.orderInfo.email && order.user)
      order.user.email = req.body.orderInfo.email;

    if(req.user)
      order.email = req.user.email;
    else
      order.email =  req.body.orderInfo.email;

		//update the order's address
		if (req.body.orderInfo) {
			var newAddress = new Address({
				address: req.body.orderInfo.address,
				city: req.body.orderInfo.city,
				state: req.body.orderInfo.state,
				zip: req.body.orderInfo.zip
			});
			newAddress.save()
			.then(function(address){
				order.address = address;
			});
		}

		var mailOptions = {
		    from: "ontima.test@gmail.com", // sender address
		    //to: order.user[0].email, // list of receivers
		    to: "ontima.test@gmail.com",  // list of receivers
		    subject: "Order Received", // Subject line
		    text: "Your order #" + order.orderNumber + " has been received by stackstore" // plaintext body
		}

		// send mail with defined transport object
		smtpTransport.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		    }else{
		        console.log("Message sent: " + info.response);
		    }
		});

		return order.save();
	})
	.then(function(response){
    if(!req.user){
      //user is NOT logged in, find the cart
      Order.findOrCreateUnAuth(req.cookies['connect.sid'])
      .then(function(cart){
        req.session.cartId = cart._id;
      });
    } else {
      //user IS logged in, find the cart
      Order.findOrCreateAuth(req.user._id)
      .then(function(cart){
        req.session.cartId = cart._id;
      });
    }
		res.send(response);
	}, next);
});


router.put('/status/:id', function(req, res, next){
	Order.findOne({_id: req.params.id})
	.populate('user')
	.then(function(order){
		order.status = req.body.status;

		var mailOptions = {
		    from: "ontima.test@gmail.com", // sender address
		    //to: order.user[0].email, // list of receivers
		    to: "ontima.test@gmail.com",  // list of receivers
		    subject: "Order Updated", // Subject line
		    text: "Your order #" + order.orderNumber + " has been updated to " + order.status + "."// plaintext body
		}

		// send mail with defined transport object
		smtpTransport.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		    }else{
		        console.log("Message sent: " + info.response);
		    }
		});

		return order.save();
	})
	.then(function(response){
		res.send(response);
	}, next);
});

module.exports = router;
