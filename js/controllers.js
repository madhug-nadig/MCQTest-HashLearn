var testControllers = angular.module('testControllers', []);

testControllers.controller('MathController', ['$scope', '$http','$rootScope' ,function($scope, $http, $rootScope) {
  $http.get('js/data/cat-math.json').success(function(data) {
    $scope.categories = data;
   });
    $scope.a = 0
    $rootScope.cat = $scope.a;
    $scope.$watch('a',function () {
    $rootScope.cat = $scope.a;
   });
   $scope.al = function(){
      alert($scope.a);
   };
}]);

testControllers.controller('ChemController', ['$scope', '$http', '$rootScope',function($scope, $http, $rootScope) {
  $http.get('js/data/cat-chem.json').success(function(data) {
    $scope.categories = data;
  });

   $scope.a = 0
    $rootScope.cat = $scope.a;
    $scope.$watch('a',function () {
    $rootScope.cat = $scope.a;
   });
   $scope.al = function(){
      alert($scope.a);
   };

}]);

testControllers.controller('PhyController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
  $http.get('js/data/cat-phy.json').success(function(data) {
    $scope.categories = data;
  });

   $scope.a = 0
    $rootScope.cat = $scope.a;
    $scope.$watch('a',function () {
    $rootScope.cat = $scope.a;   
   });
   $scope.al = function(){
      alert($scope.a);
   };

}]);

testControllers.controller('DetailsController', ['$scope', '$http','$routeParams', '$timeout','$rootScope' ,function($scope, $http, $routeParams, $timeout, $rootScope) {
  $http.get('http://staging-now.hashlearn.com/v1/content/practice/tutor/categoryQuestions/?catid=91').success(function(data) {
  $scope.questions = data;
  $scope.questions = $scope.questions.data;
  //$scope.question = $scope.randomizeThree($scope.questions);
  console.log($scope.questions);
  $scope.whichItem = $routeParams.itemId;
	$scope.parseInt = parseInt;
  
  $scope.randomizeThree = function(arr) {
            alert("Hello");

    var result = new Array(3),
        len = arr.length,
        taken = new Array(len);
        n = 3;
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
 };

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


  $scope.validate = function(pos, index){
    if(pos == $scope.questions[index].text.opts.answer){ 
      alert('correct');
    }
    else{
      alert("wrong!");
    }
  };

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