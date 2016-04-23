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
    controller: function($scope){
      $scope.addToCart = function(product){
        console.log('added item to cart', product._id);

      };
    }
  };

});
