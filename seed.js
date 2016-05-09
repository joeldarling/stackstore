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
var Address = mongoose.model('Address');
var Review = mongoose.model('Review');

var wipeCollections = function () {
    var removeUsers = User.remove({});
    var removeProducts = Product.remove({});
    var removeOrders = Order.remove({});
    var removeCategories = Category.remove({});
    var removeAddresses = Address.remove({});
    var removeReviews = Review.remove({});
    return Promise.all([
        removeUsers, removeProducts, removeOrders, removeCategories, removeAddresses, removeReviews
    ]);
};

var seedAddresses = function() {
    var addresses = [
        {
            address: '5 Hanover Square',
            city: 'New York',
            state: 'NY',
            zip: '10004'
        },
        {
            address: '25 Broadway',
            city: 'New York',
            state: 'NY',
            zip: '10004'
        }
    ];

    return Address.create(addresses);
};

var seedUsers = function () {

    var users;

    return Address.findOne({address: '5 Hanover Square'}).exec()
    .then(function(hanover){
        return Address.findOne({address: '25 Broadway'}).exec()
        .then(function(broadway){
            users = [
                {
                    email: 'testing@fsa.com',
                    password: 'password',
                    status: 'Yes',
                    address: hanover
                },
                {
                    email: 'obama@gmail.com',
                    password: 'potus',
                    status: 'Yes',
                    address: hanover
                },
                {
                    email: 'ontima@gmail.com',
                    password: 'password',
                    status: 'Yes',
                    address: broadway
                }
            ];

            return User.create(users);
        })
    })
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
                products = [
                    {
                        name: 'Classic Waffles',
                        price: 5.00,
                        inventoryQty: 100,
                        category: waffles,
                        description: 'Stack of classic waffles',
                        photoURL: 'https://dl.dropboxusercontent.com/s/3kx6arl2luookvt/classic-waffle.jpeg?dl=0'
                    },
                    {
                        name: 'Chocolate Chip Waffles',
                        price: 7.00,
                        inventoryQty: 50,
                        category: waffles,
                        description: 'Stack of chocolate chip waffles',
                        photoURL: 'https://dl.dropboxusercontent.com/s/dv9z9glll650h4a/choc-chip-waffle.jpg?dl=0'
                    },
                    {
                        name: 'Chicken and Waffles',
                        price: 12.00,
                        inventoryQty: 50,
                        category: waffles,
                        description: 'Waffles with fried chicken',
                        photoURL: 'https://dl.dropboxusercontent.com/s/y78daqqe0v32hlx/waffle-chickens.JPG?dl=0'
                    },
                    {
                        name: 'OJ',
                        price: 3.00,
                        inventoryQty: 100,
                        category: drinks,
                        description: 'Orange Juice',
                        photoURL: 'https://dl.dropboxusercontent.com/s/wzxtnnf7u28v2vz/orange-juice.png?dl=0'
                    },
                    {
                        name: 'Round Waffle Maker',
                        price: 30.00,
                        inventoryQty: 25,
                        category: equipments,
                        description: 'Round Waffle Maker',
                        photoURL: 'https://dl.dropboxusercontent.com/s/wu3z6f9kx3v1k5u/round-waffle.jpg?dl=0'
                    },
                    {
                        name: 'Square Waffle Maker',
                        price: 35.00,
                        inventoryQty: 20,
                        category: equipments,
                        description: 'Square Waffle Maker',
                        photoURL: 'https://dl.dropboxusercontent.com/s/bdpjnc2wkwelod5/waffle-square.jpg?dl=0'
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
                    }],
                    email: 'obama@gmail.com',
                    total: 100
                },
                {
                    user: user._id,
                    status: 'Completed',
                    products: [{
                        product: product._id,
                        quantity: 5
                    }],
                    email: 'obama@gmail.com',
                    total: 100
                }
            ]
            return Order.create(orders);
        })

    })
};


var seedReviews = function(){
    var reviews;
    return User.findOne({email: 'obama@gmail.com'}).exec()
    .then(function(user){
        return Product.findOne({name: 'Classic Waffles'}).exec()
        .then(function(product){
            reviews = [
                {
                    user: user._id,
                    product: product._id,
                    rating: 5,
                    description: 'The best waffles ever!'
                },
                {
                    user: user._id,
                    product: product._id,
                    rating: 4,
                    description: 'Pretty good waffles'
                }
            ]
            return Review.create(reviews);
        })
    })
};

connectToDb
    .then(function () {
        return wipeCollections();
    })
    .then(function(){
        return seedAddresses();
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
    .then(function(){
        return seedReviews();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
