app.factory('CartFactory', function($rootScope, OrderFactory){

  //i'll give you another idea... what if you're always returning the same object for the _cart.... you can copy any updates into that object-- all ui changes will be looking at the same cart and you don't have to do any broadcasting..
  var _cart, _cartId;

  return {

    createCart: function (user){
      var self = this;
      return OrderFactory.createCart(user)
      .then(function(res){
        _cart = res;
        _cartId = res._id;
        self.refreshCart();
        return res;
      });
    },
    getCartId: function(){
      return _cartId;
    },
    refreshCart: function (){
      //would seem to me that CartFactory should be responsible for cart, instead of OrderFactory
      return OrderFactory.getCart()
      .then(function(res){
        _cart = res;
        _cartId = res._id;
        $rootScope.$broadcast('update-cart', _cart.products.length);
        return _cart;
      });
    },
    resetCart: function(){
      _cart = null;
      _cartId = null;
    },
    getCartQty: function(){
      if(_cart)
        return _cart.products.length;
    },
    getTotal: function(){
     return _cart.products.reduce(function(prev, curr){

        prev += curr.product.price * curr.quantity;
        return prev;
      }, 0);

    }

  };

});
