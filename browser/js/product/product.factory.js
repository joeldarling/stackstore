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

	ProductFactory.fetchReviewsByProduct = function(id){

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
		return $http.post('/api/products/' + id + '/reviews', {user: user, rating: rating, description: desc})
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

	ProductFactory.addProduct = function(name, description, category, price, inventory, photo){
		return $http.post('/', {
			name: name,
			description: description,
			category: category,
			price: price,
			inventory: inventory,
			photo: photo
		})
		.then(function(response){
			return response.data;
		});
	};

	return ProductFactory;

});
