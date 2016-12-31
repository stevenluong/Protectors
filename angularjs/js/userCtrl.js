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
					User.deleteById({id:User.getCurrentId()}, function(){
					},function(res){
						console.log(res);
					});
					$location.path("/");
				},function(res){
					console.log(res);
				});

			}
		}]);
