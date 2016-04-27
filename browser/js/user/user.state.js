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
