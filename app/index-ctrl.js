app.controller('IndexController',['$scope', 'auth', 'path', function($scope, auth, path){
    $scope.userInfo = auth.getUserInfo();

    $scope.path = path.url();
    $scope.actionUrl = $scope.path.core + 'common/header/action/action.tpl.html';

}]);