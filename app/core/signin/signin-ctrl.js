/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('SigninController', ['$scope','auth','$location', function($scope, auth, $location){

    /* Pseudo global variables $scope.data */
    $scope.data.layout.showFooter = false;

    /* Private variables for this controller - $scope*/
    $scope.signin = {
        data : {},
        error : {
            show : false,
            msg : ""
        },
        fn : {}
    };

    /* Functions */

    /*Signin form*/
    $scope.signin.fn.form = function(){
        $scope.data.loader.show();
        auth.login($scope.data.path.server.login, $scope.signin.data)
            .then(function(result){
                if(result.authenticated == true){
                    $location.path("/");
                    $scope.data.layout.showProfile = auth.isLogin();
                }
                $scope.data.loader.hide();
            }, function(result) {
                if(result.authenticated == false){
                    $scope.signin.error.show = true;
                    $scope.signin.error.msg = result.message;
                    $scope.signin.data = {};
                }
                $scope.data.loader.hide();
            });
    };

    /*hide errors*/
    $scope.signin.fn.hideErrors = function(){
        $scope.signin.error.show=false;
    }

}]);