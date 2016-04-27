app.factory('CategoryFactory', function($http){

  return {
    fetchAll: function(){

      return $http.get('/api/categories')
      .then(function(list){
        return list.data;
      });

    },
    fetchProductsInCategory: function(name){

      return $http.get('/api/categories/' + name)
      .then(function(products){
        return products.data;
      });

    }

  };

});
