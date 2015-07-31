/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('SocialController', ['$scope','conn','globalData', function($scope,conn,globalData){
    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();

    /* Private variables for this controller - $scope*/
    $scope.social = {
        data : {},
        error:{
            show : false
        },
        fn : {}
    };


    /*Functions*/
    $scope.social.fn.getInfo = function(){
        $scope.global.loader.show();
        conn.getData($scope.global.path.server.user, { params : $scope.global.userInfo })
            .then(function(result){
                $scope.social.data = result.data;
                $scope.global.loader.hide();
            }, function(msg){
                cosole.log(msg);
            })
    };

    $scope.social.fn.saveData = function(check){

        $scope.social.error.show = false;
        if(check){
            $scope.global.loader.show();
            $scope.social.data.username = $scope.global.userInfo.username;
            $scope.social.data.access_token = $scope.global.userInfo.access_token;
            $scope.social.data.type = "social";
            conn.putData($scope.global.path.server.user, $scope.social.data)
                .then(function(result){
                    $scope.global.loader.hide();
                    if(result.status == true){
                        $scope.global.notifi.show(result.message);
                        globalData.refreshUserData();
                    }
                }, function(msg){
                    cosole.log(msg);
                })
        } else{
            $scope.social.error.show = true;
        }

    };

    $scope.social.fn.getInfo();
}]);