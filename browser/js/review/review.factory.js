app.factory('ReviewFactory', function($http){

	var ReviewFactory = {};

	ReviewFactory.fetchAll = function(){
		return $http.get('/api/reviews')
		.then(function(response){
			return response.data;
		});
	};

	ReviewFactory.fetchByProduct = function(id){
		return $http.get('/api/reviews/' + id)
		.then(function(response){
			return response.data;
		});
	};

	ReviewFactory.add = function(user, product, rating, desc){
		return $http.post('/api/reviews', {user: user, product: product, rating: rating, description: desc})
		.then(function(response){
			return response.data;
		});
	};

	ReviewFactory.remove = function(id){
		return $http.delete('/api/reviews/' + id)
		.then(function(response){
			return response.data;
		});
	};

	return ReviewFactory;

});
