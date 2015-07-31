/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('DashboardController', ['$scope','globalData', function($scope,globalData){
    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();

    /* Private variables for this controller - $scope*/
    $scope.dashboard = {
        data : {},
        fn : {}
    };


    /*Functions*/
    globalData.refreshUserData();
}]);