app.factory('UserFactory', function($http){

  return {
    fetchById: function(id){
      return $http.get('/api/users/' + id)
      .then(function(res){
        return res.data;
      });
    },

    addUser: function(email, status, address, city, state, zip){
    	return $http.post('/api/users', {
    		email: email,
    		status: status,
    		address: address,
    		city: city,
    		state: state,
    		zip: zip
    	})
    	.then(function(response){
    		return response.data;
    	});
    },

    updateStatus: function(id, status){
    	return $http.put('/api/users/status/' + id, {status: status})
    	.then(function(response){
    		return response.data;
    	});
    },

    triggerPasswordReset: function(id){
     	return $http.put('/api/users/passwordreset/' + id)
    	.then(function(response){
    		return response.data;
    	});   	
    },

    updatePassword: function(id, password){
      	return $http.put('/api/users/password/' + id, {password: password})
    	.then(function(response){
    		return response.data;
    	});     	
    },

    deleteUser: function(id){
     	return $http.delete('/api/users/' + id)
    	.then(function(response){
    		return response.data;
    	});   	
    }

  };
});
