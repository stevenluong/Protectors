'use strict';

/* Controllers */


angular.module("mainControllers").controller('mainCtrl', ['$scope','Sources','User','$location','Position',
        function($scope, Sources,User,$location,Position,$window) {
            /*
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
            */
            var userId = 1;
            $scope.userId = userId;
        }]);

