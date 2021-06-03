var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Post', PostSchema);