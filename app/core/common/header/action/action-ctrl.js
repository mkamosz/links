/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('ActionController', ['$scope', 'auth', '$location', function($scope, auth, $location){

    /* Pseudo global variables $scope.data */

    /* Private variables for this controller - $scope*/
    $scope.action = {
        fn : {}
    };

    /*Functions*/

    $scope.action.fn.logout = function(){
        auth.logout($scope.data.path.server.logout,{username : $scope.data.userInfo.username})
            .then(function(result){
                $location.path('/');
                $scope.data.userInfo = result.userInfo;
                $scope.data.layout.showProfile = auth.isLogin();
            }, function(msg){
                $location.path('/');
            });
    };

}]);