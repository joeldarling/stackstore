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
        type: Date
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Address'
    }]
});


mongoose.model('Order', schema);
