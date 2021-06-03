const db = require('../models/db.js');

const Comment = require('../models/CommentModel.js');

const User = require('../models/UserModel.js');

const commentController = {
	
	getComments: function(req, res) {
        // your code here
		db.findMany (Comment, {}, 'number username message', function(loaddb){
			if(loaddb){
				res.render('commentspage', {fName: req.session.name, commentsdb: loaddb});
				//res.render('commentspage', {commentsdb: loaddb});
			}
			else{
				res.render('commentspage', {fName: req.session.name});// This is to load the page initially
			}
		})
    },
	
	getDelete: function (req, res) {
		db.deleteOne(Comment, req.query, (goodbye) => {});
    },
	
	
	postComment: function(req, res) {
        // your code here
		var comment = {};
				
		db.findOne(User, {number: req.session.number}, 'username number', function(user){

			comment.number = user.number;
			comment.username = user.username;
			comment.message = req.body.message;
						
			db.insertOne (Comment, comment, (getaddhtml) => {
				if(getaddhtml){
					
					db.findMany (Comment, {}, 'number username message', function(loaddb){
						if(loaddb){
							res.render('commentspage', {fName: req.session.name, commentsdb: loaddb});
							//res.render('commentspage', {commentsdb: loaddb});
						}
						else{
							res.render('commentspage', {fName: req.session.name});// This is to load the page initially
						}
					})
				}
			})
		})
	}	
}

module.exports = commentController;