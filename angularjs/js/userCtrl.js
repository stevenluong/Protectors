'use strict';

/* Controllers */

angular.module("mainControllers").controller('loginCtrl', ['$scope','User','$location','$window',
		function($scope,User,$location,$window) {
			$scope.user ={};
			$scope.user.isAuthenticated = User.isAuthenticated();
			$scope.submit = function(){
				console.log($scope.email);
				var credentials = {
					email:$scope.email,
					password:$scope.password
				};
				$scope.user = User.login(credentials, function(user){
					//console.log($scope.user.id);
					console.log(user.userId);
					console.log(user.id);
					//$scope.user.id = User.getCurrentId();
					$location.path("/");
				},function(res){
					console.log(res);
				});

			}
		}]);
angular.module("mainControllers").controller('logoutCtrl', ['$scope','User','$location','$window',
		function($scope,User,$location,$window) {
			$scope.user ={};
			$scope.user.isAuthenticated = User.isAuthenticated();
			User.logout(function(){
				console.log("OK");
				$location.path("/");
			},function(res){
				console.log(res);
			});

		}
]);
angular.module("mainControllers").controller('signupCtrl', ['$scope','User','$location',
		function($scope,User,$location) {
			$scope.user ={};
			$scope.user.isAuthenticated = User.isAuthenticated();
			$scope.submit = function(){
				var credentials = {
					email:$scope.email,
					password:$scope.password
				};
				$scope.user = User.create(credentials, function(){
					console.log($scope.user.id);
					console.log("OK");
					$location.path("/login");
				},function(res){
					console.log(res);
				});

			}
		}]);
angular.module("mainControllers").controller('deleteCtrl', ['$scope','User','$location',
		function($scope,User,$location) {
			$scope.submit = function(){
				var credentials = {
					email:$scope.email,
					password:$scope.password
				};
				User.login(credentials, function(){
					console.log("User logged in");
					User.deleteById({id:User.getCurrentId()}, function(){
						console.log("User deleted");
					},function(res){
						console.log(res);
					});
					$location.path("/");
				},function(res){
					console.log(res);
				});

			}
		}]);
