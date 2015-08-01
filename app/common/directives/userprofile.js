/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("userProfile", ['path', function(path){
    var path = path.url();

    return {
        restrict : "AE",
        scope : {
            user : '=data',
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
                    user : $scope.user
                };
                conn.postData(path.server.follow, data)
                    .then(function(result){
                        if(result.status == true){
                            $scope.notifi.show(result.message);
                        } else{
                            $scope.notifi.show(result.message,'danger');
                        }
                    }, function(msg){
                        console.log(msg);
                    });
            };



            //$watch because used $scope.userprofile.data.**** variables
            $scope.$watch('user', function() {
                if( $scope.user != null) {
                    //sprawdzenie follow
                    var data = {
                        userSession : $scope.userSession,
                        user : $scope.user
                    };
                    conn.getData(path.server.follow, {params : data})
                        .then(function(result){
                            if(result.status == true){
                                $scope.userprofile.data.checkFollow = true;
                            }
                        }, function(msg){
                            console.log(msg);
                        });

                    $scope.userprofile.data.fullname = ($scope.user.name == '' ? $scope.user.username : $scope.user.name + " " + $scope.user.surname);
                    $scope.userprofile.data.city = ($scope.user.city == '' ? "" : $scope.user.city);
                    $scope.userprofile.data.country = ($scope.user.country == '' ? "" : " , " + $scope.user.country);
                    $scope.userprofile.data.avatar = (($scope.user.avatar == '' || typeof $scope.user.avatar === 'undefined') ? $scope.userprofile.path.imgContent+'icon_user.png' : $scope.userprofile.path.userProfile+$scope.user.avatar);

                    $scope.userprofile.data.fb = ($scope.user.fb == '' ? "" : $scope.user.fb);
                    $scope.userprofile.data.twitter = ($scope.user.twitter == '' ? "" : $scope.user.twitter);
                    $scope.userprofile.data.g = ($scope.user.g == '' ? "" : $scope.user.g);
                    $scope.userprofile.data.www = ($scope.user.www == '' ? "" : $scope.user.www);
                }
            });
            $scope.$watch('dataListTags', function() {
                if(typeof $scope.dataListTags !== 'undefined'){
                    $scope.userprofile.data.tagsCounter = Object.getOwnPropertyNames($scope.dataListTags).length;
                }
            });

        }]
    }
}]);

