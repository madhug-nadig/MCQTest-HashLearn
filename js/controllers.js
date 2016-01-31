var testControllers = angular.module('testControllers', []);

testControllers.controller('MathController', ['$scope', '$http','$rootScope' ,function($scope, $http, $rootScope) {
  $http.get('js/data/cat-math.json').success(function(data) {
    $scope.categories = data;
   });
    $scope.a = 0
    $rootScope.cat = $scope.a;
    $scope.$watch('a',function () {
    $rootScope.cat = $scope.a;
    //called here your factory SERVICE which hold this chnages  valued
    //You can use this SERVICE to accec updated value.
   });
   $scope.al = function(){
      alert($scope.a);
   };
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

testControllers.controller('DetailsController', ['$scope', '$http','$routeParams', '$timeout','$rootScope' ,function($scope, $http, $routeParams, $timeout, $rootScope) {
  $http.get('http://staging-now.hashlearn.com/v1/content/practice/categoryQuestions/?catid=91').success(function(data) {
  $scope.questions = data;
  console.log(data);
  $scope.whichItem = $routeParams.itemId;
	$scope.parseInt = parseInt;
  });

  $scope.catno = $rootScope.cat;
  $scope.counter = $scope.catno * 9 * 60;
  $scope.onTimeout = function(){
  if (--$scope.counter > 0) {
    $timeout($scope.onTimeout, 1000);
  } else {
      alert('Submitted!');
  }
}
    $timeout($scope.onTimeout, 1000);
}]);


testControllers.filter('formatTimer', function() {
  return function(input)
    {
        function z(n) {return (n<10? '0' : '') + n;}
        var seconds = input % 60;
        var minutes;
        var forh = Math.floor(input / 60);
        if(input /60 > 60){
            minutes = Math.floor(input / 60)%60;
        }
        else{
            minutes = Math.floor(input / 60);
        }
        var hours = Math.floor(forh / 60);
        return (z(hours) +':'+z(minutes)+':'+z(seconds));
    };
});

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