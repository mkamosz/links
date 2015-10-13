/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("counter", ['path', function(path){
    var path = path.url();

    return {
        restrict : "AE",
        scope : {
            count : '=count',
            max : '=max'
        },
        templateUrl: path.template.counter,
        replace : true,
        transclude : false,
        controller : ['$scope', function($scope){
            /* Pseudo global variables $scope.data */

            /* Private variables for this controller - $scope*/
            $scope.counter = {
                data: {},
                fn: {}
            };
            /* Functions */
        }]
    }
}]);

