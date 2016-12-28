'use strict';

/* Controllers */

var mainControllers = angular.module('mainControllers', []);
mainControllers.controller('mainCtrl', ['$scope','Sources','User','$location','Position',
		function($scope, Sources,User,$location,Position,$window) {
			$scope.user ={};
			$scope.user.isAuthenticated = User.isAuthenticated();
			$scope.user.id = User.getCurrentId();
			User.getCurrent(function(user){
				console.log(user.id);
			});
			var map;
			if(User.isAuthenticated()){
				console.log(navigator.geolocation);
				navigator.geolocation.getCurrentPosition(function (position) {
					var lat = position.coords.latitude; 
					var lon = position.coords.longitude;
					console.log(lat);
					console.log(lon);
					$scope.position = Position.create({
						location: {lat: lat, lng: lon},
						date: new Date(),
						userId: User.getCurrentId()
					},function(){
						console.log("position created");
					},function(res){
						console.log(res);
					})
					map.setCenter({
						lat:lat,
						lng:lon
					})
					var marker = new google.maps.Marker({
						map: map,
						position: {lat:lat,lng:lon},
						title: 'Hello World!'
					});
					Position.find({
						filter:{
							where: {
								userId:User.getCurrentId()
							}
						}
					},function(data){
						console.log(data.length+" positions for this user retrieved");
						data.forEach(function(position){
							//console.log(position);
							var marker = new google.maps.Marker({
								map: map,
								position: {lat:position.location.lat,lng:position.location.lng}
							});

						})
					},function(res){
						console.log(res);
					});
				});
				$scope.initialize = function() {
					map = new google.maps.Map(document.getElementById('map'), {
						zoom: 12
					});
				}    
				google.maps.event.addDomListener(window, 'load', $scope.initialize);   
			}
		}]);
mainControllers.controller('loginCtrl', ['$scope','User','$location',
		function($scope,User,$location) {
			$scope.user ={};
			$scope.user.isAuthenticated = User.isAuthenticated();
			$scope.submit = function(){
				console.log($scope.email);
				var credentials = {
					email:$scope.email,
					password:$scope.password
				};
				$scope.user = User.login(credentials, function(){
					//console.log($scope.user.id);
					$location.path("/");
				},function(res){
					console.log(res);
				});

			}
		}]);
mainControllers.controller('logoutCtrl', ['$scope','User','$location',
		function($scope,User,$location) {
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
mainControllers.controller('signupCtrl', ['$scope','User','$location',
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
mainControllers.controller('deleteCtrl', ['$scope','User','$location',
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
