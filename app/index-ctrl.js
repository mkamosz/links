app.controller('IndexController',['$scope', 'globalData', function($scope, globalData){
    /* IndexController - main controller
    *  with set pseudo global variables for rest controllers
    * */

    $scope.global = globalData.getData();

}]);