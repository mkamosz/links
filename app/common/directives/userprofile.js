/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("userProfile", ['path', function(path){
    var path = path.url();

    return {
        restrict : "AE",
        scope : {
            user : '=data',
            dataListLinks : '=list',
            dataListTags : '=tags'
        },
        templateUrl: path.template.userprofile,
        replace : true,
        controller : ['$scope','globalData', function($scope,globalData){
            /* Pseudo global variables $scope.data */

            /* Private variables for this controller - $scope*/

            $scope.userprofile = {
                data : {
                },
                path : path,
                fn : {}
            };
            /* Functions */

            //$watch because used $scope.userprofile.data.**** variables
            $scope.$watch('user', function() {
                if( $scope.user != null) {

                    $scope.userprofile.data.fullname = ($scope.user.name == '' ? $scope.user.username : $scope.user.name + " " + $scope.user.surname);
                    $scope.userprofile.data.city = ($scope.user.city == '' ? "" : $scope.user.city);
                    $scope.userprofile.data.country = ($scope.user.country == '' ? "" : " , " + $scope.user.country);
                    $scope.userprofile.data.avatar = (($scope.user.avatar == '' || typeof $scope.user.avatar === 'undefined') ? $scope.userprofile.path.imgContent+'icon_user.png' : $scope.userprofile.path.userProfile+$scope.user.avatar);

                    $scope.userprofile.data.fb = ($scope.user.fb == '' ? "" : $scope.user.fb);
                    $scope.userprofile.data.twitter = ($scope.user.twitter == '' ? "" : $scope.user.twitter);
                    $scope.userprofile.data.g = ($scope.user.g == '' ? "" : $scope.user.g);
                    $scope.userprofile.data.www = ($scope.user.www == '' ? "" : $scope.user.www);
                }
            });
            $scope.$watch('dataListTags', function() {
                if(typeof $scope.dataListTags !== 'undefined'){
                    $scope.userprofile.data.tagsCounter = Object.getOwnPropertyNames($scope.dataListTags).length;
                }
            });

        }]
    }
}]);

