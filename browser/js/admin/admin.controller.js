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

  $scope.adminAccess = function(user, status){

    if(status==='Yes'){
      UserFactory.updateStatus(user, 'No')
      .then(function(){
        $state.reload();
      });
    } else {
      UserFactory.updateStatus(user, 'Yes')
      .then(function(){
        $state.reload();
      });
    }

  };

});


app.controller('AdminProductController', function($scope, $state, CategoryFactory, ProductFactory, categories, ngToast){

  $scope.category = "";
  $scope.categories = categories;
  $scope.showCategories = true;
  $scope.newProduct = {category: $scope.categories[0]};

  $scope.updateProduct = {};


  $scope.createCategory = function(){

    CategoryFactory.addCategory($scope.category)
    .then(function(){
      $scope.category = "";
      $state.reload();
    });

  };

  $scope.createProduct = function(){
    ProductFactory.addProduct($scope.newProduct)
    .then(function(res){
      $scope.newProduct = {category: $scope.categories[0]};
      $state.reload();
    });

  };

  $scope.deleteProduct = function(product){
    ProductFactory.deleteProduct(product)
    .then(function(){
      $state.reload();
    });
  };

  $scope.updateProduct = function(product){

    ProductFactory.updateProduct(product)
    .then(function(){
      ngToast.create('Product updated!');
      $state.reload();
    });

  };


});
app.controller('AdminOrderController', function($scope, $state, OrderFactory){

  $scope.statusFilter = "";
  $scope.statusOptions = ['Created', 'Processing', 'Cancelled', 'Completed'];

  $scope.updateStatus = function(order, status){
    OrderFactory.updateStatus(order, status)
    .then(function(){
      $state.reload();
    });
  };
});
