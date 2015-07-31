/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('SignupController', ['$scope', 'conn','globalData', function($scope, conn, globalData){

    /* Pseudo global variables $scope.data */
    globalData.setPropData('layout','showFooter',false);

    /* Private variables for this controller - $scope*/
    $scope.signup = {
        data : {},
        error : {
            show : false,
            msg : ""
        },
        showForm : true,
        fn : {}
    };

    /* Functions */

    /*signup - form*/
    $scope.signup.fn.form = function(){
        if($scope.form.$valid){
            $scope.global.loader.show();
            conn.postData($scope.global.path.server.user, $scope.signup.data)
                .then(function(result){
                    if(result.status == true){
                        $scope.signup.showForm = false;
                    } else {
                        $scope.signup.showForm = true;
                        $scope.signup.error.show = true;
                        $scope.signup.error.msg = result.message;
                        $scope.signup.data.password = "";
                        if(result.code == 1){
                            $scope.signup.data.username = "";
                        } else{
                            $scope.signup.data.email = "";
                        }
                    }
                    $scope.global.loader.hide();
                }, function(msg) {
                    console.log(msg);
                })
        }
    };

    /*hide errors*/
    $scope.signup.fn.hideErrors = function(){
        $scope.signup.error.show=false;
    }
}]);