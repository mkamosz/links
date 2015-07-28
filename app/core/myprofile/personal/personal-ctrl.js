/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('PersonalController', ['$scope','conn', function($scope,conn){
    /* Pseudo global variables $scope.data */
    $scope.data = $scope.$parent.$parent.data;

    /* Private variables for this controller - $scope*/
    $scope.personal = {
        data : {},
        error:{
            show : false
        },
        fn : {}
    };

    /*Functions*/
    $scope.personal.fn.getInfo = function(){
        $scope.data.loader.show();
        conn.getData($scope.data.path.server.user, { params : $scope.data.userInfo })
            .then(function(result){
                if(result.status == true){
                    $scope.personal.data = result.data;
                } else{
                    $scope.data.notifi.show(result.message);
                }
                $scope.data.loader.hide();
            }, function(msg){
                $scope.data.notifi.show(result.message);
            })
    };

    $scope.personal.fn.saveData = function(check){
        $scope.personal.error.show = false;
        if(check){
            $scope.data.loader.show();
            $scope.personal.data.username = $scope.data.userInfo.username;
            $scope.personal.data.access_token = $scope.data.userInfo.access_token;
            $scope.personal.data.type = "personal";
            conn.putData($scope.data.path.server.user, $scope.personal.data)
                .then(function(result){
                    $scope.data.loader.hide();
                    if(result.status == true){
                        $scope.data.notifi.show(result.message);
                    }
                }, function(msg){
                    cosole.log(msg);
                })
        } else{
            $scope.personal.error.show = true;
        }

    };

    $scope.personal.fn.getInfo();
}]);