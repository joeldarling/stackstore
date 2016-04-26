app.config(function ($stateProvider) {

    // Register our *cart* state.
    $stateProvider.state('cart', {
        url: '/cart',
        controller: 'CartController',
        templateUrl: 'js/cart/cart.html',
        resolve:{
          cart: function(Session, OrderFactory){
              return OrderFactory.createCart(Session.user._id);
          }
        }
    });

});

app.controller('CartController', function($rootScope, $scope, cart, OrderFactory, CartFactory, Session){

  $scope.cart = cart;
  $scope.total = getTotal(cart.products);

  $scope.increaseQty = function(product){
    return OrderFactory.addOne(cart._id, product._id)
    .then(function(res){
      $scope.refreshCart();
    });
  };

  $scope.decreaseQty = function(product){
    return OrderFactory.removeOne(cart._id, product._id)
    .then(function(res){
      $scope.refreshCart();
    });

  };

  $scope.deleteItem = function(product){
    return OrderFactory.deleteItem(cart._id, product._id)
    .then(function(res){
      $scope.refreshCart();
    });
  };

  $scope.refreshCart = function (){

    CartFactory.refreshCart()
    .then(function(result){
      $scope.cart = result;
      $scope.total = CartFactory.getTotal();
    });

  };

});


function getTotal(products){

 return products.reduce(function(prev, curr){

    prev += curr.product.price * curr.quantity;
    return prev;
  }, 0);

}
