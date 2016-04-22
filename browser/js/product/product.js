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

  console.log(products);


});
