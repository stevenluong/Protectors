'use strict';

/* Controllers */

angular.module('mainControllers').controller('userMenuCtrl', ['$scope','User',
		function($scope, User) {
			$scope.user ={};
			var isAuthenticated = User.isAuthenticated();
			console.log("User Authenticated");
			$scope.user.isAuthenticated = isAuthenticated; 
			if(isAuthenticated){
				User.getCurrent(function(user){
					$scope.user.email = user.email;
					$scope.user.id= user.id;
				});
			}else{
				$scope.user.email = "Please Login";
				$scope.user.id= "x";
			}
		}]);

