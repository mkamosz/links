/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('ActionController', ['$scope', 'auth', '$location', function($scope, auth, $location){
    var userInfo = (auth.getUserInfo() === null ? {logged : false} : auth.getUserInfo());

    $scope.showProfile = false;
    $scope.logout = function(){
        auth.logout('/server/login',{username : userInfo.username})
            .then(function(result){
                $location.path('/');
                $scope.showProfile = false;
            }, function(msg){
                $location.path('/');
                $scope.showProfile = false;
            });
    };

    $scope.$on('logged', function(event, args) {
        userInfo = auth.getUserInfo();
        $scope.showProfile = userInfo.logged;
    });

    if(userInfo.logged){
        $scope.showProfile = true;
    }
}]);