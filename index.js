/*!
* express-of-age
* MIT Licensed
*/

/**
* Module dependencies.
*/
var moment = require('moment');

/**
* Express Of Age Module - provides functionality to ensure that users are of age visiting the site.
*/

exports = module.exports = function ofAge(options){
    return function ofAge(req, res, next){
        var url = (options.url ? options.url : '/agegate');
        var age = (options.age ? options.age : 21);

        if(req.method == "POST" && req.path == url){
            if(req.body.birthdate){
                var years = moment().diff(req.body.birthdate, 'years');
                if(years >= age){
                    req.cookies.ofage = true;
                    res.cookie('ofage', true, { maxAge: 900000, path:'/' });
                    res.redirect('/');
                }
            } else {
                return res.redirect(url+"?notofage=1");
            }
        }
        if(typeof(req.cookies) === "undefined"){
            return res.redirect(url);
        } else {
            if(req.cookies.ofage){
                return next();
            } else {
                return res.redirect(url)
            }
        }
    };
};
