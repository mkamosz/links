/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("loaderPage", ['path', function(path){
    var enableRouteChange = true,
        path = path.url();
    return {
        restrict : "E",
        scope : {
            state : "=stateLoader"
        },
        templateUrl: path.template.loader,
        replace : true,
        transclude : false,
        controller : ['$rootScope', '$scope', 'loaderService', function($rootScope, $scope, loaderService){

            /* Pseudo global variables $scope.data */

            /* Private variables for this controller - $scope*/
            $scope.loader = {
                data : {},
                fn : {}
            }

            /* Functions */


            if(enableRouteChange){
                $rootScope.$on("$routeChangeStart", function (event, next, current) {
                    $scope.state = "active";
                });

                $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
                    $scope.state = "";
                });

                $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
                    $scope.state = "";
                });

                enableRouteChange = false;
            }
        }]
    }
}]);