/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('SignupController', ['$scope', 'conn', function($scope, conn){

    $scope.data = {};
    $scope.showForm = true;
    $scope.error = {
        show : false,
        msg : ""
    };

    $scope.signup = function(){
        conn.postData('/server/user', $scope.data)
            .then(function(result){
                if(result.status == true){
                    $scope.showForm = false;
                } else {
                    $scope.showForm = true;
                    if(result.code == 1){
                        $scope.error.show = true;
                        $scope.error.msg = result.message;
                        $scope.data = {};
                    }
                }
            }, function(msg) {
                console.log(msg);
            })
    };
}]);