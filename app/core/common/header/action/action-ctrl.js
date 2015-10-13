/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('ActionController', ['$scope', 'auth', '$location','globalData', function($scope, auth, $location, globalData){

    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();

    /* Private variables for this controller - $scope*/
    $scope.userInfo = $scope.global.userInfo;
    $scope.action = {
        fn : {}
    };

    /*Functions*/

    $scope.action.fn.logout = function(){
        auth.logout($scope.global.path.server.logout,{username : $scope.global.userInfo.username})
            .then(function(result){
                $location.path('/');
                globalData.setData('userInfo',result.userInfo);
                globalData.setPropData('layout','showProfile',$scope.global.userInfo.logged);
            }, function(msg){
                $location.path('/');
            });
    };

}]);