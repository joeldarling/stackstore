app.factory('ProductFactory', function($http){
  //beautiful

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

	ProductFactory.fetchReviewsByProduct = function(id){

    //shouldn't this be /api/products/:productId/reviews?
		return $http.get('/api/products/reviews/' + id)
		.then(function(response){
			var total = 0;
			response.data.forEach(function(review){
				total += review.rating;
			});
			var average = Math.floor(total/response.data.length);

			return {data: response.data, average: average};
		});
	};

	ProductFactory.addReview = function(id, user, rating, desc){
		return $http.post('/api/products/' + id + '/reviews', 
        {user: user, rating: rating, description: desc})
		.then(function(response){
			return response.data;
		});
	};

	ProductFactory.removeReview = function(id){
		return $http.delete('/api/products/reviews/' + id)
		.then(function(response){
			return response.data;
		});
	};

	ProductFactory.addProduct = function(product){
		return $http.post('/api/products', product)
		.then(function(response){
			return response.data;
		});
	};

	ProductFactory.deleteProduct = function(product){
		return $http.delete('/api/products/'+ product)
		.then(function(response){
			return response.data;
		});
	};

	ProductFactory.updateProduct = function(product){
		return $http.put('/api/products/'+ product._id, {update: product})
		.then(function(response){
			return response.data;
		});
	};

	return ProductFactory;

});
