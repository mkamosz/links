/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("loaderPage", [function(){
    var enableRouteChange = true;
    return {
        restrict : "E",
        scope : {
            text : "@"
        },
        templateUrl: 'core/common/loader/loader.tpl.html',
        replace : true,
        transclude : false,
        controller : ['$rootScope', '$scope', function($rootScope, $scope){

            if(enableRouteChange){
                $rootScope.$on("$routeChangeStart", function (event, next, current) {
                    $scope.loader = {
                        message : "Loading....",
                        active : "active"
                    };
                });

                $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
                    $scope.loader = {
                        message : "",
                        active : ""
                    };
                });

                $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
                    $scope.loader = {
                        message : "",
                        active : ""
                    };
                });
                enableRouteChange = false;
            }
        }]
    }
}]);