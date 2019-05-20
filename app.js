//Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);
//Routes

 weatherApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when
  ('/', { 
      templateUrl:'pages/home.html',
      controller: 'homeController' })
  .when('/forecast', {
      templateUrl: 'pages/forecast.html',
      controller: 'forecastController' })
  .otherwise({
      redirectTo: '/' });
}]);

 //Services

 weatherApp.service('cityService', function() {
   this.city = " New York, NY";
 });

//Controller
weatherApp.controller('homeController', ['$scope','cityService',
 function($scope, cityService) {

      $scope.city = cityService.city;

      $scope.$watch('city', function() {
      	cityService.city = $scope.city;
      });
}]); 


weatherApp.controller('forecastController', ['$scope','$http','$routeParams','$resource','cityService',
 function($scope,$http, $resource, cityService) {
            
       $scope.city = cityService.city;

           $http.get("weather.json")
      .then(function(response) {
    // First function handles success
    $scope.weatherResult = response.data;
  }, function(response) {
    // Second function handles error
    $scope.weatherResult = "Something went wrong";
  });
   $scope.convertToFahrenheit = function(degk) {

    return Math.round((1.8 *(degk -273)) +32);
   }
   $scope.convertToDate = function (dt) {
     return new Date(dt);
   };
            
}]); 