app.controller('AdminController', function($scope, users, products, orders){

  $scope.users = users;
  $scope.products = products;
  $scope.orders = orders;

  $scope.state = 'Users';

});
