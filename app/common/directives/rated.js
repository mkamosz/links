/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("rated", ['path', function(path){
    var path = path.url();

    return {
        restrict : "AE",
        scope : {
            dataList : '=list'
        },
        templateUrl: path.template.rated,
        replace : true,
        transclude : false,
        controller : ['$scope','conn','globalData', function($scope, conn, globalData){
            /* Pseudo global variables $scope.data */

            /* Private variables for this controller - $scope*/
            $scope.rated = {
                data: {},
                fn: {}
            }

            /* Functions */

        }]
    }
}]);

