/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('PasswordController', ['$scope','conn', function($scope,conn){
    /* Pseudo global variables $scope.data */
    $scope.data = $scope.$parent.$parent.data;

    /* Private variables for this controller - $scope*/
    $scope.pass = {
        data : {},
        error : {
            show : false
        },
        msg : '',
        fn : {}
    };


    /*Functions*/

    $scope.pass.fn.saveData = function(check){
        $scope.pass.error.show = false;
        if(check){
            if($scope.pass.data.password != $scope.pass.data.repeat){
                $scope.pass.msg = '<div class="alert alert-danger">New password and repeat new password <strong>do not match</strong></div>';
            } else{
                $scope.data.loader.show();
                $scope.pass.data.username = $scope.data.userInfo.username;
                $scope.pass.data.access_token = $scope.data.userInfo.access_token;
                $scope.pass.data.type = "pass";
                conn.putData($scope.data.path.server.user, $scope.pass.data)
                    .then(function(result){
                        $scope.data.loader.hide();
                        if(result.status == true){
                            $scope.data.notifi.show(result.message);
                        } else{
                            $scope.data.notifi.show(result.message, 'danger');
                        }
                        $scope.pass.data = {};
                    }, function(msg){
                        console.log(msg);
                    })
                $scope.pass.msg = '';
            }
        } else{
            $scope.pass.error.show = true;
        }

    };
}]);