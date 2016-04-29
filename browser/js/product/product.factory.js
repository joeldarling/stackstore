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

	ProductFactory.fetchReviewsByProduct = function(){
		return $http.get('/api/products/' + id + 'reviews')
		.then(function(response){
			var total = 0;
			response.data.forEach(function(review){
				total += review.rating;
			})
			var average = Math.floor(total/response.data.length));

			return {data: response.data, average: average};
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