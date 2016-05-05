app.factory('CartFactory', function($rootScope, OrderFactory){

  var _cart, _cartId;

  return {

    createCart: function (cartId){

      this.refreshCart();
    },
    getCartId: function(){
      return _cartId;
    },
    refreshCart: function (){
      // if(_cartId)
      //   return OrderFactory.fetchById(_cartId)
      //   .then(function(res){
      //     _cart = res;
      //
      //     $rootScope.$broadcast('update-cart', _cart.products.length);
      //     return _cart;
      //   });
      return OrderFactory.getCart()
      .then(function(res){
        _cart = res;
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
      console.log(_cart.products)
     return _cart.products.reduce(function(prev, curr){

        prev += curr.product.price * curr.quantity;
        return prev;
      }, 0);

    }

  };

});
