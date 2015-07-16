app.controller('IndexController',['$scope', 'auth', function($scope, auth){
    $scope.userInfo = auth.getUserInfo();
    $scope.showMyProfile = true;
}]);