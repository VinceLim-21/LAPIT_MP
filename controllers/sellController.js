// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Post = require('../models/PostModel.js');

const sellController = {

    /*
        executed when the client sends an HTTP GET request `/favicon.ico`
        as defined in `../routes/routes.js`
    */
    
	getSell: function (req,res) {
		var user = {}
		user.fName = req.session.name;
		res.render('sell', user);
	},
	
	postSell: function (req,res) {
	
		if(Object.keys(req.body.foodname).length > 0 && Object.keys(req.body.foodprice).length > 0){ 
					
			var number = req.session.number;
			
			var projection = 'username number fName lName address';
			
			db.findOne(User, {number: req.session.number}, projection, function (result) {
		
				var post = {
					Name: req.body.foodname,
					Price: req.body.foodprice,
					Description: req.body.fooddesc,
					Seller: result.username,
					ContactNo: result.number
				};
				
				db.insertOne (Post, post, function(flag) {
					if (flag) {
						res.redirect('./');
					}
				});
				
			});
		}
		else {
			var details = {
				error: 'Fill up all fields.'
			}
			
			res.render('sell', details);
		}
	}
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = sellController;
