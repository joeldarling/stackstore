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

schema.statics.getByCategory = function(_category){

  return this.find({'category': _category})
  .populate('category')
  .then(function(result){

    return result;
  });

};


mongoose.model('Product', schema);
