var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	number: {
		type:Number
	},
	username:{
		type:String
	},
    message: {
		type: String, 
		required: true
	}
});

module.exports = mongoose.model('Comment', CommentSchema);
