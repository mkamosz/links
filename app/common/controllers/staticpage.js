/**
 * Created by kamoszm on 2015-07-20.
 */

app.controller('StaticPageController', ['$scope','globalData', function($scope,globalData){
    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();
    globalData.setPropData('layout','showFooter',true);
    globalData.setPropData('search','show',false);
    globalData.setPropData('search','placeholder','search');
    $scope.global.notifi.hide();


    /* Private variables for this controller - $scope*/
    $scope.static = {
        data : {},
        fn : {}
    };

    /* Functions */

}]);