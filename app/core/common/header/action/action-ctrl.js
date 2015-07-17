/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('ActionController', ['$scope', 'auth', '$location', 'path', function($scope, auth, $location, path){
    var userInfo = (auth.getUserInfo() === null ? {logged : false} : auth.getUserInfo());

    $scope.path = path.url();
    $scope.showProfile = false;
    $scope.logout = function(){
        auth.logout($scope.path.logout,{username : userInfo.username})
            .then(function(result){
                $location.path('/');
                $scope.showProfile = false;
            }, function(msg){
                $location.path('/');
                $scope.showProfile = false;
            });
    };

    $scope.$on('logged', function(event, args) {
        $scope.userInfo = auth.getUserInfo();
        $scope.showProfile = $scope.userInfo.logged;
    });

    if(userInfo.logged){
        $scope.showProfile = true;
    }
}]);