/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('SigninController', ['$scope','auth','$location','globalData','$timeout', function($scope, auth, $location,globalData,$timeout){

    /* Pseudo global variables $scope.data */
    globalData.setPropData('layout','showFooter',false);

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
        if($scope.form.$valid){

            $scope.global.loader.show();
            auth.login($scope.global.path.server.login, $scope.signin.data)
                .then(function(result){
                    var check = globalData.getData('userInfo');
                    $scope.global.userInfo = check;

                    if(result.authenticated == true){
                        globalData.setPropData('layout','showProfile',globalData.getData('userInfo').logged);
                        if($scope.global.userData.name != "" || $scope.global.userData.surname != ""){
                            $location.path($scope.global.path.pages.dashboard.substr(2));
                        } else{
                            $location.path($scope.global.path.pages.personal.substr(2));
                            $timeout(function(){
                                $scope.global.notifi.show('Please fill basic data about you','info',5000);
                            },500);
                        }
                    }
                    $scope.global.loader.hide();
                }, function(result) {
                    if(result.authenticated == false){
                        $scope.signin.error.show = true;
                        $scope.signin.error.msg = result.message;
                        $scope.signin.data = {};
                    }
                    $scope.global.loader.hide();
                });
        }
    };

    /*hide errors*/
    $scope.signin.fn.hideErrors = function(){
        $scope.signin.error.show=false;
    }

}]);