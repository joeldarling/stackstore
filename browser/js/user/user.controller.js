app.controller('UserAccountController', function($scope, user){

  $scope.user = user.user;
  $scope.orders = user.orders;
  $scope.showHistory;

});


app.controller('UserSignupController', function($scope, $state, UserFactory){

  $scope.formData = {};

  $scope.createUser = function(){

    UserFactory.addUser($scope.formData.email, false, $scope.formData.address, $scope.formData.city, $scope.formData.state, $scope.formData.zip)
    .then(function(res){
      $state.go('login');
    });

  };

  $scope.validateEmail = function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  $scope.validatePassword = function(){
    if(!$scope.formData.password)
      return false;

    return $scope.formData.password === $scope.formData.passwordVerify;
  };


});
