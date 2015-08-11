/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("followedUsers", ['path', function(path){
    var path = path.url();

    return {
        restrict : "AE",
        scope : {
            userInfo : '=userInfo',
            users : '=usersData',
            popularUsers : '@popular'
        },
        templateUrl: path.template.followed,
        replace : true,
        transclude : false,
        controller : ['$scope','conn','globalData', function($scope, conn){
            /* Pseudo global variables $scope.data */

            /* Private variables for this controller - $scope*/
            $scope.popularUsers = (typeof $scope.popularUsers === "undefined" ? false : $scope.popularUsers);
            $scope.followed = {
                data : {
                },
                fn : {}
            };

            /* Functions */

        }]
    }
}]);

