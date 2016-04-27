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
    category: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        required: true
    }],
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
    }
});



mongoose.model('Product', schema);