app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('product', {
        url: '/product',
        controller: 'ProductController',
        templateUrl: 'js/product/product.html',
        resolve:{
          products: function(ProductFactory){
            return ProductFactory.fetchAll();
          },
          categories: function(CategoryFactory){
            return CategoryFactory.fetchAll();
          }
        }
    });

});

app.config(function ($stateProvider) {

    // Register our *category* state.
    $stateProvider.state('category', {
        url: '/:categoryName/',
        templateUrl:'js/product/products.html',
        controller: function($scope, products, categories){

          $scope.products = products;
          $scope.categories = categories;

        },
        resolve:{

          products: function($stateParams, CategoryFactory){

            return CategoryFactory.fetchProductsInCategory($stateParams.categoryName);

          },
          categories: function(CategoryFactory){
            return CategoryFactory.fetchAll();
          }

        }

    });

});



app.controller('ProductController', function($scope, products, categories){

  $scope.products = products;
  $scope.categories = categories;

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
