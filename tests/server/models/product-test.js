var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Product = mongoose.model('Product');


describe('Product model', function () {

  beforeEach('Establish DB connection', function (done) {
      if (mongoose.connection.db) return done();
      mongoose.connect(dbURI, done);


  });

  afterEach('Clear test database', function (done) {
      clearDB(done);
  });

  it('should exist', function () {
      expect(Product).to.be.a('function');
  });

  describe('Properties', function(){

    var product;

    // beforeEach(function(done){
    //     console.log("inside beforeEach: ", Product);
    //     return Product.create({name: 'Test Product', description:'Description'})
    //     .then(function(_product_){
    //       product = _product_;
    //       console.log("product: ", product);
    //       done();
    //     });
    // });

    beforeEach(function(done){
        return Product.create({name: 'Test Product', price: 10, description:'Description'})
        .then(function(_product_){
          product = _product_;
           done();
        });

    });


    // beforeEach(function() {
    //   return Product.create({
    //     name: 'Test Product',
    //     description:'Description'
    //   })
    //   .then(function(_product_){
    //     product = _product_; 
    //     console.log("product: ", product);
    //   })
    // });

    it('has a name', function(){
      expect(product.name).to.equal('Test Product');
    });

    it('has a description', function(){
      expect(product.description).to.equal('Description');
    });

  });


});
