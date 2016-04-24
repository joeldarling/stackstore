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
  $scope.total = getTotal(cart.products);

  $scope.increaseQty = function(product){
    return OrderFactory.addOne(cart._id, product._id)
    .then(function(res){
      $scope.refreshCart();
      $scope.total = getTotal($scope.cart.products);
    });
  };

  $scope.decreaseQty = function(product){
    return OrderFactory.removeOne(cart._id, product._id)
    .then(function(res){
      $scope.refreshCart();
      $scope.total = getTotal($scope.cart.products);
    });

  };

  $scope.refreshCart = function (){
    OrderFactory.fetchById($scope.cart._id)
    .then(function(result){
      $scope.cart = result;
    });

  };

});


function getTotal(products){

  // TODO
}
