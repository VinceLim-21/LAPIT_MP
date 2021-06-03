
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const Order = require('../models/OrderModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `profile` paths in the server
*/
const accountController = {

    /*
        executed when the client sends an HTTP GET request `/profile/:idNum`
        as defined in `../routes/routes.js`
    */
    getAccount: function (req, res) {


        // fields to be returned
        var projection = 'username number fName lName address';

		var user = {};

        db.findOne(User, {number: req.session.number},projection, function(result) {

            /*
                if the user exists in the database
                render the profile page with their details
            */
            if(result != null) {
				
				user.username= result.username;
				user.number= result.number;
				user.fName= result.fName;
				user.lName= result.lName;
				user.address= result.address;
                
				db.findMany (Order, {Buyer: user.username}, 'Name Price Description Seller ContactNo', function(loaddb){
					if(loaddb){
						res.render('myAccount', {username: result.username,
						number: result.number,
						fName: result.fName,
						lName: result.lName,
						address: result.address,
						orderdb: loaddb});
					}
				})


				
            }
		
            /*
                if the user does not exist in the database
                render the error page
            */
            else {
                // render `../views/error.hbs`
                res.render('error', user);
            }
        });
    }/*,
	
	getAccount: function (req, res) {
		res.redirect('/home/' + req.session.number);
	}*/
}

/*
    exports the object `profileController` (defined above)
    when another script exports from this file
*/
module.exports = accountController;
