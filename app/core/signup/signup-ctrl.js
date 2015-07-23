/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('SignupController', ['$scope', 'conn', function($scope, conn){

    /* Pseudo global variables $scope.data */
    $scope.data.layout.showFooter = false;

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
        $scope.data.loader.set = "active";
        conn.postData($scope.data.path.server.user, $scope.signup.data)
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
                $scope.data.loader.set = "";
            }, function(msg) {
                console.log(msg);
            })
    };

    /*hide errors*/
    $scope.signup.fn.hideErrors = function(){
        $scope.signup.error.show=false;
    }
}]);