// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Post = require('../models/PostModel.js');

const Order = require('../models/OrderModel.js');

const orderController = {

    /*
        executed when the client sends an HTTP GET request `/favicon.ico`
        as defined in `../routes/routes.js`
    */
    
	getOrders: function (req,res) {
		db.findOne (User, {number: req.session.number}, 'username', function(username){
			var buyer = username;
			db.findMany (Order, {Buyer: buyer}, 'Name Price Description Seller ContactNo', function(loaddb){
				if(loaddb){
					res.send(loaddb);
				}
			})
		})
	},
	
	processOrder: function (req,res) {
		var temp={};
		
		db.findOne (User, {number: req.session.number}, 'username', function(buyer){
			temp.Buyer = buyer.username;
			
			db.findOne (Post, {Name: req.params.name},'Name Price Description Seller ContactNo', function(order){
				temp.Name = order.Name;
				temp.Price = order.Price;
				temp.Description = order.Description;
				temp.Seller = order.Seller;
				temp.ContactNo = order.ContactNo;
				
				db.insertOne (Order, temp, function(inserto){
					
					db.deleteOne (Post, order, function(deleto){
						res.render('receipt', temp);
					})
				})
			})
		})
	}
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = orderController;
