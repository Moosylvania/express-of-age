express-of-age
==============

Age Gate middleware for Express.js

## Dependencies

* Moment.js
* Express.js
* body-parser
* cookie-parser

## Documentation

This middleware allows you to age gate your site to limit access.
With this middleware you can customize what your age gate url is (default is /agegate) and
the minimum age required to access your site (default is 21).

Options are sent to the middleware as a JSON object like

        {
            url:'/agegate',
            age:21
        }


This middleware is also setup to look for common search engine robots and allow them to bypass the age gate so they may index your site.

To allow users to pass the age gate, your site must have a form that POSTs to the age gate url an input named - 'birthdate'.
So for example if your age gate url is /agegate - that page should have at least the following form -

        <form method="post">
            <input type="text" name="birthdate"/>
            <input type="submit" val="submit"/>
        </form>

When posting back to the age gate url - the birthdate field simply needs to be in any date format that moment.js can parse.
For information about moment.js please checkout - http://momentjs.com/

## Example Usage

You can find an example app with full implementation at -

https://github.com/Moosylvania/express-of-age-example

        var express = require('express'), app = module.exports = express();
        var cookieParser = require('cookie-parser');
        var bodyParser = require('body-parser');
        var ofAge = require('express-of-age');

        app.use(cookieParser());
        app.use(bodyParser({extended:true}));
        app.use(ofAge({url:'/agegate', age:21}));

        app.get('/', function(req, res){
            return res.send('You passed the agegate');
        });

        app.use('/agegate', function(req, res){
            return res.sendfile('agegate.html');
        });

        app.listen(3000);
