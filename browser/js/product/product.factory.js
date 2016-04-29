app.factory('ProductFactory', function($http){

	var ProductFactory = {};

	ProductFactory.fetchAll = function(){
		return $http.get('/api/products')
		.then(function(response){
			return response.data;
		});
	};

	ProductFactory.fetchById = function(id){
		return $http.get('/api/products/' + id)
		.then(function(response){
			return response.data;
		});
	};

	ProductFactory.delete = function(id){
		return $http.delete('/api/products/' + id)
		.then(function(response){
			return response.data;
		});
	};

	ProductFactory.fetchReviewById = function(){
		return $http.get('/api/products/' + id + 'reviews')
		.then(function(response){
			return response.data;
		});
	};

	ProductFactory.addReview = function(user, rating, desc){
		return $http.post('/api/products/' + id + 'reviews', {user: user, rating: rating, description: desc})
		.then(function(response){
			return response.data;
		});
	};	

	ReviewFactory.removeReview = function(id){
		return $http.delete('/api/products/' + id + 'reviews')
		.then(function(response){
			return response.data;
		});
	};

	return ProductFactory;

});