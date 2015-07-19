/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('SigninController', ['$rootScope', '$scope','auth','$location', 'path', function($rootScope, $scope, auth, $location,path){

    $scope.path = path.url();
    $scope.data = {};
    $scope.error = {
        show : false,
        msg : ""
    };

    $scope.signin = function(){
        auth.login($scope.path.server.login, $scope.data)
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