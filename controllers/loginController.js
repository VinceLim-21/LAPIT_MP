
// import module `bcrypt`
const bcrypt = require('bcrypt');

// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `login` paths in the server
*/
const loginController = {

    /*
        executed when the client sends an HTTP GET request `/login`
        as defined in `../routes/routes.js`
    */
    getLogin: function (req, res) {
		
	if(req.session.number) {
            /*
                redirects the client to `/profile` using HTTP GET,
                defined in `../routes/routes.js`
                passing values using URL
                which calls getProfile() method
                defined in `./profileController.js`
            */
            res.redirect('/home');
        }

        else {
            var details = {
                flag: false
            };

			res.render('login', details);
		}
    },

    postLogin: function (req, res) {



        var number = req.body.number;
        var psw = req.body.psw;

        db.findOne(User, {number: number}, '', function (result) {

            if(result) {

                var user = {};
				
				user.username= result.username,
                user.number= result.number,
                user.fName= result.fName,
				user.lName= result.lName,
				user.address= result.address
	

                bcrypt.compare(psw, result.psw, function(err, equal) {
                    if(equal){
						req.session.number = user.number;
                        req.session.name = user.fName;
						
                        //res.redirect('/home'+ user.number);
						res.redirect('/');
						//res.redirect('/');
					}
                    /*
                        else if the entered password
                        does not match the hashed password from the database
                    */
                    else {
                        var details = {
							flag: false,
							error: `Contact Number and/or Password is incorrect.`}

                        /*
                            render `../views/login.hbs`
                            display the errors
                        */
                        res.render('login', details);
                    }
                });
            }

            // else if a user with `idNum` equal to `idNum` does not exist
            else {
                var details = {
					flag: false,
					error: `Contact Number and/or Password is incorrect.`}

                /*
                    render `../views/login.hbs`
                    display the errors
                */
                res.render('login', details);
            }
        });
    }
}

/*
    exports the object `loginController` (defined above)
    when another script exports from this file
*/
module.exports = loginController;
