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
    return OrderFactory.addOne(cart._id, product)
    .then(function(res){
      $scope.cart = res;
      $scope.total = getTotal($scope.cart.products);
    });
  };

  $scope.decreaseQty = function(product){
    return OrderFactory.removeOne(cart._id, product)
    .then(function(res){
      $scope.cart = res;
      $scope.total = getTotal($scope.cart.products);
    });

  };

});

function getTotal(products){

  var total;

  products.forEach(function(item){
    console.log(item)
    total += (+item.price * +item.quantity);
  });

  return total;
}
