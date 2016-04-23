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

app.controller('CartController', function($scope, cart, OrderFactory){

  $scope.cart = cart;

  $scope.increaseQty = function(product){
    console.log(cart._id, product);
    return OrderFactory.addOne(cart._id, product)
    .then(function(res){
      $scope.cart = res;
    });
  };

  $scope.decreaseQty = function(product){
    console.log(cart._id, product);

    return OrderFactory.removeOne(cart._id, product)
    .then(function(res){
      $scope.cart = res;
    });

  };

});
