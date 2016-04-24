app.factory('OrderFactory', function($http){

	var OrderFactory = {};

	OrderFactory.fetchAll = function(){
		return $http.get('/api/orders')
		.then(function(response){
			return response.data;
		});
	};

	OrderFactory.fetchById = function(id){
		return $http.get('/api/orders/' + id)
		.then(function(response){
			return response.data;
		});
	};

	OrderFactory.deleteCart = function(id){
		return $http.delete('/api/orders' + id)
		.then(function(response){
			return response.data;
		});
	};



	OrderFactory.createCart = function(user){
		return $http.post('/api/orders/', {user: user})
		.then(function(response){
			return response.data;
		});
	};

	OrderFactory.addOne = function(id, product){
		return $http.put('/api/orders/' + id, {productid: product, action: "add"})
		.then(function(response){
			return response.data;
		});
	};

	OrderFactory.deleteItem = function(id, product){
		return $http.put('/api/orders/' + id, {productid: product, action: "delete"})
		.then(function(response){
			return response.data;
		});

	};

	OrderFactory.removeOne = function(id, product){
		return $http.put('/api/orders/' + id, {productid: product, action: "remove"})
		.then(function(response){
			return response.data;
		});
	};

	return OrderFactory;

});
