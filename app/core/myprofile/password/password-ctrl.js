/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('PasswordController', ['$scope','conn','globalData', function($scope,conn,globalData){
    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();

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
                $scope.global.loader.show();
                $scope.pass.data.username = $scope.global.userInfo.username;
                $scope.pass.data.access_token = $scope.global.userInfo.access_token;
                $scope.pass.data.type = "pass";
                conn.putData($scope.global.path.server.user, $scope.pass.data)
                    .then(function(result){
                        $scope.global.loader.hide();
                        if(result.status == true){
                            $scope.global.notifi.show(result.message);
                        } else{
                            $scope.global.notifi.show(result.message, 'danger');
                        }
                        $scope.pass.data = {};
                    }, function(msg){
                        console.log(msg);
                    });
                $scope.pass.msg = '';
            }
        } else{
            $scope.pass.error.show = true;
        }

    };
}]);