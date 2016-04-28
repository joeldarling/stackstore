var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
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
    orderNumber:{
      type: String,
    }
});

schema.pre('validate' , function(next){

  this.orderNumber = Math.random().toString(36).toUpperCase().slice(10);
  next();

});


mongoose.model('Order', schema);
