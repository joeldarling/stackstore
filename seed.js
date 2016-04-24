/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Order = mongoose.model('Order');

var wipeCollections = function () {
    var removeUsers = User.remove({});
    var removeProducts = Product.remove({});
    var removeOrders = Order.remove({});
    return Promise.all([
        removeUsers, removeProducts, removeOrders
    ]);
};

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.create(users);

};

var seedProducts = function() {

    var products = [
        {
            name: 'Classic Waffles',
            price: 5.00,
            category: "Waffles",
            description: 'Stack of classic waffles'
        },
        {
            name: 'Chocolate Chip Waffles',
            price: 7.00,
            category: "Waffles",
            description: 'Stack of chocolate chip waffles'
        },
        {
            name: 'Chicken and Waffles',
            price: 12.00,
            category: "Waffles",
            description: 'Waffles with fried chicken'
        },
        {
            name: 'OJ',
            price: 3.00,
            category: "Drinks",
            description: 'Orange Juice'
        },
        {
            name: 'Round Waffle Maker',
            price: 30.00,
            category: "Equipment",
            description: 'Round Waffle Maker'
        },
        {
            name: 'Square Waffle Maker',
            price: 30.00,
            category: "Equipment",
            description: 'Square Waffle Maker'
        }
    ];
    return Product.create(products);
};

var seedOrders = function(){
    var order;
    return User.findOne({email: 'obama@gmail.com'}).exec()
    .then(function(user){
        return Product.findOne({name: 'Classic Waffles'}).exec()
        .then(function(product){
            orders = [
                {
                    user: user._id,
                    status: 'Cart',
                    products: [{
                        product: product._id,
                        quantity: 5
                    }]
                },
                {
                    user: user._id,
                    status: 'Shipped',
                    products: [{
                        product: product._id,
                        quantity: 5
                    }]
                }
            ]
            return Order.create(orders);
        })

    })
}


connectToDb
    .then(function () {
        return wipeCollections();
    })
    .then(function () {
        return seedUsers();
    })
    .then(function() {
        return seedProducts();
    })
    .then(function(){
        return seedOrders();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
