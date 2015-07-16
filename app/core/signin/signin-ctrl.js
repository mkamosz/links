/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('SigninController', ['$rootScope', '$scope','auth','$location', function($rootScope, $scope, auth, $location){

    $scope.data = {};
    $scope.error = {
        show : false,
        msg : ""
    };

    console.log($rootScope)

    $scope.signin = function(){
        auth.login('/server/login', $scope.data)
            .then(function(result){
                if(result.authenticated == true){
                    $location.path("/");

                }
            }, function(result) {
                if(result.authenticated == false){
                    $scope.error.show = true;
                    $scope.error.msg = result.message;
                    $scope.data = {};
                }
            });
    };
}]);