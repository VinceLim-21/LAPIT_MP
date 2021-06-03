var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
	Buyer: {
		type:String
	},
	Name: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
	Description: {
		type: String,
		required: true
	},
    Seller:{
		type: String
	},
	ContactNo:{
		type: Number
	}
});

module.exports = mongoose.model('Order', OrderSchema);
