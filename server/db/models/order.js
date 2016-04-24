var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    status: {
        type: String
    },
    products: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: {type: Number}
    }],
    orderDate: {
        type: Date
    }
});


mongoose.model('Order', schema);
