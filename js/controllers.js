var testControllers = angular.module('testControllers', []);

testControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
  $http.get('js/data.json').success(function(data) {
    $scope.questions = data;
    $scope.artistOrder = 'name';
  });
}]);

testControllers.controller('DetailsController', ['$scope', '$http','$routeParams' ,function($scope, $http, $routeParams) {
  $http.get('js/data.json').success(function(data) {
    $scope.questions = data;
    $scope.whichItem = $routeParams.itemId;
	$scope.parseInt = parseInt;
	if($routeParams.itemId > 0){
		$scope.prevItem = Number($routeParams.itemId) - 1;
	}
	else{
		$scope.prevItem = $scope.questions.length - 1;
	}
	
	
	if($routeParams.itemId < $scope.questions.length-1){
		$scope.nextItem = Number($routeParams.itemId) + 1;
	}
	else{
		$scope.nextItem = 0;
	}
  });
}]);

testControllers.directive('mathJaxBind', function() {
  var refresh = function(element) {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, element]);
  };
  return {
    link: function(scope, element, attrs) {
      scope.$watch(attrs.mathJaxBind, function(newValue, oldValue) {
        element.text(newValue);
        refresh(element[0]);
      });
    }
  };
});