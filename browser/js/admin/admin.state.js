app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'AdminController',
        templateUrl: 'js/admin/admin.html',
        resolve:{

          orders: function(OrderFactory){
            return OrderFactory.fetchAll();
          },
          users: function(UserFactory){
            return UserFactory.fetchAll();
          },
          products: function(ProductFactory){
            return ProductFactory.fetchAll();
          }

        }
    });

});

app.config(function ($stateProvider) {

    $stateProvider.state('admin.users', {
        url: '/users',
        controller: 'AdminUserController',
        templateUrl: 'js/admin/admin.users.html'
    });

});

app.config(function ($stateProvider) {

    $stateProvider.state('admin.products', {
        url: '/products',
        controller: 'AdminProductController',
        templateUrl: 'js/admin/admin.products.html',
        resolve: {
          categories: function(CategoryFactory){
            return CategoryFactory.fetchAll();
          }
        }
    });

});

app.config(function ($stateProvider) {

    $stateProvider.state('admin.orders', {
        url: '/orders',
        controller: 'AdminOrderController',
        templateUrl: 'js/admin/admin.orders.html',
    });

});
