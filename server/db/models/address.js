var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
    	type: String
    }
});



mongoose.model('Address', schema);