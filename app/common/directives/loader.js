/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("loaderPage", ['path', function(path){
    var enableRouteChange = true,
        path = path.url();
    return {
        restrict : "E",
        scope : {
            text : "@"
        },
        templateUrl: path.template.loader,
        replace : true,
        transclude : false,
        controller : ['$rootScope', '$scope', 'loaderService', function($rootScope, $scope, loaderService){

            if(enableRouteChange){
                $rootScope.$on("$routeChangeStart", function (event, next, current) {
                    $scope.loader = loaderService.active()
                });

                $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
                    $scope.loader = loaderService.inactive();
                });

                $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
                    $scope.loader = loaderService.inactive();
                });

                $rootScope.$on("loaderActive", function () {
                    $scope.loader = loaderService.active();
                });

                $rootScope.$on("loaderInactive", function () {
                    $scope.loader = loaderService.inactive();
                });


                enableRouteChange = false;
            }
        }]
    }
}]);