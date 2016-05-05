var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    status: {
        type: String,
        enum: ['Cart', 'Created', 'Processing', 'Cancelled', 'Completed']
    },
    products: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: {type: Number},
        price: {type: Number}
    }],
    orderDate: {
        type: Date,
        default: Date
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Address'
    }],
    total: {
      type: Number
    },
    sessionId: {
      type: String
    },
    orderNumber:{
      type: String,
      default: orderNumGen
    }
});

schema.statics.combineCart = function(sessionCart, userCart){
  var self = this;
  var cartToCombine;

  self.findOne({sessionId: sessionCart})
  .then(function(_cart){
    cartToCombine = _cart.products;
    return self.findOne({user: userCart});
  })
  .then(function(_cart){

    _cart.products.push(cartToCombine);
    return _cart.save();
  })
  .then(function(result){
    return result;
  });

};


schema.statics.findOrCreateUnAuth = function(id){
  var self = this;

  return this.findOne({sessionId: id, status: 'Cart'})
	.populate('products.product')
	.then(function(cart){
		if(!cart){
			//no cart exists for this user - create one
      self.create({sessionId: id, status: 'Cart'})
     	.then(function(response){
     		return response;
     	});
		} else {
			//cart already existed, return cart
			return cart;
		}
  });
};

schema.statics.findOrCreateAuth = function(id){

  var self = this;
  return this.findOne({user: id, status: 'Cart'})
	.populate('products.product')
	.then(function(cart){
		if(!cart){
			//no cart exists for this user - create one
      self.create({user: id, status: 'Cart'})
     	.then(function(response){
     		return response;
     	});
		} else {
			//cart already existed, return cart
			return cart;
		}
  });
};

function orderNumGen(){
  return Math.random().toString(36).toUpperCase().slice(10);
}

mongoose.model('Order', schema);
