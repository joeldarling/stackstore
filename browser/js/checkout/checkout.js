
app.config(function ($stateProvider) {
  $stateProvider
    .state('checkout', {
      url: '/checkout',
      templateUrl: 'js/checkout/checkout.html',
      controller: 'CheckoutController',
      resolve: {
        cart: function(OrderFactory){
            return OrderFactory.getCart();
        }
      }
    });
});


app.controller('CheckoutController', function($rootScope, $state, $scope, cart, OrderFactory, CartFactory, UserFactory, Session, ngToast){
  $scope.cart = cart;
  $scope.total = CartFactory.getTotal();

    $scope.handleStripe = function(status, response){
 
        if(response.error) {
          console.log("response error", response.error);
            $scope.paymentError= true;
            $scope.message = "Invalid card"
        } else {
            var $payInfo = {
                'token' : response.id,
                'total':$scope.total
            };
            console.log("stripe completed successfully: ", $payInfo);
            $scope.checkout();
        }
    };


  $scope.checkout = function(){
    OrderFactory.checkout(CartFactory.getTotal(), $rootScope.formData)
    .then(function(result){
        return OrderFactory.createCart();
    })
    .then(function(newCart){
      ngToast.create('Order completed!');

      CartFactory.createCart();
      $rootScope.refreshCart();
      $state.go('home');
    });
  };


});
