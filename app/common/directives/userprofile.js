/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("userProfile", ['path', function(path){
    var path = path.url();

    return {
        restrict : "AE",
        scope : {
            userProfileData : '=data',
            dataListLinks : '=list',
            dataListTags : '=tags',
            notifi : '=notifi',
            loader : '=loader',
            userInfo : '=userInfo',
            followBtn : '@followBtn'
        },
        templateUrl: path.template.userprofile,
        replace : true,
        controller : ['$scope','conn', function($scope,conn){
            /* Pseudo global variables $scope.data */

            /* Private variables for this controller - $scope*/
            $scope.userprofile = {
                data : {
                    follow : (typeof $scope.userInfo !== 'undefined' ? $scope.userInfo.logged : false),
                    checkFollow : (typeof $scope.followBtn !== 'undefined' ? $scope.followBtn : false)
                },
                path : path,
                fn : {}
            };

            /* Functions */
            $scope.userprofile.fn.addFollow = function(){
                var data = {
                    userSession : $scope.userInfo,
                    user : $scope.userProfileData,
                    follow : true
                };
                $scope.loader.show();
                conn.postData(path.server.follow, data)
                    .then(function(result){
                        $scope.loader.hide();
                        if(result.status == true){
                            $scope.notifi.show(result.message);
                            $scope.userprofile.data.checkFollow = false;

                            conn.postData(path.server.notifications,data).then(function(result){
                            }, function(msg){
                                $scope.notifi.show(msg, 'danger');
                            });

                        } else{
                            $scope.notifi.show(result.message,'danger');
                        }
                    }, function(msg){
                        $scope.notifi.show(msg, 'danger');
                    });
            };

            $scope.userprofile.fn.unFollow = function(){
                var data = {
                    userSession : $scope.userInfo,
                    user : $scope.userProfileData,
                    follow : false
                };
                $scope.loader.show();
                conn.deleteData(path.server.follow, {params  : data})
                    .then(function(result){
                        $scope.loader.hide();
                        if(result.status == true){
                            $scope.notifi.show(result.message);
                            $scope.userprofile.data.checkFollow = true;

                            conn.postData(path.server.notifications, data).then(function(result){
                            }, function(msg){
                                $scope.notifi.show(msg, 'danger');
                            });

                        } else{
                            $scope.notifi.show(result.message,'danger');
                        }
                    }, function(msg){
                        $scope.notifi.show(msg, 'danger');
                    });
            };

            $scope.userprofile.fn.rating = function(val){
                var data = {
                    userSession : $scope.userInfo,
                    userProfile : $scope.userProfileData.username,
                    rating : val
                };
                $scope.loader.show();
                conn.postData(path.server.userrating, data)
                    .then(function(result){
                        $scope.loader.hide();
                        if(result.status == true){
                            $scope.notifi.show(result.message);
                            $scope.userprofile.data.checkFollow = true;

                            $scope.loader.show();
                            conn.getData(path.server.account, { params : {name : $scope.userProfileData.username} })
                                .then(function(result){
                                    if(result.status == true){
                                        $scope.loader.hide();
                                        $scope.userProfileData = result.data.user;
                                    }
                                }, function(msg){
                                    $scope.global.notifi.show(msg, 'danger');
                                });
                        } else{
                            $scope.notifi.show(result.message, 'danger');
                        }
                    }, function(msg){
                        $scope.notifi.show(msg, 'danger');
                    });
            };

            //$watch because used $scope.userprofile.data.**** variables
            $scope.$watch('userProfileData', function() {
                if( typeof $scope.userProfileData !== 'undefined') {
                    //sprawdzenie follow
                    var data = {
                        userSession : $scope.userInfo,
                        user : $scope.userProfileData
                    };
                    $scope.loader.show();
                    conn.getData(path.server.follow, {params : data})
                        .then(function(result){
                            $scope.loader.hide();
                            if(result.status == true){
                                $scope.userprofile.data.checkFollow = true;
                            }
                        }, function(msg){
                            $scope.notifi.show(msg, 'danger');
                        });

                    $scope.userprofile.data.fullname = ($scope.userProfileData.name == '' ? $scope.userProfileData.username : $scope.userProfileData.name + " " + $scope.userProfileData.surname);
                    $scope.userprofile.data.city = ($scope.userProfileData.city == '' ? "" : $scope.userProfileData.city);
                    $scope.userprofile.data.country = ($scope.userProfileData.country == '' ? "" : ($scope.userprofile.data.city == '' ? $scope.userProfileData.country : " , " + $scope.userProfileData.country));
                    $scope.userprofile.data.avatar = (($scope.userProfileData.avatar == '' || typeof $scope.userProfileData.avatar === 'undefined') ? $scope.userprofile.path.imgContent+'icon_user.png' : $scope.userprofile.path.userProfile+$scope.userProfileData.avatar);
                    $scope.userprofile.data.wallpaper = (($scope.userProfileData.wallpaper == '' || typeof $scope.userProfileData.wallpaper === 'undefined') ? $scope.userprofile.path.imgContent+'bg.jpg' : $scope.userprofile.path.userProfile+$scope.userProfileData.wallpaper);
                    $scope.userprofile.data.followers = ($scope.userProfileData.followers == '' || typeof $scope.userProfileData.followers === 'undefined' ? 0 : $scope.userProfileData.followers);
                    $scope.userprofile.data.fb = ($scope.userProfileData.fb == '' ? "" : $scope.userProfileData.fb);
                    $scope.userprofile.data.twitter = ($scope.userProfileData.twitter == '' ? "" : $scope.userProfileData.twitter);
                    $scope.userprofile.data.g = ($scope.userProfileData.g == '' ? "" : $scope.userProfileData.g);
                    $scope.userprofile.data.www = ($scope.userProfileData.www == '' ? "" : $scope.userProfileData.www);
                    $scope.userprofile.data.rating = ($scope.userProfileData.rating == '' ? 0 : $scope.userProfileData.rating);
                }
            });
            $scope.$watch('dataListTags', function() {
                if(typeof $scope.dataListTags !== 'undefined'){
                    if($scope.dataListTags.length == 0){
                        $scope.userprofile.data.tagsCounter = 0;
                    } else{
                        $scope.userprofile.data.tagsCounter = Object.getOwnPropertyNames($scope.dataListTags).length;
                    }

                }
            });

        }]
    }
}]);

