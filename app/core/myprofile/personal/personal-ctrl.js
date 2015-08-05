/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('PersonalController', ['$scope','conn','auth','crop','globalData', function($scope,conn,auth,crop,globalData){
    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();

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
        $scope.global.loader.show();

        conn.getData($scope.global.path.server.user, { params : $scope.global.userInfo })
            .then(function(result){
                if(result.status == true){
                    $scope.personal.data = result.data;
                    globalData.setPropData('userData','avatar',$scope.personal.data.avatar);
                    $scope.imageAvatar = ($scope.personal.data.avatar == '' ? $scope.global.path.imgContent+'icon_user.png' : $scope.global.path.userProfile + $scope.personal.data.avatar);
                } else{
                    $scope.global.notifi.show(result.message);
                }
                $scope.global.loader.hide();
            }, function(msg){
                $scope.global.notifi.show(result.message);
            })
    };

    $scope.personal.fn.saveData = function(check){

        $scope.personal.error.show = false;
        if(check){
            $scope.global.loader.show();
            $scope.personal.data.username = $scope.global.userInfo.username;
            $scope.personal.data.access_token = $scope.global.userInfo.access_token;
            $scope.personal.data.type = "personal";
            $scope.personal.data.avatar = $scope.global.userData.avatar;
            conn.putData($scope.global.path.server.user, $scope.personal.data)
                .then(function(result){
                    $scope.global.loader.hide();
                    if(result.status == true){
                        $scope.global.notifi.show(result.message);
                        globalData.refreshUserData()
                    }
                }, function(msg){
                    console.log(msg);
                })
        } else{
            $scope.personal.error.show = true;
        }

    };

    $scope.personal.fn.getInfo();

    crop.init();

    $scope.$watch('global.userData.avatar', function() {
        $scope.imageAvatar = $scope.global.path.userProfile + $scope.global.userData.avatar;
        $scope.personal.data.avatar = $scope.global.userData.avatar;
    });

}]);