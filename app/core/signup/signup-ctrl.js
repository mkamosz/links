/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('SignupController', ['$rootScope', '$scope', 'conn', function($rootScope, $scope, conn){

    $scope.data = {};
    $scope.showForm = true;
    $scope.error = {
        show : false,
        msg : ""
    };

    $scope.signup = function(){
        conn.postData($scope.path.server.user, $scope.data)
            .then(function(result){
                if(result.status == true){
                    $scope.showForm = false;
                } else {
                    $scope.showForm = true;
                    $scope.error.show = true;
                    $scope.error.msg = result.message;
                    $scope.data.password = "";
                    if(result.code == 1){
                        $scope.data.username = "";
                    } else{
                        $scope.data.email = "";
                    }
                }
            }, function(msg) {
                console.log(msg);
            })
    };

    $rootScope.$broadcast('showFooter',{"show" : false});
}]);