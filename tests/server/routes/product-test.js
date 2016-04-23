// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Product = mongoose.model('Product');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var request = require('supertest-as-promised')(require('../../../server/app'));
var app = require('../../../server/app');

describe('Product Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

  describe('Product retrieval', function(){
    var product;

    beforeEach(function (done) {
  		Product.create({name: 'Product', price: 5})
      .then(function(_product_){
        product = _product_;
        done();
      });
  	});

    it('can retrieve full list of products', function(){
      return request.get('/api/products')
      .then(function(res){
        expect(res.body.length).to.equal(1);
      });
    });

    it('can retrieve an product by ID', function(){
      return request.get('/api/products/' + product._id)
      .then(function(res){
        expect(res.body.length).to.equal(1);
        expect(res.body.name).to.equal('Product');
        expect(res.body.price).to.equal(5);
      });
    });


  });

});
