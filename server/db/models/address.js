var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },//confusing.. street?
    city: {
        type: String //required?
    },
    state: {
        type: String//required?
    },
    zip: {
    	type: String
    }
});



mongoose.model('Address', schema);
