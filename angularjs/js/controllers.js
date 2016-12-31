'use strict';

/* Controllers */


angular.module("mainControllers").controller('mainCtrl', ['$scope','Sources','User','$location','Position',
        function($scope, Sources,User,$location,Position,$window) {
            $scope.user ={};
            $scope.user.isAuthenticated = User.isAuthenticated();
            $scope.user.id = User.getCurrentId();
            User.getCurrent(function(user){
                console.log(user);
            })
            var isAuthenticated = User.isAuthenticated();
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

            //User.getCurrent(function(user){
            //console.log(user.id);
            //});
            if(User.isAuthenticated()){
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12
                });

                navigator.geolocation.getCurrentPosition(function (position) {
                    var lat = position.coords.latitude; 
                    var lon = position.coords.longitude;
                    $scope.position = Position.create({
                        location: {lat: lat, lng: lon},
                        date: new Date(),
                        userId: User.getCurrentId()
                    },function(){
                        //console.log("position created");
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
                /*$scope.initialize = function() {
                  map =                 }    
                  google.maps.event.addDomListener(window, 'load', $scope.initialize);   
                  */
            }
        }]);

