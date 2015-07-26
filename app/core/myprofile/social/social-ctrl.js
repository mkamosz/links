/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('SocialController', ['$scope','conn', function($scope,conn){
    /* Pseudo global variables $scope.data */
    $scope.data = $scope.$parent.$parent.data;

    /* Private variables for this controller - $scope*/
    $scope.social = {
        data : {},
        fn : {}
    };


    /*Functions*/
    $scope.social.fn.getInfo = function(){
        $scope.data.loader.show();
        conn.getData($scope.data.path.server.user, { params : $scope.data.userInfo })
            .then(function(result){
                $scope.social.data = result.data;
                $scope.data.loader.hide();
            }, function(msg){
                cosole.log(msg);
            })
    };



    $scope.social.fn.saveData = function(){
        $scope.data.loader.show();
        $scope.social.data.username = $scope.data.userInfo.username;
        $scope.social.data.access_token = $scope.data.userInfo.access_token;
        $scope.social.data.type = "social";
        conn.putData($scope.data.path.server.user, $scope.social.data)
            .then(function(result){
                $scope.data.loader.hide();
                if(result.status == true){
                    $scope.data.notifi.show(result.message);
                }
            }, function(msg){
                cosole.log(msg);
            })
    };

    $scope.social.fn.getInfo();
}]);