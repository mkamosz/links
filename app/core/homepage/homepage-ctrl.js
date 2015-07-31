/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('HomepageController', ['$scope','globalData', function($scope,globalData){

    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();

    /* Private variables for this controller - $scope*/
    $scope.hp = {
        data : {},
        fn : {}
    };

    /*Functions*/

}]);