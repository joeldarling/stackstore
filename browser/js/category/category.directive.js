app.directive('categoryChooser', function(){

  return {
    restrict: 'E',
    scope: {
      categories: '=',
      search: '='
    },
    templateUrl: '/js/category/category-chooser.html',
    controller: function($scope, filterService){

      $scope.filterService = filterService;

    }


  };
});

app.service('filterService', function(){

  return {

    filter: ''

  };

});
