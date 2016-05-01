app.config(function ($stateProvider) {

    $stateProvider.state('products', {
        url: '/products',
        controller: 'ProductController',
        templateUrl: 'js/product/products.html',
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

    $stateProvider.state('productDetail', {
        url: '/product/:productid',
        controller: 'ProductDetailController',
        templateUrl: 'js/product/product.html',
        resolve:{
          product: function($stateParams, ProductFactory){
            return ProductFactory.fetchById($stateParams.productid);
          },
          categories: function(CategoryFactory){
            return CategoryFactory.fetchAll();
          },
          reviews: function($stateParams, ProductFactory){
            return ProductFactory.fetchReviewsByProduct($stateParams.productid);
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



app.controller('ProductController', function($scope, categories, products){

  $scope.products = products;
  $scope.categories = categories;
});

app.controller('ProductDetailController', function($scope, CartFactory, OrderFactory, ngToast, reviews, product, categories){

  $scope.product = product;
  $scope.categories = categories;
  $scope.showReviews;
  $scope.reviews = reviews.data;

  $scope.canReview = true;
  $scope.formData = {rating: 3, description: ""};

  $scope.submitReview = function(){


  };

  $scope.addToCart = function(product){
    OrderFactory.addOne(CartFactory.getCartId(), product)
    .then(function(result){
      CartFactory.refreshCart();
      ngToast.create('Added to cart!');

    });
  };

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
