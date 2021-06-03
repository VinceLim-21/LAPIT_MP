// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Post = require('../models/PostModel.js');

const postController = {

    /*
        executed when the client sends an HTTP GET request `/favicon.ico`
        as defined in `../routes/routes.js`
    */
    getPosts: function (req,res){
		db.findMany (Post, {}, 'Name Price Description Seller ContactNo', function(loaddb){
			if(loaddb){
				res.render('results', {postsdb: loaddb, user: req.session.name}); // This is to load the page initially
			}
			else{
				details={error: "No posts yet!"};
				res.render('results', details);
			}
		})
	},
	
	showPost: function (req,res){
		
		var temp={};
		db.findOne (Post, {Name: req.params.name}, 'Name Price Description Seller ContactNo', function(result){
			result.fName = req.session.name;
			res.render('orderpost',result);
			
		})
	}
	
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = postController;
