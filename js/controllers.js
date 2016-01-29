var testControllers = angular.module('testControllers', []);

testControllers.controller('MathController', ['$scope', '$http', function($scope, $http) {
  $http.get('js/data/cat-math.json').success(function(data) {
    $scope.categories = data;

  });
}]);

testControllers.controller('ChemController', ['$scope', '$http', function($scope, $http) {
  $http.get('js/data/cat-chem.json').success(function(data) {
    $scope.categories = data;

  });
}]);

testControllers.controller('PhyController', ['$scope', '$http', function($scope, $http) {
  $http.get('js/data/cat-phy.json').success(function(data) {
    $scope.categories = data;

  });
}]);

testControllers.controller('DetailsController', ['$scope', '$http','$routeParams' ,function($scope, $http, $routeParams) {
  $http.get('http://sec.geazy.com/ws/getQuestion.php?apikey=12345&catid=91&sig=ZYRFa10v%2BaMUY%2F%2BITSAgiGZWfIA%3D').success(function(data) {
  $scope.questions = data;
  console.log(data);
  $scope.whichItem = $routeParams.itemId;
	$scope.parseInt = parseInt;
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