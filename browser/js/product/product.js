app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('product', {
        url: '/product',
        controller: 'ProductController',
        templateUrl: 'js/product/product.html',
        resolve:{
          products: function(ProductFactory){
            return ProductFactory.fetchAll();
          }
        }
    });

});

app.controller('ProductController', function($scope, products){

  $scope.products = products;

});

app.directive('product', function(){

  return {
    restrict: 'E',
    templateUrl: 'js/product/product-list-item.html',
    scope: {
      product: '='
    },
    controller: function($scope, $rootScope, Session, OrderFactory, CartFactory, ngToast){
      $scope.addToCart = function(product){
        OrderFactory.addOne(CartFactory.getCartId(), product)
        .then(function(result){
          CartFactory.refreshCart();
          ngToast.create('Added to cart!');

        });
      };
    }
  };

});
