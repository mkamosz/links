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
            userSession : '=user',
            notifi : '=notifi'
        },
        templateUrl: path.template.userprofile,
        replace : true,
        controller : ['$scope','globalData','conn', function($scope,globalData,conn){

            /* Pseudo global variables $scope.data */

            /* Private variables for this controller - $scope*/
            $scope.userprofile = {
                data : {
                    follow : (typeof $scope.userSession !== 'undefined' ? $scope.userSession.logged : false),
                    checkFollow : false
                },
                path : path,
                fn : {}
            };

            /* Functions */
            $scope.userprofile.fn.addFollow = function(){
                var data = {
                    userSession : $scope.userSession,
                    user : $scope.userProfileData
                };
                conn.postData(path.server.follow, data)
                    .then(function(result){
                        if(result.status == true){
                            $scope.notifi.show(result.message);
                            $scope.userprofile.data.checkFollow = false;
                        } else{
                            $scope.notifi.show(result.message,'danger');
                        }
                    }, function(msg){
                        console.log(msg);
                    });
            };

            $scope.userprofile.fn.unFollow = function(){
                var data = {
                    userSession : $scope.userSession,
                    user : $scope.userProfileData
                };
                conn.deleteData(path.server.follow, {params  : data})
                    .then(function(result){
                        if(result.status == true){
                            $scope.notifi.show(result.message);
                            $scope.userprofile.data.checkFollow = true;
                        } else{
                            $scope.notifi.show(result.message,'danger');
                        }
                    }, function(msg){
                        console.log(msg);
                    });
            };



            //$watch because used $scope.userprofile.data.**** variables
            $scope.$watch('userProfileData', function() {
                if( $scope.userProfileData != null) {
                    //sprawdzenie follow
                    var data = {
                        userSession : $scope.userSession,
                        user : $scope.userProfileData
                    };
                    conn.getData(path.server.follow, {params : data})
                        .then(function(result){
                            if(result.status == true){
                                $scope.userprofile.data.checkFollow = true;
                            }
                        }, function(msg){
                            console.log(msg);
                        });

                    $scope.userprofile.data.fullname = ($scope.userProfileData.name == '' ? $scope.userProfileData.username : $scope.userProfileData.name + " " + $scope.userProfileData.surname);
                    $scope.userprofile.data.city = ($scope.userProfileData.city == '' ? "" : $scope.userProfileData.city);
                    $scope.userprofile.data.country = ($scope.userProfileData.country == '' ? "" : " , " + $scope.userProfileData.country);
                    $scope.userprofile.data.avatar = (($scope.userProfileData.avatar == '' || typeof $scope.userProfileData.avatar === 'undefined') ? $scope.userprofile.path.imgContent+'icon_user.png' : $scope.userprofile.path.userProfile+$scope.userProfileData.avatar);
                    $scope.userprofile.data.followers = ($scope.userProfileData.followers == '' || typeof $scope.userProfileData.followers === 'undefined' ? 0 : $scope.userProfileData.followers);
                    $scope.userprofile.data.fb = ($scope.userProfileData.fb == '' ? "" : $scope.userProfileData.fb);
                    $scope.userprofile.data.twitter = ($scope.userProfileData.twitter == '' ? "" : $scope.userProfileData.twitter);
                    $scope.userprofile.data.g = ($scope.userProfileData.g == '' ? "" : $scope.userProfileData.g);
                    $scope.userprofile.data.www = ($scope.userProfileData.www == '' ? "" : $scope.userProfileData.www);
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

