// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const controller = {

    /*
        executed when the client sends an HTTP GET request `/favicon.ico`
        as defined in `../routes/routes.js`
    */
    getFavicon: function (req, res) {
        res.status(204);
    },
	
    /*
        executed when the client sends an HTTP GET request `/`
        as defined in `../routes/routes.js`
    */
    getIndex: function (req, res) {
	
        // checks if a user is logged-in by checking the session data
        if(req.session.number) {
			db.findOne(User, {number: req.session.number},'username number fName lName address', function(result) {
				if(result != null) {
					
					var user = {};
						
					user.username= result.username;
					user.number= result.number;
					user.fName= result.fName;
					user.lName= result.lName;
					user.address= result.address;

					/*
						redirects the client to `/profile` using HTTP GET,
						defined in `../routes/routes.js`
						passing values using URL
						which calls getProfile() method
						defined in `./profileController.js`
					*/
					//res.redirect('/myAccount/' + req.session.number);
					res.render('home', user);
				}
				else {
					// render `../views/error.hbs`
					res.render('error', details);
				}
			});
        }

        // else if a user is not yet logged-in
        else {

            /*
                sets `details.flag` to false
                to hide the profile and logout tabs in the nav bar
            */
            var details = {
                flag: false
            };

            // render `../views/index.hbs`
            res.render('index', details);
        }
    },

    getAbout: function (req, res) {

        // render `../views/index.hbs`
		
		db.findOne (User, {number: req.session.number}, 'username number fName lName address', function(result){
			res.render('aboutUs',result);
			
		})
		
        
    },
	
	
	getHome: function (req, res) {

        // render `../views/index.hbs`
        res.render('home');
    },
	
	
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = controller;
