var myApp = angular.module('myApp', [
  'ngRoute',
  'testControllers',
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/subjects', {
    templateUrl: 'partials/subjects.html',
  }).
  when('/subjects/phy', {
    templateUrl: 'partials/list.html',
    controller: 'PhyController'
  }).
  when('/subjects/chem', {
    templateUrl: 'partials/list.html',
    controller: 'ChemController'
  }).
  when('/subjects/math', {
    templateUrl: 'partials/list.html',
    controller: 'MathController'
  }).
  when('/details/:itemId', {
	templateUrl: 'partials/details.html',
	controller: 'DetailsController'
  }).
  otherwise({
    redirectTo: '/subjects'
  });
}]);