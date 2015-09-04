
angular.module('app')
.controller('projCtrl', ['$scope', '$stateParams', 'appFact', '$state', '$http', '$timeout',
  function($scope, $stateParams, appFact, $state, $http, $timeout){
  $scope.postProject = function(){
    var projData = {};
    projData.description  = $scope.description;
    projData.date         = $scope.date;
    projData.address      = $scope.address;
    projData.phone        = appFact.profile.phone;
    projData.name         = $scope.name;
    projData.time         = $scope.time;
    projData.category     = $scope.category;
    projData.ClientUserId = appFact.profile.user_id;

    $http.post('/createProject', projData).then(function(){
      $state.go('index.list.overview');
    });
  };
}]);