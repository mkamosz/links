/**
 * Created by kamoszm on 2015-07-20.
 */

app.controller('MyProfileController', ['$scope','globalData', function($scope, globalData){
    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();
    globalData.setPropData('layout','showFooter',false);
    globalData.setPropData('search','show',false);
    globalData.setPropData('search','placeholder','search');
    globalData.setPropData('tagsSearch','tags','');
    $scope.global.notifi.hide();

    /* Private variables for this controller - $scope*/
    $scope.profile = {
        data : {},
        user :  globalData.getData('userData'),
        fn : {}
    };

    /* Functions */

}]);