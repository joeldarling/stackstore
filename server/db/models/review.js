var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    product: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }],
    rating: {
        type: Number,
        enum: [1,2,3,4,5]
    },
    description: {
    	type: String
    }
});


mongoose.model('Review', schema);