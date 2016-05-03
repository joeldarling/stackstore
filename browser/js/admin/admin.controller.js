app.controller('AdminController', function($scope, users, products, orders){

  $scope.users = users;
  $scope.products = products;
  $scope.orders = orders;

});

app.controller('AdminUserController', function($scope){


});
app.controller('AdminProductController', function($scope){
  console.log($scope.products)

});
app.controller('AdminOrderController', function($scope){



});
