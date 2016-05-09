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


	OrderFactory.getCart = function(){
		return $http.get('/api/orders/cart')
		.then(function(res){
			return res.data;
		});
	};
	OrderFactory.createCart = function(user){
		return $http.post('/api/orders/', {user: user})
		.then(function(response){
			return response.data;
		});
	};

	OrderFactory.addOne = function(id, product, price){
		return $http.put('/api/orders/', {productid: product, price: price, action: "add"})
		.then(function(response){
			return response.data;
		});
	};

	OrderFactory.deleteItem = function(id, product){
		return $http.put('/api/orders/', {productid: product, action: "delete"})
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

	OrderFactory.checkout = function(total, orderInfo){
		return $http.put('/api/orders/checkout/', {

			orderInfo: orderInfo,
			total: total
		})
		.then(function(response){
			return response.data;
		});
	};

	OrderFactory.updateStatus = function(id, status){
		return $http.put('/api/orders/status/' + id, {status: status})
		.then(function(response){
			return response.data;
		});
	};

	return OrderFactory;

});
