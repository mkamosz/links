/**
 * Created by kamoszm on 2015-07-20.
 */

app.controller('MyProfileController', ['$scope','globalData', function($scope, globalData){
    /* Pseudo global variables $scope.data */
    globalData.setPropData('layout','showFooter',false);

    /* Private variables for this controller - $scope*/
    $scope.profile = {
        data : {},
        user :  globalData.getData('userData'),
        fn : {}
    };

    /* Functions */

}]);