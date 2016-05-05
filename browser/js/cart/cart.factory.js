app.factory('CartFactory', function($rootScope, OrderFactory){

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
      console.log('TOTAL',_cart)
     return _cart.products.reduce(function(prev, curr){

        prev += curr.product.price * curr.quantity;
        return prev;
      }, 0);

    }

  };

});
