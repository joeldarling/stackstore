var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Order = mongoose.model('Order');

describe('Order model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Order).to.be.a('function');
    });

    describe('find or create methods', function () {

        it('should exist', function () {
            expect(Order.findOrCreateAuth).to.be.a('function');
        });

        it('should exist', function () {
            expect(Order.findOrCreateUnAuth).to.be.a('function');
        });

    });

    describe('OrderNumGen method', function () {

        var createOrder = function () {
            return Order.create({ state: 'Cart' });
        };

        it('should generate a order number', function () {
            createOrder().then(function (order) {
                expect(order.orderNumber).to.be.ok;
            });
        });
    });

});
