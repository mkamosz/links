app.controller('IndexController',['$rootScope', '$scope', 'auth', 'path', function($rootScope, $scope, auth, path){
    $scope.userInfo = auth.getUserInfo();
    $scope.showFooter = true;

    $scope.path = path.url();
    $scope.actionUrl = $scope.path.core + 'common/header/action/action.tpl.html';

    $rootScope.$on("showFooter", function (event, data) {
        $scope.showFooter = data.show;
    });

}]);