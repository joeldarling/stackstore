app.controller('UserAccountController', function($scope, user){

  $scope.user = user.user;
  $scope.orders = user.orders;
  $scope.showHistory = true;

});
