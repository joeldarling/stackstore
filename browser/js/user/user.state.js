app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('account', {
        url: '/account',
        controller: 'UserAccountController',
        templateUrl: 'js/user/user.account.html',
        resolve:{
          user: function(Session, UserFactory){
            return UserFactory.fetchById(Session.user._id);
          },
          categories: function(CategoryFactory){
            return CategoryFactory.fetchAll();
          }
        }
    });

});

app.config(function ($stateProvider) {

    // Register our *signup* state.
    $stateProvider.state('signup', {
        url: '/signup',
        controller: 'UserSignupController',
        templateUrl: 'js/user/user.signup.html',
        resolve:{
          
        }
    });

});
