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

app.controller('CartController', function($rootScope, $state, $scope, cart, OrderFactory, CartFactory, Session, ngToast){

  $scope.cart = cart;
  $scope.total = getTotal(cart.products);

  console.log(ngToast);


  $scope.increaseQty = function(product){
    console.log('order', $scope.cart._id);
    return OrderFactory.addOne($scope.cart._id, product._id)
    .then(function(res){
      $scope.refreshCart();
    });
  };

  $scope.decreaseQty = function(product){
    return OrderFactory.removeOne($scope.cart._id, product._id)
    .then(function(res){
      $scope.refreshCart();
    });

  };

  $scope.deleteItem = function(product){
    return OrderFactory.deleteItem($scope.cart._id, product._id)
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

  $scope.checkout = function(){
    OrderFactory.checkout(cart._id)
    .then(function(result){
        return OrderFactory.createCart(Session.user._id);
    })
    .then(function(newCart){
      ngToast.create('Order completed!');

      CartFactory.resetCart();
      CartFactory.createCart(newCart._id);
      $scope.refreshCart();
      $state.go('home');
    });
  };

});


function getTotal(products){

 return products.reduce(function(prev, curr){

    prev += curr.product.price * curr.quantity;
    return prev;
  }, 0);

}
