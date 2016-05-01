app.directive('review', function(){

  return {
    restrict: 'E',
    templateUrl:'js/review/review.html',
    scope:{
      review:'='
    },
    controller: function($scope){
      $scope.getNumber = function(num) {
          return new Array(num);
      };
    }

  };
});
