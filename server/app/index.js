'use strict';
var path = require('path');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
module.exports = app;

var Order = mongoose.model('Order');

// Pass our express application pipeline into the configuration
// function located at server/app/configure/index.js
require('./configure')(app);

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));



app.use(function (req, res, next) {
  // console.log(req.session);
  // console.log(req.user);
  // console.log(req.cookies)

    if(!req.session.cartId && !req.user) {

      //user is NOT logged in, find the cart
      Order.findOne({sessionId: req.cookies['connect.sid']})
      .then(function(cart){
        if(!cart){
          console.log('no match, make a cart')
          Order.create({
                  sessionId: req.cookies['connect.sid'],
                  status: 'Cart',
              })
              .then(function(cart) {
                  req.session.cartId = cart._id;
                  next();

              })
              .catch(function(err) {
                  console.log("ERROR:",err);
              });
        }
        else{
          console.log('there is a cart!', cart);
          req.session.cartId = cart._id;
        }

      });
        // console.log("No cart found for this session...creating one now.");

    } else {
      console.log("there's a cart", req.session.cartId);
    }
    next();
});

/*
 This middleware will catch any URLs resembling a file extension
 for example: .js, .html, .css
 This allows for proper 404s instead of the wildcard '/*' catching
 URLs that bypass express.static because the given file does not exist.
 */
app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});


app.get('/*', function (req, res) {
    res.sendFile(app.get('indexHTMLPath'));
});



// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err)
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
