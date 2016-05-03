app.controller('AdminController', function($scope, users, products, orders){

  $scope.users = users;
  $scope.products = products;
  $scope.orders = orders;

});

app.controller('AdminUserController', function($scope, $state, UserFactory){

  $scope.formData = {admin: 'No', address:'Address', city:'City', state:'State', zip:'12345'};

  $scope.createUser = function(){

    UserFactory.addUser($scope.formData.email, $scope.formData.admin, $scope.formData.address, $scope.formData.city, $scope.formData.state, $scope.formData.zip)
    .then(function(res){
      //reset form
      $scope.formData = {admin: 'No', address:'Address', city:'City', state:'State', zip:'12345'};
      $state.reload();
    });

  };

  $scope.deleteUser = function(user){

    UserFactory.deleteUser(user)
    .then(function(){
      $state.reload();
    });

  };

  $scope.triggerReset = function(user){

    UserFactory.triggerPasswordReset(user)
    .then(function(){

    });

  };

  $scope.validateEmail = function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

});
app.controller('AdminProductController', function($scope){


});
app.controller('AdminOrderController', function($scope){



});
