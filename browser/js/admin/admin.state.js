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
