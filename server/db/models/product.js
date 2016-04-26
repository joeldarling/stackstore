var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
    	type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inventoryQty: {
        type: Number,
        required: true
    },
    photo: {
    	type: Buffer
    },
    reviews: {
    	type: [String]
    }
});



mongoose.model('Product', schema);