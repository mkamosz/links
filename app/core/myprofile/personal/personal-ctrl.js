/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('PersonalController', ['$scope','conn','auth','crop','globalData', function($scope,conn,auth,crop,globalData){
    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();

    /* Private variables for this controller - $scope*/
    $scope.personal = {
        data : {},
        listCountries : [],
        imageAvatar : $scope.global.path.imgContent+'icon_user.png',
        imageWallpaper : $scope.global.path.imgContent+'bg.jpg',
        error:{
            show : false
        },
        fn : {}
    };


    if($scope.global.listCountries.length == 0){
        $scope.global.loader.show();
        conn.getData($scope.global.path.server.countries).then(function(result){
            $scope.global.loader.hide();
            $scope.personal.listCountries = result;
            $scope.global.listCountries = result;
        }, function(msg){
            $scope.global.notifi.show(msg,'danger');
        });
    } else{
        $scope.personal.listCountries = $scope.global.listCountries;
    }

    /*Functions*/
    $scope.personal.fn.getInfo = function(){
        $scope.global.loader.show();

        conn.getData($scope.global.path.server.user, { params : $scope.global.userInfo })
            .then(function(result){
                if(result.status == true){
                    $scope.personal.data = result.data;
                    $scope.personal.data.country = $scope.personal.data.countryCode;
                    globalData.setPropData('userData','avatar',$scope.personal.data.avatar);
                    globalData.setPropData('userData','wallpaper',$scope.personal.data.wallpaper);
                    $scope.personal.imageAvatar = ($scope.personal.data.avatar == '' ? $scope.global.path.imgContent+'icon_user.png' : $scope.global.path.userProfile + $scope.personal.data.avatar);
                    $scope.personal.imageWallpaper = ($scope.personal.data.wallpaper == '' ? $scope.global.path.imgContent+'bg.jpg' : $scope.global.path.userProfile + $scope.personal.data.wallpaper);
                } else{
                    $scope.global.notifi.show(result.message);
                }
                $scope.global.loader.hide();
            }, function(msg){
                $scope.global.notifi.show(msg);
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
            $scope.personal.data.wallpaper = $scope.global.userData.wallpaper;
            conn.putData($scope.global.path.server.user, $scope.personal.data)
                .then(function(result){
                    $scope.global.loader.hide();
                    if(result.status == true){
                        $scope.global.notifi.show(result.message);
                        globalData.refreshUserData()
                    }
                }, function(msg){
                    $scope.global.notifi.show(msg);
                })
        } else{
            $scope.personal.error.show = true;
        }

    };

    $scope.personal.fn.getInfo();

    crop.init($('#crop-avatar'),1);
    crop.init($('#crop-wallpaper'),6);

    $scope.$watch('global.userData', function() {
        $scope.personal.imageAvatar = ($scope.personal.data.avatar == '' || typeof $scope.personal.data.avatar === 'undefined' ? $scope.global.path.imgContent+'icon_user.png' : $scope.global.path.userProfile + $scope.personal.data.avatar);
        $scope.personal.imageWallpaper = ($scope.personal.data.wallpaper == '' || typeof $scope.personal.data.wallpaper === 'undefined' ? $scope.global.path.imgContent+'bg.jpg' : $scope.global.path.userProfile + $scope.personal.data.wallpaper);
        $scope.personal.data.avatar = $scope.global.userData.avatar;
        $scope.personal.data.wallpaper = $scope.global.userData.wallpaper;
    });

}]);