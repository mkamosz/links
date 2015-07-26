/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("notifiInfo", ['path', function(path){
    var path = path.url();
    return {
        restrict : "AE",
        scope : {
            data : "=notifiData"
        },
        templateUrl: path.template.notifi,
        replace : true,
        transclude : false,
        controller : ['$scope', function($scope){

            /* Pseudo global variables $scope.data */

            /* Private variables for this controller - $scope*/
            $scope.notifi = {
                data : {},
                fn : {}
            };

            /* Functions */

        }]
    }
}]);