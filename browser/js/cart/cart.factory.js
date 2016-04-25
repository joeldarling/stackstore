app.factory('CartFactory', function(OrderFactory){

  var _cart, _cartId;

  return {

    createCart: function (cartId){
      _cartId = cartId;
      refreshCart();

    },
    refreshCart: function (){
      return _cart;
    },
    resetCart: function(){
      _cart = null;
    },
    getCartQty: function(){
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
