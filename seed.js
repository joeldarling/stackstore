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
var Category = mongoose.model('Category');

var wipeCollections = function () {
    var removeUsers = User.remove({});
    var removeProducts = Product.remove({});
    var removeOrders = Order.remove({});
    var removeCategories = Category.remove({});
    return Promise.all([
        removeUsers, removeProducts, removeOrders, removeCategories
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
        },
        {
            email: 'ontima@gmail.com',
            password: 'password'
        }      
    ];

    return User.create(users);

};

var seedCategories = function() {
    var categories = [
        {
            name: 'Waffles'
        },
        {
            name: 'Drinks'
        },
        {
            name: 'Equipment'
        }
    ];
    return Category.create(categories);
};


var seedProducts = function() {

    var products;

    return Category.findOne({name: 'Waffles'}).exec()
    .then(function(waffles){
        return Category.findOne({name: 'Drinks'}).exec()
        .then(function(drinks){
            return Category.findOne({name: 'Equipment'}).exec()
            .then(function(equipments){
                console.log('still have waffles: ', waffles);

                products = [
                    {
                        name: 'Classic Waffles',
                        price: 5.00,
                        inventoryQty: 100,
                        category: waffles,
                        description: 'Stack of classic waffles'
                    },
                    {
                        name: 'Chocolate Chip Waffles',
                        price: 7.00,
                        inventoryQty: 50,
                        category: waffles,
                        description: 'Stack of chocolate chip waffles'
                    },
                    {
                        name: 'Chicken and Waffles',
                        price: 12.00,
                        inventoryQty: 50,
                        category: waffles,
                        description: 'Waffles with fried chicken'
                    },
                    {
                        name: 'OJ',
                        price: 3.00,
                        inventoryQty: 100,
                        category: drinks,
                        description: 'Orange Juice'
                    },
                    {
                        name: 'Round Waffle Maker',
                        price: 30.00,
                        inventoryQty: 25,
                        category: equipments,
                        description: 'Round Waffle Maker'
                    },
                    {
                        name: 'Square Waffle Maker',
                        price: 35.00,
                        inventoryQty: 20,
                        category: equipments,
                        description: 'Square Waffle Maker'
                    }
                ];
                return Product.create(products);
            })
        })
    })
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
                    status: 'Completed',
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
    .then(function(){
        return seedCategories();
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
