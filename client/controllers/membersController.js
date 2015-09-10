angular.module('app')
  .controller('MembersCtrl', ['$scope', '$state', 'appFact', '$http', function($scope, $state, appFact, $http){
    $scope.Model = {
      categories : ["Client", "Contractor"],
    }
    if(appFact.category === 'Client'){
      $http.post('/clientAllProj', appFact.profile)
        .then(function(response){
          $scope.filteredProj = {};
          response.data.reduce(function(memo, current){
            memo[current.category] ? memo[current.category].push(current) 
                : memo[current.category] = [current];
            return memo;
          }, $scope.filteredProj);
          // console.log('filtered Projects', $scope.filteredProj);
          $scope.accountType = appFact.category
          $scope.projects = response.data;
          appFact.projects = response.data;
          $scope.profile = appFact.profile;
          $scope.userData = appFact.userData;
          $state.go('index.list.overview');
        });
    }
    if(appFact.category === 'ServiceProvider'){
      $http.post('/openProjwCat', {category: appFact.userData.specialty})
        .then(function(projects){
          $scope.projects = projects.data;
          appFact.projects = projects.data;
        });
      $scope.accountType = appFact.category;
      $scope.userData = appFact.userData;
      $scope.profile = appFact.profile;
      $state.go('index.list.overview');
    }
}]);