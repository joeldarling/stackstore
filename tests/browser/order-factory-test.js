describe('OrderFactory', function(){


  //get the app
  beforeEach(module('FullstackGeneratedApp'));

  //get tools
  var $httpBackend;
  var $rootScope;

  beforeEach('Get tools', inject(function (_$httpBackend_, _$rootScope_) {
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;

  }));

  afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
  });

  //get the Factory
  var OrderFactory;

  beforeEach(inject(function (_OrderFactory_) {
      OrderFactory = _OrderFactory_;
  }));

  it('should be an object', function(){

    expect(OrderFactory).to.be.an('object');

  });

  describe('on successful response', function(){

    it('can get a GET list of orders', function(){

      var orders;

      $httpBackend.expectGET('/api/orders').respond([{orderNumber:'FDS432'},{orderNumber:'OIFA987'}]);

      OrderFactory.fetchAll()
      .then(function(_orders){
        orders = _orders;
      });

      $httpBackend.flush();

      expect(orders.length).to.equal(2);

      expect(orders[0].orderNumber).to.equal('FDS432');

    });
  });


});
